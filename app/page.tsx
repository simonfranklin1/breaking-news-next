import { Welcome, Feed } from "@/components";
import TopCreators from "@/components/TopCreators";

export default function Home() {

  return (
    <>
      <div className="flex flex-col gap-12">
        <Welcome />
        <Feed />
        <TopCreators />  
      </div>
    </>
  );
}
