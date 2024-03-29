import { Welcome, Feed } from "@/components";

export default function Home() {

  return (
    <>
      <div className="flex flex-col gap-12">
        <Welcome />
        <Feed />  
      </div>
    </>
  );
}
