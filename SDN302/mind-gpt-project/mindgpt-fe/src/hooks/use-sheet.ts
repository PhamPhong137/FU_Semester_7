import { SheetContext } from "@/context/sheet-context"
import { useContext } from "react"

const useSheet = () => {
    return useContext(SheetContext)
}

export default useSheet
