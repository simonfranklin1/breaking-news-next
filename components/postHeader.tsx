import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
import Link from "next/link";
import { NewsI, savedPost } from "@/types/types";
import moment from 'moment';
import "moment/locale/pt-br";

interface postHeaderProps {
    post: NewsI;
    saved: boolean;
    setSaved: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    user: {
        id: string;
        name: string;
        image: string;
        email: string;
        saved: savedPost[];
    };
    handleDelete: () => void;
    handleSavePost: () => Promise<void>;
}

const PostHeader = ({ openMenu, post, saved, setOpenMenu, setSaved, user, handleDelete, handleSavePost }: postHeaderProps) => {
    moment.locale("pt-br");
 
    return (
        <div className="flex flex-col">
            <div className="flex justify-between sm:gap-8 lg:gap-16">
                <div className="lg:text-3xl sm:text-2xl font-bold font-news mb-4 max-w-[70%] ">
                    {post.title}
                </div>
                <div className="flex justify-end items-start w-[30%]">

                    <button className="flex-center w-[2.5rem] h-[2.5rem] rounded-full text-xl duration-300 hover" onClick={handleSavePost}>
                        {
                            saved && (
                                <img src="https://cdn-icons-png.flaticon.com/512/5668/5668020.png" alt="remover post dos salvos" className="w-[20px] h-[20px] opacity-70" />
                            ) || (
                                <img src="https://cdn-icons-png.flaticon.com/512/5662/5662990.png" alt="salvar post" className="w-[20px] h-[20px] opacity-70" />
                            )
                        }
                    </button>

                    <button className={`flex-center w-[2.5rem] h-[2.5rem] rounded-full text-xl duration-300 hover ${String(user.id) === String(post.creator._id) ? "flex" : "hidden"}`} onClick={() => setOpenMenu(prev => !prev)}>
                        <div className="relative text-gray-700">
                            <span className="text-2xl">
                                <BsThreeDots />
                            </span>
                            <div className={`absolute bg-white overflow-hidden ${openMenu ? "flex opacity-100 dropdown" : "hidden opacity-0"} duration-[.4s] ease-in-out rounded-md items-start flex-col shadow-xl top-[25px] right-0 text-base`}>
                                <Link href={`/posts/${post._id}/edit`} className="w-full">
                                    <div className="flex-center gap-2 hover:bg-slate-200 duration-200 pb-2 pt-4 px-8 w-full">
                                        <FaRegEdit /> Editar
                                    </div>
                                </Link>
                                <div className="flex-center gap-2 hover:bg-slate-200 duration-200 pt-2 pb-4 px-8 w-full" onClick={handleDelete}>
                                    <FaRegTrashAlt /> Deletar
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:text-base">
                <div className="flex items-center gap-2">
                    <Link href={user.id === post.creator._id ? "/profile" : "/profile/" + post.creator._id} className="text-lg text-blue-400 hover:underline">
                        <img src={post.creator.avatar} alt="creator" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
                    </Link>
                    <div className="text-gray-600">
                        {post.creator.name} <span className="inline-block"><TbPointFilled /></span> {moment(post.createdAt).fromNow()}
                    </div>
                </div>
                <Link href={"/posts/category/" + post.category} className="text-blue-700 font-medium capitalize">
                    {post.category}
                </Link>
            </div>
        </div>
    )
}

export default PostHeader