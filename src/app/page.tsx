import VerticalFeed from "@/components/vertical-feed";

export default function Home() {
  return (
    <div className="min-h-svh bg-black text-white overflow-hidden">
      <main className="w-full flex flex-col">
        <VerticalFeed />
      </main>
    </div>
  );
}
