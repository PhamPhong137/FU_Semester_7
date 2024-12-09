import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useCreateMindmap } from "@/stores/create-mindmap-store"
import { isValidUrl, isValidYouTubeUrl } from "@/utils"
import {
    ChevronLeft,
    Earth,
    FileText,
    WandSparkles,
    Youtube,
} from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const MAX_FILE_SIZE = 1024 * 1024 * 5

const Step2 = () => {
    const [prompt, setPrompt] = useState("")
    const { formData, nextStep, prevStep } = useCreateMindmap()
    const [documentType, setDocumentType] = useState("pdf")
    const [urlInput, setUrlInput] = useState<string>("")
    const [fileInput, setFileInput] = useState<File | null>(null)

    const handleFileSelected = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            if (files[0].size > MAX_FILE_SIZE) {
                toast.error(
                    "Tài liệu không được lớn hơn 5MB, vui lòng nâng cấp gói"
                )
                return
            }
            // check file type
            if (!files[0].type.includes("pdf")) {
                toast.error("Tài liệu phải là file PDF!")
                return
            }
            setFileInput(files[0])
        }
    }

    const handleNextStep = () => {
        switch (formData.get("type")) {
            case "summary":
                switch (documentType) {
                    case "pdf":
                        if (fileInput === null) {
                            toast.error("Vui lòng chọn tài liệu!")
                            return
                        }
                        formData.set("filePdf", fileInput)
                        formData.set("docType", "pdf")
                        break
                    case "web":
                        if (urlInput.trim() === "") {
                            toast.error("Vui lòng nhập đường dẫn!")
                            return
                        }
                        if (!isValidUrl(urlInput)) {
                            toast.error("Đường dẫn không hợp lệ!")
                            return
                        }
                        formData.set("docUrl", urlInput)
                        formData.set("docType", "web")
                        break
                    case "youtube":
                        if (urlInput.trim() === "") {
                            toast.error("Vui lòng nhập đường dẫn!")
                            return
                        }
                        if (!isValidYouTubeUrl(urlInput)) {
                            toast.error("Đường dẫn Youtube không hợp lệ!")
                            return
                        }
                        formData.set("docUrl", urlInput)
                        formData.set("docType", "youtube")
                        break
                }
                break
            case "creative":
                if (prompt.trim() === "") {
                    toast.error("Vui lòng nhập ý tưởng!")
                    return
                }
                formData.set("prompt", prompt)
                break
        }
        nextStep()
    }

    return (
        <div className="flex h-full items-center flex-col py-10">
            <h1 className="capitalize text-3xl font-bold mb-16">
                Cung cấp ý tưởng
            </h1>
            <div className="w-full flex flex-col items-center">
                {formData.get("type") === "creative" && (
                    <Textarea
                        className="w-full max-w-5xl h-40 mb-10"
                        placeholder="Hãy điền những ý tưởng ban đầu của bạn, chúng tôi sẽ biến nó thành sơ đồ tư duy thật đặc sắc!"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                )}
                {formData.get("type") === "summary" && (
                    <Tabs
                        defaultValue="pdf"
                        className="max-w-4xl w-full mb-10"
                        value={documentType}
                        onValueChange={(value) => setDocumentType(value)}
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pdf">
                                <FileText className="size-4 mr-2" />
                                Tài liệu
                            </TabsTrigger>
                            <TabsTrigger value="web">
                                <Earth className="size-4 mr-2" />
                                Trang web
                            </TabsTrigger>
                            <TabsTrigger value="youtube" disabled>
                                <Youtube className="size-4 mr-2" />
                                Youtube
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="pdf">
                            <Input
                                id="file"
                                type="file"
                                className="h-14"
                                onChange={handleFileSelected}
                                accept=".pdf"
                            />
                        </TabsContent>
                        <TabsContent value="web">
                            <Input
                                id="url"
                                placeholder="Đường dẫn website"
                                className="h-14"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                        </TabsContent>
                        <TabsContent value="youtube">
                            <Input
                                id="youtube"
                                placeholder="Đường dẫn video Youtube"
                                className="h-14"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                        </TabsContent>
                    </Tabs>
                )}
                <div className="flex gap-4">
                    <Button variant="outline" onClick={prevStep}>
                        <ChevronLeft className="size-4 mr-2" /> Quay lại
                    </Button>
                    <Button onClick={handleNextStep}>
                        Tạo sơ đồ <WandSparkles className="size-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Step2
