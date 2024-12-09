export interface OrganizationUserResponse {
    id: string
    name: string
    image?: string
    metadata?: string
    created_at: string
    subscription: "free" | "plus" | "pro"
    is_owner: boolean
}
export interface UserResponse {
    id: number
    created_at: string
    email: string
    name: string
    given_name: string
    family_name: string
    picture: string
    locale?: string
    metadata?: string
    organizations: OrganizationUserResponse[]
}

export interface GetOrgRequestParams {
    orgId: string
}

export interface CreateOrgRequest {
    name: string
}

export interface UpdateOrgRequest {
    name: string
}

export interface AddUserToOrgRequest {
    usersEmail: string[]
}

export interface RemoveUserFromOrgRequest {
    usersEmail: string[]
}

export interface TransferOwnershipRequest {
    newOwnerEmail: string
}

export interface UserOrganizationResponse {
    id: number
    name: string
    email: string
    locale?: string
    picture?: string
    metadata?: string
    created_at: string
    given_name: string
    family_name: string
    is_owner: boolean
}

export interface OrgResponse {
    id: string
    created_at: string
    name: string
    image?: string
    metadata?: string
    subscription: "free" | "plus" | "pro"
    users: UserOrganizationResponse[]
}

export interface NodeResponse {
    id: string
    label: string
    level: number
    pos: {
        x: number
        y: number
    }
    text_color: string
    bg_color: string
    size: {
        width: number
        height: number
    }
    note: string
}

export interface EdgeResponse {
    id: string
    from: string
    to: string
    name: string
}

export interface MindmapMessage {
    role: "user" | "ai"
    content: string
}

export interface MindmapResponse {
    _id: string
    title: string
    thumbnail: string
    prompt: string
    document: {
        type: "pdf" | "web" | "youtube"
        url: string
    }
    documentsId: string[]
    type: "creative" | "summary"
    nodes: NodeResponse[]
    edges: EdgeResponse[]
    orgId: string
    conversation: MindmapMessage[]
    note: string
}

export interface QuizResponse {
    question: string
    answers: {
        answer: string
        isCorrect: boolean
    }[]
}
