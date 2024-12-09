import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React, { createContext, useState } from "react"

interface DialogProps {
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export const DialogContext = createContext(
    {} as {
        showDialog: (props: DialogProps) => void
        hideDialog: () => void
    }
)

const DialogProvider = ({ children }) => {
    const [show, setShow] = useState(false)
    const [dialogContent, setDialogContent] = useState<DialogProps>({
        title: "",
        description: null,
        children: "",
        footer: null,
    })

    const showDialog = ({
        title,
        description,
        children,
        footer,
    }: DialogProps) => {
        setDialogContent({ title, description, children, footer })
        setShow(true)
    }

    const hideDialog = () => {
        setShow(false)
        setDialogContent({
            title: "",
            description: null,
            children: "",
            footer: null,
        })
    }

    const dialog = { showDialog, hideDialog }
    return (
        <DialogContext.Provider value={dialog}>
            <Dialog open={show} onOpenChange={setShow}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogContent.title}</DialogTitle>
                        {dialogContent.description && (
                            <DialogDescription>
                                {dialogContent.description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    {dialogContent.children}
                    {dialogContent.footer && (
                        <DialogFooter>{dialogContent.footer}</DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
            {children}
        </DialogContext.Provider>
    )
}

export default DialogProvider
