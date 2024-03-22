import { FaFacebook, FaLinkedinIn, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Button } from ".";
import { MdOutlineUnsubscribe } from "react-icons/md";

const Footer = () => {
    return (
        <section className='w-full max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-0 flex flex-col gap-12 py-12'>
            <div className="w-full bg-slate-100 py-12 flex flex-wrap gap-4 items-center justify-between rounded-xl px-7">
                <div className="sm:max-w-[40%]">
                    <div className="sm:text-xl font-semibold opacity-50 mb-5">
                        RECEBA AS NOTÍCIAS EM PRIMEIRA MÃO
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="lg:text-3xl sm:text-2xl font-medium">
                            Receba as notícias em primeira mão se <span className="text-blue-700">inscrevendo <MdOutlineUnsubscribe className="inline-block" /></span> no nosso site
                        </p>
                    </div>
                </div>

                <div className="flex-center gap-3">
                    <input type="email" placeholder="Seu email" className="px-2 py-2 border-2 rounded-md" />
                    <Button text={"Inscrever"} />
                </div>
            </div>
            <div className="flex w-full justify-between flex-wrap gap-6">
                <div className='flex flex-col justify-between flex-1'>
                    <div>
                        <div className="text-2xl text-blue-700 font-news font-semibold mb-4">
                            Breaking News
                        </div>
                        <div className="text-lg opacity-85">
                            Crie narrativas que ascendam a inspiração, conhecimento e entretenimento.
                        </div>
                        <div className="mt-7 mb-5 flex items-center gap-2 justify-start text-blue-700 text-lg">
                            <div className="shadow-xl p-3 rounded-full">
                                <FaFacebook />
                            </div>
                            <div className="shadow-xl p-3 rounded-full">
                                <FaLinkedinIn />
                            </div>
                            <div className="shadow-xl p-3 rounded-full">
                                <FaTwitter />
                            </div>
                            <div className="shadow-xl p-3 rounded-full">
                                <FaInstagramSquare />
                            </div>
                        </div>
                    </div>
                    <div className="opacity-85">
                        Copyright &copy; 2024 Breaking News.
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-col flex gap-3 text-gray-600">
                        <div className="text-xl font-semibold text-black">
                            Tecnologia
                        </div>
                        <div>iPhone</div>
                        <div>Samsung</div>
                        <div>Notebook</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-col flex gap-3 text-gray-600">
                        <div className="text-xl font-semibold text-black">
                            Esporte
                        </div>
                        <div>Futebol</div>
                        <div>vôlei</div>
                        <div>Tênis</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-col flex gap-3 text-gray-600">
                        <div className="text-xl font-semibold text-black">
                            Animes
                        </div>
                        <div>Dragon Ball</div>
                        <div>One Piece</div>
                        <div>Naruto</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-col flex gap-3 text-gray-600">
                        <div className="text-xl font-semibold text-black">
                            Viagens
                        </div>
                        <div>Angra dos Reis</div>
                        <div>Fernando de Noronha</div>
                        <div>Caldas Novas</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer