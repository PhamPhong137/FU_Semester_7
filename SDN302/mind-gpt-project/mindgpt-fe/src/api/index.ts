import { getAuth } from "@/stores/auth-store"
import { getCurrentOrg } from "@/stores/org-store"
import {
    AddUserToOrgRequest,
    MindmapResponse,
    OrgResponse,
    RemoveUserFromOrgRequest,
    TransferOwnershipRequest,
    UpdateOrgRequest,
    UserResponse,
} from "@/types"
import { authInstance, instance } from "@/utils/axios"

enum UserAPI {
    LOGIN = "/login",
    VERIFY = "/verify",
}

enum OrgAPI {
    ORG = "/org",
    ADD_USERS = "/add",
    REMOVE_USERS = "/remove",
    LEAVE = "/leave",
    TRANSFER = "/transfer",
}

enum MindmapAPI {
    MINDMAP = "/mindmap",
}

export const getUser = async (token: string) => {
    if (!token || token.trim() === "") return null
    const { data } = await authInstance.get<UserResponse>(
        `${UserAPI.VERIFY}/${token}`
    )

    return data
}

export const getOrg = async (id: string) => {
    if (!id || id.trim() === "") return null
    const { data } = await authInstance.get<OrgResponse>(`${OrgAPI.ORG}/${id}`)

    return data
}

export const updateOrg = async (request: UpdateOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()
    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}`,
        request
    )

    return data
}

export const addUsersToOrg = async (request: AddUserToOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.ADD_USERS}`,
        request
    )

    return data
}

export const removeUsersFromOrg = async (request: RemoveUserFromOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.REMOVE_USERS}`,
        request
    )

    return data
}

export const transferOwnership = async (request: TransferOwnershipRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.TRANSFER}`,
        request
    )

    return data
}

export const leaveOrg = async () => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.delete<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.LEAVE}`
    )

    return data
}

export const deleteOrg = async () => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.delete<OrgResponse>(
        `${OrgAPI.ORG}/${id}`
    )

    return data
}

export const getMindmap = async (orgId: string, mindmapId: string) => {
    const { data } = await instance.get<{
        status: number
        message: string
        data: MindmapResponse
    }>(`${MindmapAPI.MINDMAP}/${orgId}/${mindmapId}`)
    return data?.data
}
