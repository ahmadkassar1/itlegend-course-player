"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  createLearningStore,
  type CourseSeed,
  type LearningStore,
} from "./learning-store";

const LearningContext = createContext<LearningStore | null>(null);

export function LearningProvider({
  seeds,
  children,
}: {
  seeds: CourseSeed[];
  children: ReactNode;
}) {
  const [store] = useState(() => createLearningStore(seeds));
  return (
    <LearningContext.Provider value={store}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearningStore() {
  const store = useContext(LearningContext);
  if (!store) throw new Error("LearningProvider is required");
  return store;
}

export function useCourseLearning(slug: string) {
  const store = useLearningStore();
  return useSyncExternalStore(
    store.subscribe,
    () => store.get(slug),
    () => store.getInitial(slug),
  );
}
