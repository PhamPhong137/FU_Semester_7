import { useEffect } from "react"

const useRemoveLogo = () => {
    useEffect(() => {
        const logo: HTMLDivElement | null = document.querySelector(
            ".react-flow__panel.react-flow__attribution.bottom.right"
        )
        if (logo) {
            logo.innerHTML = `<a class="react-flow__attribution" href="www.mind-gpt.online" target="_blank">MindGPT</a>`
        }
    }, [])
}

export default useRemoveLogo
