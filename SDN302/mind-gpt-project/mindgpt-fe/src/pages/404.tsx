"use client"

import { Button } from "@/components/ui/button"
import { Cover } from "@/components/ui/cover"
import { ArrowLeft, Brain, Network } from "lucide-react"
import { Link } from "react-router-dom"

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 text-center">
            <div className="relative mb-8">
                <Network className="w-32 h-32 text-primary animate-pulse" />
                <Brain className="w-16 h-16 text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-2xl font-semibold mb-2">
                Ôi không! Trang này đã bị lạc trong <Cover>vũ trụ tư duy</Cover>
                .
            </p>
            <p className="text-lg mb-8 max-w-md">
                Có vẻ như AI của chúng tôi đã tạo ra một nhánh tư duy quá sáng
                tạo và không thể tìm thấy trang bạn đang tìm kiếm.
            </p>
            <Button asChild className="gap-2">
                <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại trang chủ
                </Link>
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
                Hãy thử tạo một bản đồ tư duy mới - có thể bạn sẽ khám phá ra
                điều gì đó thú vị!
            </p>
        </div>
    )
}
