import { useQueryParams } from "@/hooks"
import { getAuth, useAuth } from "@/stores/auth-store"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CallBackPage = () => {
    const { setToken } = useAuth()
    const params = useQueryParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (params.token) {
            setToken(params.token)
            queryClient.invalidateQueries({
                queryKey: ["user", params.token],
            })
        }
        navigate("/login")
    }, [params])

    return (
        <div className="h-screen flex items-center justify-center bg-[url('/bg.png')] bg-center bg-no-repeat bg-cover">
            <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                {/* Change to loading */}
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default CallBackPage
