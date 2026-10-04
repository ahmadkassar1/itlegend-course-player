import { record } from "./saved-state.ts";
import type { LearningStore } from "./learning-store.ts";
import type { createInteractionStore } from "./interaction-store.ts";

export const STORAGE_KEY = "course-library:learner:v1";
export const CONTENT_VERSION = "2026-10-course-content-1";
export type SaveStatus = "loading" | "saved" | "session";

type PersistentStore = {
  snapshot: () => unknown;
  restore: (value: unknown) => void;
  reset: () => void;
  subscribe: (listener: () => void) => () => void;
};
type StorageAccess = Pick<Storage, "getItem" | "setItem">;

// One envelope keeps progress, messages and attempts from being saved independently.
// Both React stores retain their own snapshots, so typing does not rerender the player.
export function createBrowserPersistence(
  learning: PersistentStore & Pick<LearningStore, "dispatch">,
  interactions: PersistentStore &
    Pick<ReturnType<typeof createInteractionStore>, "submittedLessons">,
) {
  let status: SaveStatus = "loading";
  let storage: StorageAccess | null = null;
  let restoring = false;
  const listeners = new Set<() => void>();
  function setStatus(next: SaveStatus) {
    if (status === next) return;
    status = next;
    listeners.forEach((listener) => listener());
  }
  function save() {
    if (restoring) return;
    try {
      if (!storage) throw new Error("Storage unavailable");
      storage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 1,
          contentVersion: CONTENT_VERSION,
          learning: learning.snapshot(),
          interactions: interactions.snapshot(),
        }),
      );
      setStatus("saved");
    } catch {
      setStatus("session");
    }
  }
  return {
    getStatus: () => status,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    connect(getStorage: () => StorageAccess) {
      restoring = true;
      try {
        storage = getStorage();
        const raw = storage.getItem(STORAGE_KEY);
        // Oversized, malformed or incompatible saves never prevent anonymous access.
        const saved =
          raw && raw.length <= 2_000_000 ? record(JSON.parse(raw)) : {};
        if (saved.version === 1 && saved.contentVersion === CONTENT_VERSION) {
          learning.restore(saved.learning);
          interactions.restore(saved.interactions);
          // Recover credit if saving failed between submitting an exam and crediting its lesson.
          for (const { slug, lessonId } of interactions.submittedLessons())
            learning.dispatch(slug, { type: "complete", lessonId });
        }
      } catch {
        // The next write can repair malformed data; blocked reads use memory only.
      } finally {
        restoring = false;
      }
      save();
      const unsubscribeLearning = learning.subscribe(save);
      const unsubscribeInteractions = interactions.subscribe(save);
      return () => {
        unsubscribeLearning();
        unsubscribeInteractions();
      };
    },
    reset() {
      restoring = true;
      learning.reset();
      interactions.reset();
      restoring = false;
      save();
    },
  };
}
