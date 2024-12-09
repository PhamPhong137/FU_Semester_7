import { useUser } from "@/api/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/stores"
import { CircleUser } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const UserAvatarMenu = () => {
    const { data: user, isLoading } = useUser()
    const navigate = useNavigate()
    const { setToken } = useAuth()
    if (isLoading) return <Skeleton className="size-9 rounded-full" />

    if (!user) return <></>

    const handleLogout = () => {
        setToken(null)
        navigate("/login")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                >
                    <Avatar>
                        <AvatarImage src={user.picture} />
                        <AvatarFallback>
                            <CircleUser className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quản lý tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to={"/profile"}>Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatarMenu
