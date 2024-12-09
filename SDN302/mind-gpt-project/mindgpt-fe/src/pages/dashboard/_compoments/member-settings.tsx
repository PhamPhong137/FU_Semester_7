import { useOrg, useUser } from "@/api/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDialog } from "@/hooks"
import { OrgResponse } from "@/types"
import { authInstance } from "@/utils/axios"
import { useQueryClient } from "@tanstack/react-query"
import {
    ArrowLeftRight,
    Ellipsis,
    User2,
    UserCheck,
    UserPlus,
    UserX,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const MemberSettings = () => {
    const { data: orgData, isLoading: isOrgLoading, setOrg } = useOrg()
    const { data: userData, isLoading: isUserLoading } = useUser()
    const [isOwner, setIsOwner] = useState<boolean | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const addForm = useForm({
        defaultValues: {
            email: "",
        },
    })
    const queryClient = useQueryClient()
    useEffect(() => {
        if (userData && orgData) {
            const user = userData.organizations.find(
                (org) => org.id === orgData.id
            )
            setIsOwner(user?.is_owner || false)
        }
    }, [userData, orgData])
    const dialog = useDialog()

    const handleAddMember = async (usersEmail: string[]) => {
        const loading = toast.loading("Đang thêm thành viên...")
        // Validate form
        if (
            !addForm.getValues("email") ||
            addForm.getValues("email").trim() === ""
        ) {
            toast.error("Email không được để trống")
            toast.dismiss(loading)
            return
        }
        if (
            !emailRegex.test(addForm.getValues("email").toLowerCase()) ||
            addForm.getValues("email").length > 255
        ) {
            toast.error("Email không hợp lệ")
            toast.dismiss(loading)
            return
        }
        try {
            const { data } = await authInstance.put<OrgResponse>(
                `/org/${orgData.id}/add`,
                {
                    usersEmail,
                }
            )
            toast.success("Thêm thành viên thành công")
            setOrg(data)
            addForm.reset()
        } catch (error) {
            toast.error("Thêm thành viên thất bại")
        } finally {
            dialog.hideDialog()
            toast.dismiss(loading)
        }
    }

    const showAddMemberDialog = () => {
        dialog.showDialog({
            title: "Thêm thành viên",
            children: (
                <div>
                    <Label htmlFor="new-member-email">
                        Email của thành viên mới
                    </Label>
                    <Input
                        id="new-member-email"
                        {...addForm.register("email")}
                        placeholder="john.doe@example.com"
                    />
                </div>
            ),
            footer: (
                <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={dialog.hideDialog}>
                        Hủy
                    </Button>
                    <Button
                        variant={"success"}
                        onClick={() =>
                            handleAddMember([addForm.getValues("email")])
                        }
                    >
                        Thêm
                    </Button>
                </div>
            ),
        })
    }

    const handleRemoveMember = async (usersEmail: string[]) => {
        const loading = toast.loading("Đang xóa thành viên...")
        try {
            await authInstance.put(`/org/${orgData.id}/remove`, {
                usersEmail,
            })
            toast.success("Xóa thành viên thành công")
            setOrg({
                ...orgData,
                users: orgData.users.filter(
                    (user) => !usersEmail.includes(user.email)
                ),
            })
        } catch (error) {
            toast.error("Xóa thành viên thất bại")
        } finally {
            dialog.hideDialog()
            toast.dismiss(loading)
        }
    }

    const handelConfirmRemove = (usersEmail: string[]) => {
        dialog.showDialog({
            title: "Xác nhận xóa thành viên",
            children: (
                <div>
                    <p className="text-sm">
                        Bạn có chắc chắn muốn xóa thành viên này không?
                    </p>
                </div>
            ),
            footer: (
                <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={dialog.hideDialog}>
                        Hủy
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => handleRemoveMember(usersEmail)}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        })
    }

    const handleTransferOwnership = async (newOwnerEmail: string) => {
        const loading = toast.loading("Đang chuyển giao quyền...")
        try {
            await authInstance.put(`/org/${orgData.id}/transfer`, {
                newOwnerEmail,
            })
            toast.success("Đã chuyển giao quyền")
            queryClient.invalidateQueries({
                queryKey: ["org", orgData.id],
            })
            queryClient.invalidateQueries({
                queryKey: ["user", userData.id],
            })
            setIsOwner(false)
        } catch (error) {
            toast.error("Chuyển giao quyền thất bại")
        } finally {
            dialog.hideDialog()
            toast.dismiss(loading)
        }
    }

    const handleConfirmTransfer = (newOwnerEmail: string) => {
        dialog.showDialog({
            title: "Xác nhận chuyển giao quyền",
            children: (
                <div>
                    <p className="text-sm">
                        Bạn có chắc chắn muốn chuyển giao quyền sở hữu nhóm này
                        không?
                    </p>
                </div>
            ),
            footer: (
                <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={dialog.hideDialog}>
                        Hủy
                    </Button>
                    <Button
                        variant={"success"}
                        onClick={() => handleTransferOwnership(newOwnerEmail)}
                    >
                        Chuyển giao
                    </Button>
                </div>
            ),
        })
    }

    return (
        <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Thành viên</CardTitle>
                {isOwner && (
                    <Button
                        variant="success"
                        size="sm"
                        disabled={isOrgLoading || isUserLoading}
                        onClick={showAddMemberDialog}
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Thêm thành viên
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {!isOrgLoading ? (
                        orgData.users.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between space-x-4"
                            >
                                <div className="flex gap-4 items-center">
                                    <Avatar>
                                        <AvatarImage src={member.picture} />
                                        <AvatarFallback>
                                            <User2 className="size-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex gap-2">
                                            <p className="font-semibold">
                                                {member.name}
                                            </p>
                                            <Badge
                                                className="hover:bg-primary"
                                                variant={
                                                    member.is_owner
                                                        ? "destructive"
                                                        : "default"
                                                }
                                            >
                                                {member.is_owner
                                                    ? "Chủ nhóm"
                                                    : "Thành viên"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {member.email}
                                        </p>
                                    </div>
                                </div>

                                {isOwner && !member.is_owner && (
                                    <div className="flex gap-2">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        handleConfirmTransfer(
                                                            member.email
                                                        )
                                                    }}
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Chuyển giao quyền sở hữu
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    variant="outline"
                                                    className="text-red-600"
                                                    onClick={() =>
                                                        handelConfirmRemove([
                                                            member.email,
                                                        ])
                                                    }
                                                >
                                                    <UserX className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Xóa thành viên
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default MemberSettings
