import { CommonNodeData } from "@/nodes/common-node"
import { createClient, EnsureJson } from "@liveblocks/client"
import { liveblocks } from "@liveblocks/zustand"
import type { WithLiveblocks } from "@liveblocks/zustand"
import { Dispatch } from "react"
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnConnectStartParams,
    OnEdgesChange,
    OnNodesChange,
    useReactFlow,
    XYPosition,
} from "reactflow"
import { create } from "zustand"
import type {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
} from "react"
import { convertNodeToMindmapNode } from "@/utils"

declare global {
    interface Liveblocks {
        Storage: Storage
    }
}

type Cursor = { x: number; y: number }

export type SharedUser = {
    id: number
    cursor: Cursor
    name: string
    picture: string
}

type FlowState = {
    nodes: Node<CommonNodeData>[]
    edges: Edge[]

    setNodes: Dispatch<React.SetStateAction<Node<CommonNodeData, string>[]>>
    setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
    onConnectStart: (
        event: ReactMouseEvent | ReactTouchEvent,
        params: OnConnectStartParams
    ) => void
    onConnectEnd: (
        event: any,
        screenToFlowPosition: (position: XYPosition) => XYPosition
    ) => void
    connectingNodeId: React.MutableRefObject<string | null>

    user: SharedUser
    setUser: (user: SharedUser) => void
}

type Storage = EnsureJson<{
    nodes: FlowState["nodes"]
    edges: FlowState["edges"]
}>

const client = createClient({
    publicApiKey:
        "pk_dev_OaL5paWOb3XidWtrHpgKmp4MTXuJ1ByVuuu6O_cDjWaAUWkyobMwDx_oKdgrfwX8",
    throttle: 50,
})

const useRoomStore = create<WithLiveblocks<FlowState>>()(
    liveblocks(
        (set, get) => {
            const connectingNodeId = { current: null as string | null }

            const getId = () =>
                `node_${Math.random().toString(36).substring(2, 9)}`
            return {
                // Initial values for nodes and edges
                nodes: [],
                edges: [],

                // Setters for nodes and edges
                setNodes: (nodes: Node[]) => set({ nodes }),
                setEdges: (edges: Edge[]) => set({ edges }),

                // Apply changes to React Flow when the flowchart is interacted with
                onNodesChange: (changes: NodeChange[]) => {
                    set({
                        nodes: applyNodeChanges(changes, get().nodes),
                    })
                },
                onEdgesChange: (changes: EdgeChange[]) => {
                    set({
                        edges: applyEdgeChanges(changes, get().edges),
                    })
                },
                onConnect: (connection: Connection) => {
                    connectingNodeId.current = null
                    set({
                        edges: addEdge(connection, get().edges),
                    })
                },
                onConnectStart: (_, { nodeId }: OnConnectStartParams) => {
                    connectingNodeId.current = nodeId
                },

                user: {
                    id: 0,
                    cursor: { x: 0, y: 0 },
                    name: "",
                    picture: "",
                },
                onConnectEnd: (
                    event: any,
                    screenToFlowPosition: (position: XYPosition) => XYPosition
                ) => {
                    if (!connectingNodeId.current) return

                    const targetIsPane =
                        event.target.classList.contains("react-flow__pane")

                    if (targetIsPane) {
                        // we need to remove the wrapper bounds, in order to get the correct position
                        const id = getId()
                        const pos = screenToFlowPosition({
                            x: event.clientX,
                            y: event.clientY,
                        })
                        const newNode = convertNodeToMindmapNode({
                            id,
                            label: "New Node",
                            note: "",
                            level: 3,
                            bg_color: "#fff",
                            text_color: "#000",
                            pos,
                            size: {
                                width: 0,
                                height: 0,
                            },
                        })

                        set((state) => ({
                            nodes: state.nodes.concat(newNode),
                            edges: state.edges.concat({
                                id,
                                source: connectingNodeId.current,
                                target: id,
                            }),
                        }))
                    }
                },
                connectingNodeId,
                // Set the user
                setUser: (user: SharedUser) => set({ user }),
            }
        },
        {
            // Add Liveblocks client
            client,

            storageMapping: {
                nodes: true,
                edges: true,
            },

            // Define the store properties that should be shared in real-time
            presenceMapping: {
                user: true,
            },
        }
    )
)

export default useRoomStore
