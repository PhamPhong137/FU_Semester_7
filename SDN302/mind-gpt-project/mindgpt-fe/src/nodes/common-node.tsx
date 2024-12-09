import { NodeProps } from "reactflow"
import BaseNode, { BaseNodeData } from "./base-node"

export interface CommonNodeData extends BaseNodeData {
    width?: number
    height?: number
}

export const CommonNode = ({ data, selected }: NodeProps<CommonNodeData>) => {
    return (
        <BaseNode
            label={data.label}
            selected={selected}
            note={data.note}
            className="rounded-md"
            textColor={data.textColor}
            level={data.level}
            style={{
                width: data.width,
                height: data.height,
                backgroundColor: data.bgColor,
            }}
        />
    )
}
