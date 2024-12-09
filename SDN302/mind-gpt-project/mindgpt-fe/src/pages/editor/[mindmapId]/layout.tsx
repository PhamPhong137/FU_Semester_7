import { Outlet, useParams } from "react-router-dom"
import Header from "../_components/layout/Header"
import Sidebar from "../_components/layout/sidebar"
import AuthPage from "@/components/auth-page"
import { useUser } from "@/api/hooks"
import { useEffect, useState } from "react"
import Loader from "@/components/loader"
import { NotFoundPage } from "@/pages/404"

const MindmapEditorLayout = () => {
    const { data, isLoading } = useUser()
    const { orgId } = useParams()
    const [isUserInOrg, setIsUserInOrg] = useState(false)
    useEffect(() => {
        if (data) {
            setIsUserInOrg(data.organizations.some((org) => org.id === orgId))
        }
    }, [data, isLoading])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }
    if (!isLoading && !isUserInOrg) {
        return <NotFoundPage />
    }
    return (
        <AuthPage>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-grow flex-row overflow-hidden">
                    <Sidebar />
                    <div className="flex-grow overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </AuthPage>
    )
}

export default MindmapEditorLayout
