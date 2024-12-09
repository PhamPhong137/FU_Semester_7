import { useCheckNodeSelected } from "@/stores/selected-nodes-store"
import { cn } from "@/lib/utils"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import {
    Handle,
    NodeToolbar,
    Position,
    useNodeId,
    useReactFlow,
} from "reactflow"
import NodeInfo from "@/components/node-info"
import { useSheet } from "@/hooks"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, NotebookPen, Pencil, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom"

export interface BaseNodeData {
    label?: string
    note?: string
    level?: number
    textColor?: string
    bgColor?: string
}

interface BaseNodeProps extends BaseNodeData {
    selected: boolean
    className?: string
    labelClassName?: string
    style: React.CSSProperties
}

const nodeTextStyle: Record<number, string> = {
    0: "text-3xl font-bold",
    1: "text-xl font-semibold",
    2: "text-lg",
    3: "text-base",
}

const toolbarOffset: Record<number, number> = {
    0: 30,
    1: 25,
    2: 20,
    3: 20,
    4: 20,
    5: 20,
    6: 20,
}

const BaseNode = ({
    label,
    selected,
    className = "",
    labelClassName = "",
    textColor,
    bgColor,
    level,
    style,
}: BaseNodeProps) => {
    const { getNode, setNodes, getNodes, fitView } = useReactFlow()
    const nodeId = useNodeId()

    const [labelEdit, setLabelEdit] = useState("")
    const [isSaved, setIsSaved] = useState(false)

    const sheet = useSheet()
    const { orgId, mindmapId } = useParams()
    const handleTakeNote = () => {
        fitView({ nodes: [{ id: nodeId }], duration: 500, padding: 3 })
        sheet.showSheet({
            title: `${label}`,
            children: (
                <NodeInfo id={nodeId} mindmapId={mindmapId} orgId={orgId} />
            ),
        })
    }

    useEffect(() => {
        if (isSaved) {
            const nodes = getNodes()
            const node = getNode(nodeId!)
            if (node) {
                setNodes(
                    nodes.map((n) => {
                        if (n.id === nodeId) {
                            return {
                                ...n,
                                data: {
                                    ...n.data,
                                    label: labelEdit,
                                },
                            }
                        }
                        return n
                    })
                )
            }
            setIsSaved(false)
        }
    }, [isSaved, labelEdit, nodeId, getNode, getNodes, setNodes])

    return (
        <>
            <NodeToolbar
                position={Position.Right}
                offset={toolbarOffset[level]}
                align="center"
            >
                <div className="flex flex-col gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NotebookPen
                                className="cursor-pointer size-5 text-green-500"
                                onClick={handleTakeNote}
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right">Ghi chú</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Trash2
                                className="cursor-pointer size-5 text-red-500"
                                onClick={() => {
                                    setNodes((nodes) =>
                                        nodes.filter((n) => n.id !== nodeId)
                                    )
                                }}
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right">Xóa</TooltipContent>
                    </Tooltip>
                </div>
            </NodeToolbar>

            <div
                className={cn(
                    ` 
                    w-auto h-auto p-1
                    transition-all duration-150 shadow-md
                    flex items-center justify-center border border-slate-500
                    ${
                        (selected || selected) &&
                        "border-green-600 scale-110 border-2"
                    }
                      `,
                    className
                )}
                style={{
                    ...style,
                }}
            >
                <div className="flex items-center w-full h-full gap-1">
                    <div className="flex-grow text-center text-xs">
                        {label && (
                            <div className={cn(labelClassName)}>
                                <span
                                    style={{
                                        color: textColor,
                                    }}
                                    className={nodeTextStyle[level!]}
                                >
                                    {label}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{
                        opacity: selected ? 1 : 0,
                    }}
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{
                        opacity: selected ? 1 : 0,
                    }}
                />
            </div>
        </>
    )
}

export default BaseNode
