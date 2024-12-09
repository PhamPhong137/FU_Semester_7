import { Button } from "@/components/ui/button"
import { useCreateMindmap } from "@/stores/create-mindmap-store"
import { BrainCircuit, Network } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Step1 = () => {
    const { orgId } = useParams()
    const { formData, nextStep, reset } = useCreateMindmap()

    useEffect(() => {
        formData.delete("type")
        formData.set("documentsId", "[]")
        formData.set("depth", "5")
        formData.set("child", "4")
    }, [])

    const handleSelectType = (type: "creative" | "summary") => {
        formData.set("type", type)
        nextStep()
    }

    return (
        <div className="flex h-full items-center flex-col py-10">
            <h1 className="capitalize text-3xl font-bold mb-16">Chọn chế độ</h1>
            <div className="flex items-center justify-center gap-12">
                <Button
                    variant="outline"
                    className="hover:bg-primary text-primary hover:text-white w-80 h-60 flex flex-col items-center justify-center gap-6"
                    onClick={() => handleSelectType("creative")}
                >
                    <span>
                        <BrainCircuit className="size-20" />
                    </span>
                    <span className="text-2xl capitalize font-semibold">
                        Sáng tạo
                    </span>
                </Button>
                <Button
                    variant="outline"
                    className="hover:bg-primary text-primary hover:text-white w-80 h-60 flex flex-col items-center justify-center gap-6"
                    onClick={() => handleSelectType("summary")}
                >
                    <span>
                        <Network className="size-20" />
                    </span>
                    <span className="text-2xl capitalize font-semibold">
                        Tóm tắt
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Step1
