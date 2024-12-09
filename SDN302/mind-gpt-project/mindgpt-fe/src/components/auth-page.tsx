import { useUser } from "@/api/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./loader"

const AuthPage = ({ children }: { children?: React.ReactNode }) => {
    const { data: user, isLoading } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                navigate("/login")
            } else {
                if (user.organizations.length === 0) {
                    navigate("/create-org")
                }
            }
        }
    }, [user, isLoading])
    if (isLoading)
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    return children
}

export default AuthPage
