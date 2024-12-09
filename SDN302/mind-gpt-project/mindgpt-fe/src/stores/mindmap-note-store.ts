import { Block } from "@blocknote/core"
import { create } from "zustand"

interface MindmapNoteStore {
    note: Block[]
    setNote: (note: Block[]) => void
    removeNote: () => void
}
const useMindmapNoteStore = create<MindmapNoteStore>((set) => ({
    note: [],
    setNote: (note) => set(() => ({ note })),
    removeNote: () => set(() => ({ note: [] })),
}))

export const useMindmapNote = () => useMindmapNoteStore((state) => state)
