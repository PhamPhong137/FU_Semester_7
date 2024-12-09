import { CommonNodeData } from "@/nodes/common-node"
import { useCallback, useMemo } from "react"
import { Node, useNodesState, useReactFlow } from "reactflow"

const useNode = (id?: string) => {
    if (!id) return null
    const { getNodes, setNodes: setMindmapNodes } =
        useReactFlow<CommonNodeData>()
    const [nodes, setNodes] = useNodesState<CommonNodeData>(getNodes())
    const setNode = useCallback(
        (nodeData: Node<CommonNodeData>) => {
            setNodes((nodes) => {
                const index = nodes.findIndex((node) => node.id === id)
                if (index === -1) return nodes
                const newNodes = [...nodes]
                newNodes[index] = { ...newNodes[index], ...nodeData }
                return newNodes
            })

            setMindmapNodes((nodes) => {
                const index = nodes.findIndex((node) => node.id === id)
                if (index === -1) return nodes
                const newNodes = [...nodes]
                newNodes[index] = { ...newNodes[index], ...nodeData }
                return newNodes
            })
        },
        [id, setNodes]
    )

    const node = useMemo(() => {
        return nodes.find((node) => node.id === id)
    }, [id, nodes])

    return { node, setNode }
}

export default useNode
