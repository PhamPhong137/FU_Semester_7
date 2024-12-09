import { create } from "zustand"

interface OrgStore {
    currentOrg: string
    setCurrentOrg: (org: string) => void
    removeCurrentOrg: () => void
}

const useOrgStore = create<OrgStore>((set) => ({
    currentOrg: "",
    setCurrentOrg: (org) => set(() => ({ currentOrg: org })),
    removeCurrentOrg: () => set(() => ({ currentOrg: "" })),
}))

export const useCurrentOrg = () => useOrgStore((state) => state)

export const getCurrentOrg = () => useOrgStore.getState()
