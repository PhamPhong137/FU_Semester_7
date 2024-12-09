import { getEdgeParams } from "@/utils"
import { useCallback } from "react"
import { useStore, getBezierPath, EdgeProps } from "reactflow"

function FloatingEdge({ id, source, target, markerEnd, style }: EdgeProps) {
    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    )
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    )

    if (!sourceNode || !targetNode) {
        return null
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        sourceNode,
        targetNode
    )

    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    })

    if (edgePath === "MNaN,NaN CNaN,NaN NaN,NaN NaN,NaN") {
        return <></>
    }

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    )
}

export default FloatingEdge
