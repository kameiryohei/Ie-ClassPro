import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linden_Hill } from "next/font/google";
import Link from "next/link";
import CardList from "./components/CardList";

export default function Home() {
  return (
    <main className="px-10 py-3">
      <div className="text-3xl">
        <h2>page1</h2>
      </div>
      <CardList />
    </main>
  );
}
