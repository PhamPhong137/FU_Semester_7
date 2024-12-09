import { create } from "zustand"

interface CreateMindmapStore {
    formData: FormData
    step: number
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    reset: () => void
}

let formDataInstance: FormData | null = null

const useCreateMindmapStore = create<CreateMindmapStore>((set) => {
    if (!formDataInstance) {
        formDataInstance = new FormData()
    }
    return {
        formData: formDataInstance,
        step: 1,
        setStep: (step) => set({ step }),
        nextStep: () => set((state) => ({ step: state.step + 1 })),
        prevStep: () => set((state) => ({ step: state.step - 1 })),
        reset: () => {
            formDataInstance = new FormData()
            set({ formData: formDataInstance, step: 1 })
        },
    }
})

export const useCreateMindmap = () => useCreateMindmapStore((state) => state)
