"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  createInteractionStore,
  type InteractionSeed,
} from "./interaction-store";

const Context = createContext<ReturnType<typeof createInteractionStore> | null>(
  null,
);

export function InteractionProvider({
  seeds,
  children,
}: {
  seeds: InteractionSeed[];
  children: ReactNode;
}) {
  const [store] = useState(() => createInteractionStore(seeds));
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export function useInteractionStore() {
  const store = useContext(Context);
  if (!store) throw new Error("InteractionProvider is required");
  return store;
}

export function useCourseInteractions(slug: string) {
  const store = useInteractionStore();
  return useSyncExternalStore(
    store.subscribe,
    () => store.get(slug),
    () => store.getInitial(slug),
  );
}
