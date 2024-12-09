import { Check } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Step {
    title: string
    description: string
    icon: React.ReactNode
}

interface StepperProps {
    currentStep?: number
    steps: Step[]
}

export function Stepper({ currentStep = 0, steps = [] }: StepperProps) {
    return (
        <div className="max-w-5xl w-full mx-auto">
            <div className="relative">
                {/* Connecting Lines */}
                <div className="absolute top-1/3 left-0 right-0 h-0.5 -translate-y-1/4 bg-gray-300 mx-10">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-in-out"
                        style={{
                            width: `${
                                ((currentStep - 1) / (steps.length - 1)) * 100
                            }%`,
                        }}
                    ></div>
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index + 1 < currentStep
                        const isCurrent = index + 1 === currentStep
                        return (
                            <Tooltip key={index}>
                                <TooltipTrigger>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`
                        flex items-center justify-center w-12 h-12 rounded-full 
                        transition-all duration-500 ease-in-out
                        ${
                            isCompleted || isCurrent
                                ? "bg-primary text-primary-foreground"
                                : "bg-white border-2 border-gray-300 text-gray-300"
                        }
                      `}
                                        >
                                            {isCompleted ? (
                                                <Check className="w-6 h-6" />
                                            ) : (
                                                step.icon
                                            )}
                                        </div>
                                        <span
                                            className={`mt-2 text-xs font-medium ${
                                                isCompleted || isCurrent
                                                    ? "text-primary"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {step.description}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
