import { Stepper } from "@/components/stepper"
import { Brain, PenLine, WandSparkles } from "lucide-react"
import { useState } from "react"
import { Step1, Step2, Step3 } from "../_compoments/new-mindmap"
import { useCreateMindmap } from "@/stores/create-mindmap-store"

const steps = [
    {
        title: "Chọn chế độ",
        description: "Chọn chế độ sáng tạo hoặc tóm tắt",
        icon: <Brain className="size-6" />,
    },
    {
        title: "Điền thông tin",
        description: "Điền thông tin cơ bản của bản đồ tư duy",
        icon: <PenLine className="size-6" />,
    },
    {
        title: "Hoàn tất",
        description: "Đợi chúng tôi xử lý và tạo bản đồ tư duy cho bạn",
        icon: <WandSparkles className="size-6" />,
    },
]

const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
}

export default function NewMindmapPage() {
    const { step } = useCreateMindmap()
    return (
        <div className="flex flex-col h-full">
            <Stepper steps={steps} currentStep={step} />
            <div className="grow">{stepComponents[step]}</div>
        </div>
    )
}
