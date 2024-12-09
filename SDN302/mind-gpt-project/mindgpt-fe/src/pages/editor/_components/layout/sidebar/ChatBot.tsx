import { useMindmap } from "@/api/hooks"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import LoadingDots from "@/components/ui/loading-dots"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSelectedNodes } from "@/stores/selected-nodes-store"
import { MindmapMessage, MindmapResponse } from "@/types"
import { instance } from "@/utils/axios"
import { useListState } from "@mantine/hooks"
import { Send } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { parseMarkdownToHTML } from "@/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useLayoutedElements } from "@/hooks"
import { useReactFlow } from "reactflow"

const Message = ({ role, content }: MindmapMessage) => {
    return (
        <div
            className={`mb-4 flex ${
                role === "user" ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`flex max-w-[20rem] items-end gap-2 overflow-x-auto rounded-lg ${
                    role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
            >
                <div
                    className={`rounded-lg p-3 shadow-md w-full ${
                        role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                    }`}
                >
                    {role === "ai" && content === "l" ? (
                        <LoadingDots />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: parseMarkdownToHTML(content),
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ChatBot() {
    const { orgId, mindmapId } = useParams()
    const { data: mindmap, setMindmap } = useMindmap(orgId, mindmapId)
    const [conversation, handler] = useListState<MindmapMessage>([])
    const [message, setMessage] = useState<string>("")
    const [showCmd, setShowCmd] = useState<boolean>(false)
    const [isBotThinking, setIsBotThinking] = useState<boolean>(false)
    const { nodes: selectedNodes } = useSelectedNodes()
    const queryClient = useQueryClient()
    const { getLayoutedElements } = useLayoutedElements()
    const { fitView } = useReactFlow()
    useEffect(() => {
        if (mindmap) {
            handler.setState(mindmap.conversation)
            scrollBottom()
        }
    }, [mindmap])

    const chatSectionViewport = useRef<HTMLDivElement>(null)
    const scrollBottom = useCallback(() => {
        if (chatSectionViewport.current) {
            chatSectionViewport.current.scrollIntoView(false)
        }
    }, [])

    useEffect(() => {
        scrollBottom()
    }, [conversation])

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
        setShowCmd(
            "/chỉnh sửa".includes(e.target.value) &&
                e.target.value.trim() !== ""
        )
    }
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim() === "") return

        setIsBotThinking(true)
        handler.append({ role: "user", content: message })
        setMessage("")
        scrollBottom()
        try {
            if (message.startsWith("/chỉnh sửa")) {
                const { data } = await instance.put<{
                    status: number
                    message: string
                    data: {
                        newMindmap: MindmapResponse
                        message: string
                    }
                }>(`/mindmap/${orgId}/${mindmapId}/edit`, {
                    prompt: message,
                    selectedNodes: selectedNodes.map((node) => ({
                        id: node.id,
                        name: node.data.label,
                    })),
                })
                if (data) {
                    handler.append({
                        role: "ai",
                        content: data.data.message,
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["mindmap", orgId, mindmapId],
                    })
                    setMindmap(data.data.newMindmap)
                    setTimeout(() => {
                        getLayoutedElements()
                    }, 200)
                }
            } else {
                const { data } = await instance.post<{
                    status: number
                    message: string
                    data: string
                }>(`/conversation/${orgId}/${mindmapId}`, {
                    prompt: message,
                    selectedNodes:
                        selectedNodes.length === 0
                            ? mindmap.nodes.map((node) => ({
                                  id: node.id,
                                  name: node.label,
                              }))
                            : selectedNodes.map((node) => ({
                                  id: node.id,
                                  name: node.data.label,
                              })),
                })

                if (data) {
                    handler.append({
                        role: "ai",
                        content: data.data,
                    })
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra")
        } finally {
            setIsBotThinking(false)
            scrollBottom()
        }
    }
    return (
        <div className="flex flex-col justify-between size-full gap-4">
            <ScrollArea className="flex-grow">
                <div
                    className="flex flex-col gap-4 p-4"
                    ref={chatSectionViewport}
                >
                    {conversation.length === 0 && (
                        <Message
                            role="ai"
                            content="Chào bạn, mình là trợ lý ảo của MindGPT. Mình có thể giúp gì cho bạn?"
                        />
                    )}
                    {conversation.map((message, index) => (
                        <Message key={index} {...message} />
                    ))}
                    {isBotThinking && <Message role="ai" content="l" />}
                </div>
            </ScrollArea>
            <form
                className="p-1 relative flex gap-2"
                onSubmit={handleSendMessage}
            >
                <Input
                    placeholder="Nhập tin nhắn"
                    value={message}
                    onChange={handleMessageChange}
                    className="grow"
                    disabled={isBotThinking}
                />
                <Button
                    type="submit"
                    size="icon"
                    disabled={showCmd || isBotThinking || message.trim() === ""}
                >
                    <Send className="size-4" />
                </Button>
                {showCmd && (
                    <div className="absolute -top-full rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setMessage("/chỉnh sửa ")
                                setShowCmd(false)
                            }}
                        >
                            /chỉnh sửa
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}
