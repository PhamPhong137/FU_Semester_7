import { OrgResponse } from "@/types"
import { authInstance } from "@/utils/axios"

enum OrganizationAPI {
    CREATE = "/org",
}

export const createOrg = async (name: string) => {
    const { data } = await authInstance.post<OrgResponse>(
        OrganizationAPI.CREATE,
        { name }
        // {
        //     headers: {
        //         Authorization: `Bearer ${getAut().token}`,
        //     },
        // }
    )

    return data
}
