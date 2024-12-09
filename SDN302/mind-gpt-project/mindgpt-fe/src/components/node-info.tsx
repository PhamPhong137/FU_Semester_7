import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
    NotebookPen,
    PaintBucket,
    Palette,
    PencilLine,
    Scaling,
    Sparkles,
} from "lucide-react"
import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import { useNode } from "@/hooks"
import { instance } from "@/utils/axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import { Block } from "@blocknote/core"
import { ScrollArea } from "./ui/scroll-area"

interface NodeInfoProps {
    id?: string
    orgId: string
    mindmapId: string
}

const sizeOptions = ["Nhỏ", "Vừa", "Lớn", "Rất lớn"]

const sizeMap: Record<number, number> = {
    1: 100,
    2: 120,
    3: 140,
    4: 180,
}

const sizeMapReverse: Record<number, number> = {
    100: 1,
    120: 2,
    140: 3,
    180: 4,
}

const NodeInfo = ({ id, orgId, mindmapId }: NodeInfoProps) => {
    if (!id) return null
    const { node, setNode } = useNode(id)
    const [isAISuggesting, setIsAISuggesting] = useState(false)
    const [blocks, setBlocks] = useState<Block[]>([])
    const editor = useCreateBlockNote()

    useEffect(() => {
        if (
            node.data.note.trim() === "" ||
            !node.data.note ||
            node.data.note === "[]"
        ) {
            return
        }
        console.log(JSON.parse(node.data.note))

        editor.replaceBlocks(editor.document, JSON.parse(node.data.note))
    }, [])

    useEffect(() => {
        setNode({
            ...node,
            data: {
                ...node.data,
                note: JSON.stringify(blocks, null, 2),
            },
        })
    }, [blocks])

    const handleSettingsChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNode({
            ...node,
            data: {
                ...node.data,
                [e.target.name]: e.target.value,
            },
        })
    }

    const handleSizeChange = (value: number[]) => {
        setNode({
            ...node,
            data: {
                ...node.data,
                height: sizeMap[value[0]],
                width: sizeMap[value[0]] * 2,
            },
            height: sizeMap[value[0]],
            width: sizeMap[value[0]] * 2,
        })
    }

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
                    id: node.id,
                    name: node.data.label,
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
        <div className="flex flex-col gap-6 pb-12 pt-6 h-full">
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="label"
                    className="text-sm font-medium text-gray-700"
                >
                    <PencilLine className="w-4 h-4 inline-block mr-2" />
                    Tên node
                </Label>
                <Input
                    id="label"
                    name="label"
                    type="text"
                    value={node.data.label}
                    onChange={handleSettingsChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="size"
                    className="text-sm font-medium text-gray-700"
                >
                    <Scaling className="w-4 h-4 inline-block mr-2" />
                    Kích thước
                </Label>
                <Slider
                    id="size"
                    min={1}
                    max={4}
                    step={1}
                    value={[sizeMapReverse[node.data.height]]}
                    onValueChange={handleSizeChange}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    {sizeOptions.map((option, index) => (
                        <span
                            key={index}
                            className={
                                sizeMapReverse[node.data.height] === index + 1
                                    ? "font-medium text-gray-700"
                                    : ""
                            }
                        >
                            {option}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="bgColor"
                        className="text-sm font-medium text-gray-700"
                    >
                        <PaintBucket className="w-4 h-4 inline-block mr-2" />
                        Màu nền
                    </Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="bgColor"
                            name="bgColor"
                            type="color"
                            className="w-12 h-8 p-1 rounded cursor-pointer"
                            value={node.data.bgColor}
                            onChange={handleSettingsChange}
                        />
                        <Input
                            name="bgColor"
                            className="flex-grow"
                            value={node.data.bgColor}
                            onChange={handleSettingsChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="textColor"
                        className="text-sm font-medium text-gray-700"
                    >
                        <Palette className="w-4 h-4 inline-block mr-2" />
                        Màu chữ
                    </Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="textColor"
                            name="textColor"
                            type="color"
                            className="w-12 h-8 p-1 rounded cursor-pointer"
                            value={node.data.textColor}
                            onChange={handleSettingsChange}
                        />
                        <Input
                            name="textColor"
                            className="flex-grow"
                            value={node.data.textColor}
                            onChange={handleSettingsChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 grow h-0 max-h-full">
                <div className="flex justify-between items-center">
                    <Label
                        htmlFor="note"
                        className="text-sm font-medium text-gray-700"
                    >
                        <NotebookPen className="w-4 h-4 inline-block mr-2" />
                        Ghi chú
                    </Label>
                    <Button
                        className="bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group"
                        size="sm"
                        onClick={handleAISuggestion}
                        disabled={isAISuggesting}
                    >
                        <Sparkles className="size-4 mr-2" />
                        Gợi ý từ AI
                    </Button>
                </div>
                <ScrollArea className="border rounded-md grow max-h-full">
                    <BlockNoteView
                        editor={editor}
                        onChange={() => {
                            setBlocks(editor.document)
                        }}
                        theme={"light"}
                    />
                </ScrollArea>
            </div>
        </div>
    )
}

export default NodeInfo
