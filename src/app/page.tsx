import VerticalFeed from "@/features/feed/vertical-feed";

export default function Home() {
  return (
    <main className="w-full h-full min-h-svh overflow-hidden flex items-center">
      <VerticalFeed />
    </main>
  );
}
