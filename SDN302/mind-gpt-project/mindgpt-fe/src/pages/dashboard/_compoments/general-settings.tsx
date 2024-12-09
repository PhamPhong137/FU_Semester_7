import { useOrg, useUser } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDialog } from "@/hooks"
import { capitalizeFirstLetter } from "@/utils"
import { authInstance, instance } from "@/utils/axios"
import { useQueryClient } from "@tanstack/react-query"
import { Save, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const removeAction: Record<string, string> = {
    delete: "xóa nhóm",
    leave: "rời nhóm",
}

const GeneralOrgSettings = () => {
    const { isLoading: isOrgLoading, data: orgData, setOrg } = useOrg()
    const { isLoading: isUserLoading, data: userData, setUser } = useUser()
    const [orgName, setOrgName] = useState(orgData?.name || "")
    const [isOwner, setIsOwner] = useState<boolean | null>(null)

    useEffect(() => {
        if (orgData) {
            setOrgName(orgData.name)
        }
    }, [orgData])

    useEffect(() => {
        if (userData && orgData) {
            const user = userData.organizations.find(
                (org) => org.id === orgData.id
            )
            setIsOwner(user?.is_owner || false)
        }
    }, [userData, orgData])

    const dialog = useDialog()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const handleUpdateOrg = async () => {
        const updateLoading = toast.loading("Đang cập nhật thông tin...")
        if (!orgName || orgName.trim() === "") {
            toast.dismiss(updateLoading)
            toast.error("Vui lòng nhập tên nhóm!")
            return
        }
        try {
            await authInstance.put(`/org/${orgData.id}`, {
                name: orgName,
            })
            setOrg({
                ...orgData,
                name: orgName,
            })
            toast.success("Cập nhật thông tin nhóm thành công!")
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!")
        } finally {
            dialog.hideDialog()
            toast.dismiss(updateLoading)
        }
    }

    const handleRemoveOrg = async (action: "delete" | "leave") => {
        const loading = toast.loading(`Đang ${removeAction[action]}...`)
        try {
            switch (action) {
                case "delete":
                    await instance.delete(`/org/${orgData.id}`)
                    break
                case "leave":
                    await authInstance.delete(`/org/${orgData.id}/leave`)
                    break
            }
            toast.success(
                `${capitalizeFirstLetter(removeAction[action])} thành công!`
            )
            queryClient.invalidateQueries({
                queryKey: ["org", orgData.id],
            })
            queryClient.invalidateQueries({
                queryKey: ["user", userData.id],
            })
            setUser({
                ...userData,
                organizations: userData.organizations.filter(
                    (org) => org.id !== orgData.id
                ),
            })
            navigate("/login")
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!")
        } finally {
            dialog.hideDialog()
            toast.dismiss(loading)
        }
    }

    const handleConfirmRemoveOrg = async (action: "delete" | "leave") => {
        dialog.showDialog({
            title: `Xác nhận ${removeAction[action]}`,
            children: (
                <div>
                    <p className="text-sm">
                        Bạn có chắc chắn muốn {removeAction[action]} này không?
                        Hành động này không thể hoàn tác!
                    </p>
                </div>
            ),
            footer: (
                <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={dialog.hideDialog}>
                        Hủy
                    </Button>
                    <Button
                        variant={
                            action === "delete" ? "destructive" : "warning"
                        }
                        onClick={() => handleRemoveOrg(action)}
                    >
                        {capitalizeFirstLetter(removeAction[action])}
                    </Button>
                </div>
            ),
        })
    }

    return (
        <Card className="w-full flex-grow flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Cài đặt nhóm</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="org-name" className="font-semibold">
                            Tên nhóm
                        </Label>
                        <Input
                            id="org-name"
                            placeholder="VD: Nhóm của Cóc chăm học"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            disabled={!isOwner || isOrgLoading || isUserLoading}
                        />
                    </div>
                </form>
                <div className="space-y-4">
                    <Label className="font-semibold text-orange-600 block">
                        Vùng nguy hiểm
                    </Label>
                    {isOwner ? (
                        <Button
                            variant="destructive"
                            onClick={() => handleConfirmRemoveOrg("delete")}
                            disabled={isOrgLoading || isUserLoading}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa nhóm
                        </Button>
                    ) : (
                        <Button
                            variant="warning"
                            onClick={() => handleConfirmRemoveOrg("leave")}
                            disabled={isOrgLoading || isUserLoading}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Rời nhóm
                        </Button>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="success" onClick={handleUpdateOrg}>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu
                </Button>
            </CardFooter>
        </Card>
    )
}

export default GeneralOrgSettings
