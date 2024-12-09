import { Outlet, useParams } from "react-router-dom"
import Header from "../_compoments/header"
import Sidebar from "../_compoments/sidebar"
import { useEffect } from "react"
import { useCurrentOrg } from "@/stores/org-store"
import AuthPage from "@/components/auth-page"

export default function DashboardLayout() {
    const { orgId } = useParams()
    const { setCurrentOrg } = useCurrentOrg()
    useEffect(() => {
        setCurrentOrg(orgId)
    }, [orgId])

    return (
        <AuthPage>
            <div className="fixed inset-0 flex">
                <div className="hidden md:block w-[240px] border-r border-gray-200">
                    <Sidebar />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-[60px] border-b border-gray-200">
                        <Header />
                    </div>
                    <main className="flex-1 overflow-auto bg-background">
                        <div className="mx-auto py-6 px-10 h-full">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </AuthPage>
    )
}
