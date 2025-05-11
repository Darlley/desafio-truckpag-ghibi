import VerticalFeed from "@/features/feed/vertical-feed";

export default function Home() {
  return (
    <div className="min-h-svh bg-black text-white overflow-hidden">
      <main className="flex flex-col">
        {/* <section className="w-full">
          <FavoritesCarousel />
        </section> */}

        <section className="w-full">
          <VerticalFeed />
        </section>
      </main>
    </div>
  );
}
