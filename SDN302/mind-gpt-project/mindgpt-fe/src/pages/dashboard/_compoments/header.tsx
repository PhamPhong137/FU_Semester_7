import React, { useState } from "react"
import { Search, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import OrgSwitcher from "./org-switcher"
import UserAvatarMenu from "./user-avatar-menu"
import { useSearchParams } from "react-router-dom"

export default function Header() {
    const [keyword, setKeyword] = useState("")
    const [, setSearchParams] = useSearchParams()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!keyword || keyword.trim() === "") {
            setSearchParams({})
        }
        setSearchParams({
            keyword: keyword.trim(),
        })
    }
    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="flex gap-4 grow">
                <div className="hidden md:flex items-center">
                    <Package2 className="h-6 w-6 text-primary mr-2" />
                    <OrgSwitcher />
                </div>
                <div className="flex-1 max-w-2xl">
                    <form
                        className="flex items-center gap-2"
                        onSubmit={handleSearch}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Tìm kiếm sơ đồ"
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <span>Tìm kiếm</span>
                        </Button>
                    </form>
                </div>
            </div>

            <UserAvatarMenu />
        </header>
    )
}
