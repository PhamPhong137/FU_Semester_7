import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Cover } from "@/components/ui/cover"
import { cn } from "@/lib/utils"
import { useCreateMindmap } from "@/stores/create-mindmap-store"
import { MindmapResponse } from "@/types"
import { instance } from "@/utils/axios"
import {
    Bot,
    Brain,
    BrainCircuit,
    Earth,
    FileText,
    Network,
    PencilLine,
} from "lucide-react"
import { forwardRef, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            {children}
        </div>
    )
})

const Step3 = () => {
    const { formData, setStep, step, reset } = useCreateMindmap()
    const { orgId } = useParams()
    const navigate = useNavigate()
    const handleCreateMindmap = async () => {
        const creatingToast = toast.loading("Đang tạo sơ đồ tư duy...")
        try {
            const { data } = await instance.post<{
                status: number
                message: string
                data: MindmapResponse
            }>(`/mindmap/${orgId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success("Tạo sơ đồ tư duy thành công!")
            navigate(`/editor/${orgId}/${data.data._id}`)
            reset()
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            setStep(1)
        } finally {
            toast.dismiss(creatingToast)
        }
    }
    useEffect(() => {
        if (step < 3) {
            navigate(`/dashboard/${orgId}/new`)
            reset()
        }
        handleCreateMindmap()
    }, [])
    const containerRef = useRef<HTMLDivElement>(null)
    const div1Ref = useRef<HTMLDivElement>(null)
    const div2Ref = useRef<HTMLDivElement>(null)
    const div3Ref = useRef<HTMLDivElement>(null)
    const div4Ref = useRef<HTMLDivElement>(null)
    const div5Ref = useRef<HTMLDivElement>(null)
    const div6Ref = useRef<HTMLDivElement>(null)
    const div7Ref = useRef<HTMLDivElement>(null)
    return (
        <div className="flex h-full items-center flex-col py-10">
            <div className="capitalize text-3xl font-bold mb-12">
                Sơ đồ tư duy của bạn <Cover>đang được tổng hợp...</Cover>
            </div>
            <div className="py-10 flex w-full items-center justify-center">
                <div className="relative w-full max-w-2xl" ref={containerRef}>
                    <div className="flex size-full flex-col items-stretch justify-between gap-10">
                        <div className="flex flex-row items-center justify-between">
                            <Circle
                                ref={div1Ref}
                                className="size-16 bg-gradient-to-tl from-blue-600 to-blue-400"
                            >
                                <Brain className="text-white" />
                            </Circle>
                            <Circle
                                ref={div5Ref}
                                className="size-16 bg-gradient-to-tr from-red-600 to-red-400"
                            >
                                <Bot className="text-white" />
                            </Circle>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <Circle
                                ref={div2Ref}
                                className="size-16 bg-gradient-to-l from-green-600 to-green-400"
                            >
                                <FileText className="text-white" />
                            </Circle>
                            <Circle
                                ref={div4Ref}
                                className="size-24 bg-gradient-to-br from-purple-500 to-pink-500"
                            >
                                <Network className="text-white size-12" />
                            </Circle>
                            <Circle
                                ref={div6Ref}
                                className="size-16 bg-gradient-to-r from-pink-600 to-pink-400"
                            >
                                <PencilLine className="text-white" />
                            </Circle>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <Circle
                                ref={div3Ref}
                                className="size-16 bg-gradient-to-bl from-yellow-600 to-yellow-400"
                            >
                                <Earth className="text-white" />
                            </Circle>
                            <Circle
                                ref={div7Ref}
                                className="size-16 bg-gradient-to-br from-purple-600 to-purple-400"
                            >
                                <BrainCircuit className="text-white" />
                            </Circle>
                        </div>
                    </div>

                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div1Ref}
                        toRef={div4Ref}
                        curvature={-90}
                        endYOffset={-10}
                    />
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div2Ref}
                        toRef={div4Ref}
                    />
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div3Ref}
                        toRef={div4Ref}
                        curvature={90}
                        endYOffset={10}
                    />
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div5Ref}
                        toRef={div4Ref}
                        curvature={-90}
                        endYOffset={-10}
                        reverse
                    />
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div6Ref}
                        toRef={div4Ref}
                        reverse
                    />
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div7Ref}
                        toRef={div4Ref}
                        curvature={90}
                        endYOffset={10}
                        reverse
                    />
                </div>
            </div>
        </div>
    )
}

export default Step3
