import Image from "next/image";
import CardList from "./components/CardList";

export default function Home() {
  return (
    <main className="px-10 py-3">
      <h2 className="text-2xl">タイトル</h2>

      <CardList />
    </main>
  );
}
