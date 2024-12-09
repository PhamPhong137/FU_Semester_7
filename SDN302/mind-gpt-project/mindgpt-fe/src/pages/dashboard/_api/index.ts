import { MindmapResponse } from "@/types"
import { instance } from "@/utils/axios"

export const getMindmaps = async (
    orgId: string,
    limit: string,
    page: string,
    keyword: string
) => {
    const { data } = await instance.get<{
        status: number
        message: string
        data: {
            mindmaps: MindmapResponse[]
            total: number
        }
    }>(`/mindmap/${orgId}`, {
        params: {
            limit,
            page,
            keyword,
        },
    })
    return data
}

export const deleteMindmap = async (ordId: string, mindmapId: string) => {
    await instance.delete<boolean>(`/mindmap/${ordId}/${mindmapId}`)
}
