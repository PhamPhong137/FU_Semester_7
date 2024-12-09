import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "reactflow/dist/style.css"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { HomePage } from "./pages/(marketing)"
import { NotFoundPage } from "./pages/404"
import DashboardLayout from "./pages/dashboard/[orgId]/layout"
import MindmapPage from "./pages/dashboard/[orgId]"
import OrgSettingPage from "./pages/dashboard/[orgId]/org-settings"
import SubscriptionPage from "./pages/dashboard/[orgId]/subscription"
import MindmapEditorLayout from "./pages/editor/[mindmapId]/layout"
import MindmapEditorPage from "./pages/editor/[mindmapId]"
import CallbackPage from "./pages/(auth)/callback"
import { LoginPage } from "./pages/(auth)/login"
import NewMindmapPage from "./pages/dashboard/[orgId]/new-mindmap"
import { ProfileSettingPage } from "./pages/profile"
import UserManagement from "./pages/admin/user-management"
import { AdminLayout } from "./pages/admin/layout"
import { OrgManagement } from "./pages/admin/org-management"
import { MindmapManagement } from "./pages/admin/mindmap-management"
import CreateOrgPage from "./pages/(auth)/create-org"
import { TooltipProvider } from "@/components/ui/tooltip"
import DialogProvider from "@/context/dialog-context"
import SheetProvider from "@/context/sheet-context"
import { ReactFlowProvider } from "reactflow"

const queryClient = new QueryClient()

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "create-org",
                element: <CreateOrgPage />,
            },
            {
                path: "auth/callback",
                element: <CallbackPage />,
            },
            {
                path: "dashboard",
                element: <Outlet />,
                children: [
                    {
                        path: ":orgId",
                        element: <DashboardLayout />,
                        children: [
                            {
                                index: true,
                                element: <MindmapPage />,
                            },
                            {
                                path: "new",
                                element: <NewMindmapPage />,
                            },
                            {
                                path: "settings",
                                element: <OrgSettingPage />,
                            },
                            {
                                path: "subscription",
                                element: <SubscriptionPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "editor",
                element: <Outlet />,
                children: [
                    {
                        path: ":orgId/:mindmapId",
                        element: <MindmapEditorLayout />,
                        children: [
                            {
                                index: true,
                                element: <MindmapEditorPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/profile",
                element: <ProfileSettingPage />,
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "users",
                        element: <UserManagement />,
                    },
                    {
                        path: "orgs",
                        element: <OrgManagement />,
                    },
                    {
                        path: "mindmaps",
                        element: <MindmapManagement />,
                    },
                ],
            },
        ],
    },
])

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
            <TooltipProvider>
                <DialogProvider>
                    <SheetProvider>
                        <RouterProvider router={routers} />
                        <Toaster />
                    </SheetProvider>
                </DialogProvider>
            </TooltipProvider>
        </ReactFlowProvider>
    </QueryClientProvider>
    // </StrictMode>
)
