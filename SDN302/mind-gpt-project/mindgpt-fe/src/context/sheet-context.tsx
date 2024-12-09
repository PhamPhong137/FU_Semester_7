import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { createContext, useState } from "react"

interface SheetProps {
    title: string
    size?: "sm" | "md" | "lg"
    position?: "top" | "bottom" | "left" | "right"
    children: React.ReactNode
}

const sheetSizes: Record<string, string> = {
    sm: "256px",
    md: "512px",
    lg: "768px",
}

export const SheetContext = createContext(
    {} as {
        showSheet: (props: SheetProps) => void
        hideSheet: () => void
    }
)

const SheetProvider = ({ children }) => {
    const [show, setShow] = useState(false)
    const [sheetContent, setSheetContent] = useState<SheetProps>({
        title: "",
        size: "md",
        position: "bottom",
        children: null,
    })

    const showSheet = ({
        title,
        size = "lg",
        position = "right",
        children,
    }: SheetProps) => {
        setSheetContent({ title, size, position, children })
        setShow(true)
    }

    const hideSheet = () => {
        setShow(false)
        setSheetContent({
            title: "",
            size: "md",
            position: "bottom",
            children: null,
        })
    }

    const sheet = { showSheet, hideSheet }

    return (
        <SheetContext.Provider value={sheet}>
            <Sheet open={show} onOpenChange={setShow}>
                <SheetContent
                    side={sheetContent.position}
                    style={{
                        width:
                            sheetContent.position === "left" ||
                            sheetContent.position === "right"
                                ? sheetSizes[sheetContent.size]
                                : "100%",
                    }}
                >
                    <SheetHeader>
                        <SheetTitle>{sheetContent.title}</SheetTitle>
                        <SheetDescription />
                    </SheetHeader>
                    {sheetContent.children}
                </SheetContent>
            </Sheet>
            {children}
        </SheetContext.Provider>
    )
}

export default SheetProvider
