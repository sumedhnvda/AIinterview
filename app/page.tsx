import AssistantButton from "@/components/AssistantButton";
import Camera from "@/components/Camera";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <Camera />
      <div className="absolute bottom-0 right-0 pb-10 pr-10">
          <AssistantButton />
        </div>
        </main>
    </div>
  );
}
