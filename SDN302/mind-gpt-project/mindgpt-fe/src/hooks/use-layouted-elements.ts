import ELK, { ElkNode, LayoutOptions } from "elkjs/lib/elk.bundled"
import { useCallback } from "react"
import { Node, useReactFlow } from "reactflow"

const elk = new ELK()

const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView } = useReactFlow()
    const defaultOptions: LayoutOptions = {
        "elk.algorithm": "radial",
        "elk.layered.spacing.nodeNodeBetweenLayers": "20",
        "elk.spacing.nodeNode": "40",
        "elk.direction": "RIGHT",
        "elk.alignment": "CENTER",
    }

    const getLayoutedElements = useCallback((options?: LayoutOptions) => {
        const layoutOptions = { ...defaultOptions, ...options }
        const graph: any = {
            id: "root",
            layoutOptions: layoutOptions,
            children: getNodes(),
            edges: getEdges(),
            x: 0,
            y: 0,
        }

        elk.layout(graph).then(({ children }) => {
            children = children.map((node: any) => {
                if (!node) return
                return {
                    ...node,
                    position: {
                        x: node.x,
                        y: node.y,
                    },
                }
            })

            setNodes(children as Node<any>[])
            setTimeout(() => {
                window.requestAnimationFrame(() => {
                    fitView({ duration: 500 })
                })
            }, 200)
        })
    }, [])

    return { getLayoutedElements }
}

export default useLayoutedElements
