"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useLearningStore } from "./learning-provider";
import { useInteractionStore } from "./interaction-provider";
import { createBrowserPersistence } from "./browser-persistence";

const Context = createContext<ReturnType<
  typeof createBrowserPersistence
> | null>(null);

export function PersistenceProvider({ children }: { children: ReactNode }) {
  const learning = useLearningStore();
  const interactions = useInteractionStore();
  const [persistence] = useState(() =>
    createBrowserPersistence(learning, interactions),
  );
  useEffect(
    () => persistence.connect(() => window.localStorage),
    [persistence],
  );
  return <Context.Provider value={persistence}>{children}</Context.Provider>;
}

export function usePersistence() {
  const persistence = useContext(Context);
  if (!persistence) throw new Error("PersistenceProvider is required");
  const status = useSyncExternalStore(
    persistence.subscribe,
    persistence.getStatus,
    () => "loading" as const,
  );
  return { status, reset: persistence.reset };
}
