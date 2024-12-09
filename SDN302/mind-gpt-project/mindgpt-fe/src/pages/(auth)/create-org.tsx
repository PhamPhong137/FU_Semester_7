import { useUser } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/stores"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { createOrg } from "./api"

const CreateOrgPage = () => {
    const { data: user, isLoading, setUser } = useUser()
    const [orgName, setOrgName] = useState("")
    const [creating, setCreating] = useState(false)
    const { token, setToken } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (user && orgName.trim() === "") {
            setOrgName(`Nhóm của ${user.name}`)
        }
    }, [user, isLoading])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[url('/bg.png')] bg-center bg-no-repeat bg-cover">
                <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                    {/* Loading */}
                    Loading...
                </div>
            </div>
        )
    }

    const handleCreateOrg = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCreating(true)
        if (orgName.trim() === "") {
            toast.error("Tên nhóm không được để trống")
            setCreating(false)
            return
        }
        const creatingToast = toast.loading("Đang tạo nhóm...")
        try {
            const org = await createOrg(orgName)
            setUser({
                ...user,
                organizations: [
                    ...user.organizations,
                    {
                        id: org.id,
                        name: org.name,
                        is_owner: true,
                        created_at: new Date().toISOString(),
                        image: null,
                        metadata: null,
                        subscription: org.subscription,
                    },
                ],
            })
            toast.success("Tạo nhóm thành công")
            navigate(`/dashboard/${org.id}`)
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo nhóm")
        } finally {
            toast.dismiss(creatingToast)
            setCreating(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Chào mừng đến với MindGPT
                    </CardTitle>
                    <CardDescription className="text-center">
                        Tạo một nhóm để bắt đầu sử dụng
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center flex-col gap-4">
                    <form
                        className="flex justify-center flex-col gap-4"
                        onSubmit={(e) => handleCreateOrg(e)}
                    >
                        <Input
                            disabled={creating}
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder={`Nhóm của ${user.name}`}
                        />
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={creating}
                            type="submit"
                        >
                            <Plus className="size-4 mr-2" />
                            Tạo nhóm
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateOrgPage
