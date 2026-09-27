import { createContext, useContext, type ReactNode } from "react";
import type { PagePayload } from "./payload";

const PagePayloadContext = createContext<PagePayload | null>(null);

export function PagePayloadProvider({
  payload,
  children,
}: {
  payload: PagePayload | null;
  children: ReactNode;
}) {
  return (
    <PagePayloadContext.Provider value={payload}>
      {children}
    </PagePayloadContext.Provider>
  );
}

export function usePagePayload(): PagePayload | null {
  return useContext(PagePayloadContext);
}
