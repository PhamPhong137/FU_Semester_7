import { DialogContext } from "@/context/dialog-context"
import { useContext } from "react"

const useDialog = () => {
    return useContext(DialogContext)
}

export default useDialog
