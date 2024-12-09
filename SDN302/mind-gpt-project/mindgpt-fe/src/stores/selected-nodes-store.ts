import { CommonNodeData } from "@/nodes/common-node"
import { Node } from "reactflow"
import { create } from "zustand"

interface SelectedNodeStore {
    nodes: Node<CommonNodeData>[]
    setSelectedNodes: (nodes: Node<CommonNodeData>[]) => void
}

const useSelectedNodeStore = create<SelectedNodeStore>((set) => ({
    nodes: [],
    setSelectedNodes: (nodes: Node[]) => set(() => ({ nodes })),
}))

export const useSelectedNodes = () => useSelectedNodeStore((state) => state)

export const useCheckNodeSelected = (nodeId: string) =>
    useSelectedNodeStore((state) =>
        state.nodes.some((node) => node.id === nodeId)
    )
