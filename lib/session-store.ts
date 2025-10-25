import { create } from "zustand"

interface SessionState {
  token: string | null
  setToken: (token: string | null) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))
