import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
    return (
        <Card className="flex flex-col h-80 overflow-hidden pt-0">
            <CardHeader className="aspect-video flex items-center justify-center p-0">
                <Skeleton className="size-full aspect-video rounded-none" />
            </CardHeader>
            <CardContent className="flex-grow flex-col py-3 px-4">
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-full h-3 mt-2" />
                <Skeleton className="w-1/2 h-3 mt-2" />
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4">
                <Skeleton className="grow mr-2 h-8" />
                <Skeleton className="size-8" />
            </CardFooter>
        </Card>
    )
}

export default CardSkeleton
