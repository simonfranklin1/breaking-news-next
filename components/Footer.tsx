import { FaFacebook, FaLinkedinIn, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Button } from ".";
import { MdOutlineUnsubscribe } from "react-icons/md";

const Footer = () => {
    return (
        <section className='w-full max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-0 flex flex-col gap-12 py-12'>
            <div className="w-full bg-slate-100 py-12 flex flex-col sm:flex-row gap-4 items-center justify-between rounded-xl px-7">
                <div className="sm:max-w-[50%]">
                    <div className="sm:text-xl font-semibold opacity-50 mb-5">
                        RECEBA AS NOTÍCIAS EM PRIMEIRA MÃO
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <p className="lg:text-3xl sm:text-2xl font-medium">
                            Receba as notícias em primeira mão se <span className="text-blue-700">inscrevendo <MdOutlineUnsubscribe className="inline-block" /></span> no nosso site
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 sm:w-[50%]">
                    <input type="email" placeholder="Seu email" className="px-2 py-2 border-2 rounded-md" />
                    <Button text={"Inscrever"} />
                </div>
            </div>
            <div className="flex w-full justify-between gap-6 flex-wrap">
                <div className='flex flex-col justify-between flex-1 gap-12'>
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
                <div className="flex-4 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-4 gap-x-8 gap-y-12">
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Tecnologia
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">iPhone</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Samsung</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Notebook</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Esporte
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Futebol</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Basquete</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Tênis</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Animes
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Dragon Ball</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">One Piece</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Naruto</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Viagens
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Destinos</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Vídeos</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Novidades</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Entretenimento
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Filmes</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Arte</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Televisão</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Clima
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Temperatura</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Previsão</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Terremoto</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Cultura
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Culinária</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">História</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Costumes</a>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex-col flex gap-3 text-gray-600">
                            <div className="lg:text-xl text-lg font-semibold text-black">
                                Mais
                            </div>
                            <a href="#" target="_blank" className="hover:text-blue-700">Design</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Investimento</a>
                            <a href="#" target="_blank" className="hover:text-blue-700">Nos apoie</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer