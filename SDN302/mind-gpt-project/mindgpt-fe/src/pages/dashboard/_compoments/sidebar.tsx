import { Settings, CreditCard, BrainCircuit, Network } from "lucide-react"

import { Link, useLocation, useParams } from "react-router-dom"
import { getLastPath } from "@/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import SparklesText from "@/components/ui/sparkles-text"
import { useState } from "react"
import { useCreateMindmap } from "@/stores/create-mindmap-store"

const sideBarItems = [
    {
        label: "Tất cả sơ đồ",
        icon: <Network className="h-4 w-4" />,
        href: "",
    },
    {
        label: "Cài đặt nhóm",
        icon: <Settings className="h-4 w-4" />,
        href: "settings",
    },
    {
        label: "Các gói",
        icon: <CreditCard className="h-4 w-4" />,
        href: "subscription",
    },
]

const Sidebar = () => {
    const { pathname } = useLocation()
    const { orgId } = useParams()
    const [createHover, setCreateHover] = useState(false)

    const form = useCreateMindmap()
    return (
        <div className="hidden border-r bg-muted/40 md:block h-full">
            <div className="flex h-full max-h-screen flex-col">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        to={`/dashboard/${orgId}`}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <BrainCircuit className="size-6 text-primary" />
                        <span className="">MindGPT</span>
                    </Link>
                </div>
                <nav className="grow flex flex-col items-start px-2 text-sm font-medium lg:px-4">
                    <SparklesText
                        className="my-4 w-full"
                        disabled={!createHover}
                    >
                        <Button
                            className="w-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group"
                            size="lg"
                            onMouseOver={() => setCreateHover(true)}
                            onMouseLeave={() => setCreateHover(false)}
                            asChild
                        >
                            <Link to={`/dashboard/${orgId}/new`}>
                                Tạo sơ đồ tư duy
                            </Link>
                        </Button>
                    </SparklesText>
                    <Separator className="mb-4" />
                    {sideBarItems.map((item) => (
                        <Link
                            key={item.label}
                            to={`/dashboard/${orgId}/${item.href}`}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all ${
                                getLastPath(pathname) === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:text-primary "
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
