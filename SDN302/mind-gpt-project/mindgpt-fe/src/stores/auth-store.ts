import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
    token: string
    setToken: (token: string) => void
    removeToken: () => void
}

const useAuthStore = create<AuthStore, [["zustand/persist", AuthStore]]>(
    persist(
        (set) => ({
            token: "",
            setToken: (token) => set(() => ({ token })),
            removeToken: () => set(() => ({ token: "" })),
        }),
        {
            name: "access_token",
        }
    )
)

export const useAuth = () => useAuthStore((state) => state)

export const getAuth = () => useAuthStore.getState()
