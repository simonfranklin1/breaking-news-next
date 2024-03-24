import { FcIdea, FcReading, FcClapperboard, FcAddressBook } from "react-icons/fc";

const Welcome = () => {
    return (
        <section className="w-full bg-slate-100 py-12 px-4 flex flex-col rounded-xl gap-5">
            <div className="sm:text-xl font-semibold text-center opacity-50">
                SEJA BEM VINDO AO BREAKING NEWS
            </div>

            <p className="lg:text-3xl sm:text-2xl text-center font-medium">
                Crie narrativas <i className="inline-block"><FcAddressBook /></i> que ascendam a <span className="text-blue-700">inspiração</span> <i className="inline-block"><FcIdea /></i>, <br /> <span className="text-blue-700">conhecimento</span> <i className="inline-block"><FcReading /></i>, e <span className="text-blue-700">entretenimento</span> <i className="inline-block"><FcClapperboard /></i>
            </p>
        </section>
    )
}

export default Welcome