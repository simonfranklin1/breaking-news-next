import { VscLoading } from "react-icons/vsc";

const Loading = () => {
    return (
        <div className="text-2xl text-center flex items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-96px)]">
            <VscLoading className="animate-spin mx-auto" />
        </div>
    )
}

export default Loading