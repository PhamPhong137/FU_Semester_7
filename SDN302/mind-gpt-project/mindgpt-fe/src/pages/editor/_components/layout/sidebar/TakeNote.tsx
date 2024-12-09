import { useMindmap } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommonNodeData } from "@/nodes/common-node"
import { useMindmapNote } from "@/stores"
import { instance } from "@/utils/axios"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useReactFlow } from "reactflow"

export default function TakeNote() {
    const { setNote } = useMindmapNote()
    const editor = useCreateBlockNote()
    const [isAISuggesting, setIsAISuggesting] = useState(false)
    const { orgId, mindmapId } = useParams()
    const { getNodes } = useReactFlow<CommonNodeData>()
    const { data: mindmap } = useMindmap(orgId, mindmapId)

    useEffect(() => {
        if (
            mindmap.note.trim() === "" ||
            !mindmap.note ||
            mindmap.note === "[]"
        ) {
            return
        }
        console.log(JSON.parse(mindmap.note))

        editor.replaceBlocks(editor.document, JSON.parse(mindmap.note))
    }, [])

    const handleAISuggestion = async () => {
        setIsAISuggesting(true)
        const loading = toast.loading("Đang gợi ý...")
        try {
            const { data: suggestion } = await instance.post<{
                status: number
                message: string
                data: string
            }>(`/mindmap/${orgId}/${mindmapId}/suggest-note`, {
                selectedNode: {
                    id: getNodes()[0].id,
                    name: getNodes()[0].data.label,
                },
            })
            const blocksResponse = await editor.tryParseMarkdownToBlocks(
                suggestion.data
            )
            editor.replaceBlocks(editor.document, blocksResponse)
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại")
        } finally {
            setIsAISuggesting(false)
            toast.dismiss(loading)
        }
    }
    return (
        <div className="flex flex-col grow h-full">
            <div className="flex w-full">
                <Button
                    className="bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group mb-2"
                    size="sm"
                    onClick={handleAISuggestion}
                    disabled={isAISuggesting}
                >
                    <Sparkles className="size-4 mr-2" />
                    Gợi ý từ AI
                </Button>
            </div>
            <ScrollArea className="border rounded-md grow">
                <BlockNoteView
                    editor={editor}
                    onChange={() => {
                        setNote(editor.document)
                    }}
                    theme={"light"}
                />
            </ScrollArea>
        </div>
    )
}
