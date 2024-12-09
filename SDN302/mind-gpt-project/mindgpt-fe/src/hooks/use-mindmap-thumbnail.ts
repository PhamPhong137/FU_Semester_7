import { getNodesBounds, getViewportForBounds, useReactFlow } from "reactflow"
import { toPng } from "html-to-image"

interface ThumbnailOptions {
    width?: number
    height?: number
    backgroundColor?: string
}

const THUMBNAIL_WIDTH = 640
const THUMBNAIL_HEIGHT = 360
const THUMBNAIL_BACKGROUND_COLOR = "#f5f5f5"

const useMindmapThumbnail = ({
    width = THUMBNAIL_WIDTH,
    height = THUMBNAIL_HEIGHT,
    backgroundColor = THUMBNAIL_BACKGROUND_COLOR,
}: ThumbnailOptions = {}) => {
    const { getNodes } = useReactFlow()

    const getThumbnail = ({
        tWidth = width,
        tHeight = height,
        tBackgroundColor = backgroundColor,
    } = {}) => {
        const nodesBounds = getNodesBounds(getNodes())
        const { x, y, zoom } = getViewportForBounds(
            nodesBounds,
            tWidth,
            tHeight,
            0.5,
            2
        )

        return toPng(
            document.querySelector(".react-flow__viewport") as HTMLElement,
            {
                backgroundColor: tBackgroundColor,
                width: tWidth,
                height: tHeight,
                style: {
                    width: `${tWidth}px`,
                    height: `${tHeight}px`,
                    transform: `translate(${x}px, ${y}px) scale(${zoom})`,
                },
            }
        )
    }

    return getThumbnail
}

export default useMindmapThumbnail
