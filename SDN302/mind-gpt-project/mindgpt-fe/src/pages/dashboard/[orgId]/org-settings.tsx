import { useState } from "react"
import GeneralOrgSettings from "../_compoments/general-settings"
import MemberSettings from "../_compoments/member-settings"

const OrgSettingsPage = () => {
    return (
        <>
            <h1 className="section-title mb-6">Nhóm</h1>
            <div className="flex justify-center w-full gap-8">
                <GeneralOrgSettings />
                <MemberSettings />
            </div>
        </>
    )
}

export default OrgSettingsPage
