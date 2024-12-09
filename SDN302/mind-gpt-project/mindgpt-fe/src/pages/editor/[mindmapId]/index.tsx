import React, { Fragment, useCallback, useEffect, useRef } from "react"
import { BaseUserMeta, JsonObject, User as UserData } from "@liveblocks/client"
import { useParams } from "react-router-dom"
import { UserResponse } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Network, User } from "lucide-react"
import useRoomStore from "@/stores/room-store"
import { useLayoutedElements, useRemoveLogo } from "@/hooks"
import { useMindmap, useUser } from "@/api/hooks"
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    Panel,
    SelectionMode,
    useReactFlow,
} from "reactflow"
import { useSelectedNodes } from "@/stores/selected-nodes-store"
import { nodeTypes } from "@/nodes"
import { edgeTypes } from "@/edges"
import Cursor from "@/components/cursor"
import { convertEdgeToMindmapEdge, convertNodeToMindmapNode } from "@/utils"

const cusorColors = [
    "#991b1b",
    "#92400e",
    "#3f6212",
    "#065f46",
    "#155e75",
    "#1e40af",
    "#5b21b6",
    "#86198f",
    "#9f1239",
]

const MAX_USERS_DISPLAY = 5

const OnlineUsers = ({
    others,
    currentUser,
}: {
    others: readonly UserData<JsonObject, BaseUserMeta>[]
    currentUser: UserResponse
}) => {
    return (
        <div className="bg-white shadow-md rounded flex -space-x-3 *:ring *:ring-background p-1">
            <Avatar className="size-8">
                <AvatarImage src={currentUser?.picture} />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </Avatar>

            {others.map((user, index) => {
                if (index + 1 === MAX_USERS_DISPLAY) {
                    return (
                        <Avatar
                            key={index}
                            className="bg-white flex items-center justify-center size-8"
                        >
                            +{index + 1}
                        </Avatar>
                    )
                }
                if (index + 1 > MAX_USERS_DISPLAY) {
                    return <Fragment key={index}></Fragment>
                }
                return (
                    <Avatar
                        key={user.id}
                        style={{
                            outline: "2px solid white",
                            border: `3px solid ${cusorColors[index]}`,
                        }}
                        className="size-8"
                    >
                        <AvatarImage src={user.presence.user["picture"]} />
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                )
            })}
        </div>
    )
}

const MindmapEditorPage = () => {
    useRemoveLogo()
    const { data: user } = useUser()
    const { fitView, project, screenToFlowPosition, flowToScreenPosition } =
        useReactFlow()
    // const [nodes, setNodes, onNodesChange] = useNodesState<CommonNodeData>([])
    // const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const connectingNodeId = useRef(null)
    const { orgId, mindmapId } = useParams()
    const {
        data: mindmap,
        isLoading,
        setMindmap,
    } = useMindmap(orgId, mindmapId)
    const {
        liveblocks: { enterRoom, leaveRoom, isStorageLoading, others },
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onConnectStart,
        onConnectEnd,
    } = useRoomStore()

    const setUser = useRoomStore((state) => state.setUser)

    const { getLayoutedElements } = useLayoutedElements()

    useEffect(() => {
        if (mindmap) {
            setNodes(
                mindmap?.nodes.map((node) => convertNodeToMindmapNode(node))
            )
            setEdges(
                mindmap?.edges.map((edge) => convertEdgeToMindmapEdge(edge))
            )

            setTimeout(() => {
                const isNotLayouted = mindmap?.nodes.every(
                    (node) => node.pos.x === 0 && node.pos.y === 0
                )
                if (isNotLayouted) {
                    getLayoutedElements()
                }
            }, 100)
        }
    }, [mindmap, isLoading])

    const { setSelectedNodes } = useSelectedNodes()
    const onSelectionChange = useCallback(
        ({ nodes }) => {
            setSelectedNodes(nodes)
        },
        [setSelectedNodes]
    )

    useEffect(() => {
        enterRoom(mindmapId)
        return () => leaveRoom()
    }, [enterRoom, leaveRoom, mindmapId, orgId])

    const handleRealtimeChange = (e: React.PointerEvent<HTMLDivElement>) => {
        setUser({
            id: user.id,
            cursor: screenToFlowPosition({
                x: e.clientX,
                y: e.clientY,
            }),
            name: user.name,
            picture: user.picture,
        })
    }

    if (isStorageLoading) {
        return (
            <div className="h-screen flex items-center justify-center w-full">
                <svg
                    className="animate-spin -ml-1 mr-3 size-10 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
        )
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={(e) => {
                onConnectEnd(e, screenToFlowPosition)
            }}
            onSelectionChange={onSelectionChange}
            panOnScroll
            selectionOnDrag
            panOnDrag={[1, 2]}
            selectionMode={SelectionMode.Partial}
            fitView
            defaultEdgeOptions={{
                animated: true,
                type: "floating",
                markerEnd: { type: MarkerType.ArrowClosed },
            }}
            minZoom={0.1}
            onPointerMove={handleRealtimeChange}
            className="relative"
        >
            {others.map((user, index) => (
                <Cursor
                    key={index}
                    color={cusorColors[index]}
                    pos={flowToScreenPosition({
                        x: user.presence.user["cursor"]["x"] - 0,
                        y: user.presence.user["cursor"]["y"] - 0,
                    })}
                    name={user.presence.user["name"]}
                />
            ))}
            <Background />
            <Controls />
            <Panel position="top-right">
                <OnlineUsers others={others} currentUser={user} />
            </Panel>
            <Panel position="bottom-right">
                <button
                    className="bg-primary rounded-full p-3 text-secondary"
                    onClick={() => {
                        fitView({ duration: 500 })
                        setTimeout(() => {
                            getLayoutedElements()
                        }, 500)
                    }}
                >
                    <Network className="size-5" />
                </button>
            </Panel>
        </ReactFlow>
    )
}

export default MindmapEditorPage
