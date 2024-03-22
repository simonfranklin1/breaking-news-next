import { LatestNews, TopNews, Welcome } from "@/components";
import SportsNews from "@/components/SportsNews";
import TopCreators from "@/components/TopCreators";

export default function Home() {

  return (
    <>
      <div className="flex flex-col gap-12">
        <Welcome />
        <TopNews />
        <LatestNews />
        <SportsNews />
        <TopCreators />
      </div>
    </>
  );
}
