import { useUser } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronsUpDown, Plus, Users } from "lucide-react"
import { useMemo } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const OrgSwitcher = () => {
    const { orgId } = useParams()
    const { data: user, isLoading } = useUser()
    const navigate = useNavigate()

    const org = useMemo(() => {
        if (isLoading) return null
        return user?.organizations.find((org) => org.id === orgId)
    }, [user, isLoading, orgId])

    const isOwner = useMemo(() => {
        if (isLoading) return null
        return user?.organizations.find((org) => org.id === orgId)?.is_owner
    }, [user, isLoading, orgId])

    if (isLoading) return null

    if (!org) return null
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-left">
                <Button variant="ghost" className="font-semibold text-lg">
                    <span className="w-[250px] truncate">{org.name}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {isLoading ||
                    user.organizations.map((org, index) => (
                        <DropdownMenuItem key={index} className="p-0">
                            <Link
                                to={`/dashboard/${org.id}`}
                                className="w-full h-full flex items-center px-2 py-1.5"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                <span className="truncate">{org.name}</span>
                                {orgId === org.id && (
                                    <Check className="size-4 ml-2" />
                                )}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                <DropdownMenuItem onSelect={() => navigate("/create-org")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create new organization
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default OrgSwitcher
