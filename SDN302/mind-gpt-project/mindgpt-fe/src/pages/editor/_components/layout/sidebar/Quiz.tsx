import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CommonNodeData } from "@/nodes/common-node"
import { useSelectedNodes } from "@/stores/selected-nodes-store"
import { QuizResponse } from "@/types"
import { convertMindmapNodeToNode } from "@/utils"
import { instance } from "@/utils/axios"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useReactFlow } from "reactflow"

const Question = ({
    questionIndex,
    question,
    isSubmitted,
}: {
    questionIndex: number
    question: QuizResponse
    isSubmitted: boolean
}) => {
    return <div></div>
}

export default function Quiz() {
    const { orgId, mindmapId } = useParams()
    const [loading, setLoading] = useState(false)
    const [quizNumber, setQuizNumber] = useState(5)
    const { nodes } = useSelectedNodes()
    const { getNodes } = useReactFlow<CommonNodeData>()
    const [quizQuestions, setQuizQuestions] = useState<QuizResponse[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: string
    }>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const handleGenQuiz = async () => {
        // checkl input is number, value from 1-10 and not empty
        if (isNaN(quizNumber) || quizNumber < 1 || quizNumber > 10) {
            toast.error("Số lượng câu hỏi phải là số từ 1 đến 10")
            return
        }
        setLoading(true)
        const loading = toast.loading("Đang tạo bài quiz...")
        setQuizQuestions([])
        setScore(0)
        setIsSubmitted(false)
        setSelectedAnswers({})
        try {
            const selected = nodes.length === 0 ? getNodes() : nodes
            const { data } = await instance.post<{
                status: number
                message: string
                data: QuizResponse[]
            }>(`/mindmap/${orgId}/${mindmapId}/gen-quiz`, {
                selectedNodes: selected.map((node) => ({
                    id: node.id,
                    name: node.data.label,
                })),
                questionNumber: quizNumber,
            })
            setQuizQuestions(data.data)
            toast.success("Tạo bài quiz thành công")
        } catch (error) {
            toast.error("Tạo bài quiz thất bại")
        } finally {
            setLoading(false)
            toast.dismiss(loading)
        }
    }
    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }))
    }
    const handleSubmit = () => {
        let newScore = 0
        quizQuestions.forEach((question, index) => {
            if (
                selectedAnswers[index] ===
                question.answers.find((a) => a.isCorrect)?.answer
            ) {
                newScore++
            }
        })
        setScore(newScore)
        setIsSubmitted(true)
    }
    return (
        <div className="flex flex-col h-full gap-5">
            <div className="flex gap-2 items-center p-1">
                <Input
                    disabled={loading}
                    className="rounded-sm"
                    placeholder="Nhập số lượng câu hỏi"
                    type="number"
                    value={quizNumber}
                    onChange={(e) => setQuizNumber(+e.target.value)}
                />
                <Button
                    className="bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group"
                    size="sm"
                    onClick={handleGenQuiz}
                    disabled={loading}
                >
                    <Sparkles className="size-4 mr-2" />
                    Tạo
                </Button>
            </div>
            <Separator />
            <ScrollArea className="grow pr-4">
                {quizQuestions.length > 0 &&
                    quizQuestions.map((question, questionIndex) => (
                        <div
                            key={questionIndex}
                            className="mb-6 border rounded-md p-2"
                        >
                            <h3 className="text-md font-semibold mb-2">
                                Câu hỏi số {questionIndex + 1}
                            </h3>
                            <p className="mb-2 break-words">
                                {question.question}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {question.answers.map((answer, answerIndex) => (
                                    <Button
                                        key={answerIndex}
                                        variant={
                                            selectedAnswers[questionIndex] ===
                                            answer.answer
                                                ? "default"
                                                : "outline"
                                        }
                                        className={`w-full h-full py-2 px-2 text-sm whitespace-normal break-words ${
                                            isSubmitted
                                                ? answer.isCorrect
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : selectedAnswers[
                                                          questionIndex
                                                      ] === answer.answer
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : ""
                                                : ""
                                        }`}
                                        onClick={() =>
                                            !isSubmitted &&
                                            handleAnswerSelect(
                                                questionIndex,
                                                answer.answer
                                            )
                                        }
                                        disabled={isSubmitted}
                                    >
                                        {answer.answer}
                                    </Button>
                                ))}
                            </div>
                            {isSubmitted && (
                                <p className="text-sm mt-3 break-words">
                                    {selectedAnswers[questionIndex] ===
                                    question.answers.find((a) => a.isCorrect)
                                        ?.answer
                                        ? "Chính xác!"
                                        : `Chưa chính xác. Đáp án đúng là: ${
                                              question.answers.find(
                                                  (a) => a.isCorrect
                                              )?.answer
                                          }`}
                                </p>
                            )}
                        </div>
                    ))}
            </ScrollArea>
            {quizQuestions.length > 0 && (
                <>
                    <Separator />
                    {!isSubmitted ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                Object.keys(selectedAnswers).length !==
                                quizQuestions.length
                            }
                            className="w-full"
                        >
                            Nộp bài
                        </Button>
                    ) : (
                        <div className="text-center">
                            <p className="mb-4">
                                Số câu trả lời đúng: {score} /{" "}
                                {quizQuestions.length}
                            </p>
                            <Button
                                className="w-full py-5 bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group"
                                size="sm"
                                onClick={handleGenQuiz}
                                disabled={loading}
                            >
                                <Sparkles className="size-4 mr-2" />
                                Làm bài mới
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
