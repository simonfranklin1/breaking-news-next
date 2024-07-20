import { VscLoading } from "react-icons/vsc";

const Loading = () => {
    return (
        <div className="text-2xl text-center flex items-center min-h-[60vh] lg:min-h-[50vh]">
            <VscLoading className="animate-spin mx-auto" />
        </div>
    )
}

export default Loading