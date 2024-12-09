import React, { useMemo } from "react"
import {
    Pencil,
    Trash2,
    Brain,
    Target,
    LayoutGrid,
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useMindmaps } from "../_api/hooks"
import { useQueryParams } from "@/hooks"
import MindmapCard from "../_compoments/mindmap-card"
import CardSkeleton from "../_compoments/card-skeleton"

const PAGE_SIZE = "10"

export default function MindmapPage() {
    const { orgId } = useParams()
    const { page, keyword } = useQueryParams()
    const { data, isLoading } = useMindmaps(
        orgId,
        PAGE_SIZE,
        page || "1",
        keyword
    )
    const totalPage = useMemo(() => {
        if (data?.data.total) {
            return Math.ceil(data.data.total / parseInt(PAGE_SIZE))
        }
        return 0
    }, [data?.data.total])

    const validPage = useMemo(() => {
        if (parseInt(page) < 1) {
            return 1
        }
        if (parseInt(page) > totalPage) {
            return totalPage
        }
        if (!parseInt(page)) {
            return 1
        }
        return parseInt(page)
    }, [page])

    const [, setSearchParams] = useSearchParams()

    const handleChangePage = (dir: "next" | "prev") => {
        if (dir === "next") {
            setSearchParams({ page: (validPage + 1).toString() })
        } else {
            setSearchParams({ page: (validPage - 1).toString() })
        }
    }

    return (
        <>
            <h1 className="section-title">Sơ đồ tư duy</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 min-h-[656px] gap-4">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                          <CardSkeleton key={index} />
                      ))
                    : data?.data?.mindmaps.map((mindmap) => (
                          <MindmapCard mindmap={mindmap} key={mindmap._id} />
                      ))}
            </div>
            {totalPage > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button
                        disabled={validPage <= 1}
                        onClick={() => handleChangePage("prev")}
                        variant="outline"
                    >
                        <ChevronLeft className="size-4 mr-2" />
                        Trang trước
                    </Button>
                    <Button
                        disabled={validPage >= totalPage}
                        onClick={() => handleChangePage("next")}
                        variant="outline"
                    >
                        Trang sau
                        <ChevronRight className="size-4 ml-2" />
                    </Button>
                </div>
            )}
        </>
    )
}
