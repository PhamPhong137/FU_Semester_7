"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, Camera, Lock, Mail, User } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useCurrentOrg } from "@/stores/org-store"

export function ProfileSettingPage() {
    const { currentOrg } = useCurrentOrg()

    const [name, setName] = useState("John Doe")
    const [email, setEmail] = useState("john@example.com")
    const [bio, setBio] = useState(
        "I'm a software developer passionate about creating amazing SaaS products."
    )
    const [avatarUrl, setAvatarUrl] = useState(
        "/placeholder.svg?height=100&width=100"
    )

    const handleSave = () => {
        toast({
            title: "Settings saved",
            description:
                "Your profile settings have been updated successfully.",
        })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Button className="mb-4" asChild variant="outline">
                <Link to={`/dashboard/${currentOrg}`}>
                    <ArrowLeft className="size-4 mr-2" />
                    Dashboard
                </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-3">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and profile picture
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={avatarUrl} alt={name} />
                                <AvatarFallback>
                                    {name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <Label
                                    htmlFor="avatar-upload"
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                                        <Camera className="w-4 h-4" />
                                        Change profile picture
                                    </div>
                                </Label>
                                <Input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about yourself"
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                            Manage your email and push notification settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications">
                                    Email Notifications
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive email notifications about account
                                    activity
                                </p>
                            </div>
                            <Switch id="email-notifications" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="marketing-emails">
                                    Marketing Emails
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new features and offers
                                </p>
                            </div>
                            <Switch id="marketing-emails" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-notifications">
                                    Push Notifications
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive push notifications on your devices
                                </p>
                            </div>
                            <Switch id="push-notifications" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Manage your account security settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">
                                Current Password
                            </Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                                Confirm New Password
                            </Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="w-full" variant="outline">
                            Change Password
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} size="lg" asChild>
                    <Link to="/dashboard/abc">Save Changes</Link>
                </Button>
            </div>
        </div>
    )
}
