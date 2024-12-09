import { MindmapResponse } from "@/types"
import { deleteMindmap } from "../_api"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import useDialog from "@/hooks/use-dialog"

interface MindmapCardProps {
    mindmap: MindmapResponse
}

const MindmapCard = ({ mindmap }: MindmapCardProps) => {
    const { orgId } = useParams()
    const queryClient = useQueryClient()
    const dialog = useDialog()
    const handleDelete = async () => {
        const deletingToast = toast.loading("Đang xóa...")

        try {
            await deleteMindmap(orgId, mindmap._id)
            toast.success("Xóa thành công")
            queryClient.invalidateQueries({
                queryKey: ["mindmaps", orgId],
            })
        } catch (error) {
            toast.error("Xóa thất bại")
        } finally {
            toast.dismiss(deletingToast)
        }
    }

    const handleConfirmDelete = async () => {
        dialog.showDialog({
            title: "Xác nhận xóa",
            children: (
                <>
                    <p>
                        Bạn có chắc chắn muốn xóa sơ đồ tư duy{" "}
                        <strong>{mindmap.title}</strong> không?
                    </p>
                    <p>
                        <span className="text-orange-600 font-bold">
                            Lưu ý:
                        </span>{" "}
                        Sơ đồ tư duy sẽ không thể khôi phục sau khi xóa.
                    </p>
                </>
            ),
            footer: (
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => dialog.hideDialog()}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            dialog.hideDialog()
                            handleDelete()
                        }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        })
        return
    }
    return (
        <Card className="flex flex-col h-80 overflow-hidden pt-0">
            <CardHeader className="aspect-video flex items-center justify-center p-0">
                <img
                    src={`${
                        mindmap.thumbnail && mindmap.thumbnail.trim() !== ""
                            ? mindmap.thumbnail
                            : `https://placehold.co/640x360?text=${
                                  mindmap.prompt || "Mindmap"
                              }`
                    }`}
                    alt=""
                    className="size-full aspect-video"
                />
            </CardHeader>
            <CardContent className="flex-grow flex-col py-3 px-4">
                <h3 className="text-lg font-bold truncate">{mindmap.title}</h3>
                <p className="text-gray-600 mt-1 text-sm">{mindmap.prompt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4 gap-4">
                <Button className="flex-grow" variant="success" asChild>
                    <Link to={`/editor/${orgId}/${mindmap._id}`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleConfirmDelete}
                >
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default MindmapCard
