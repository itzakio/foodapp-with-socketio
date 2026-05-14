"use client";
import FoodPage from "@/components/home/FoodPage";
import { useSocket } from "../hooks/useSocket";
import Navbar from "@/components/layout/Navbar";
export default function Home() {
  const { socket, connected } = useSocket();
  return (
    <div>
      <Navbar/>
      <FoodPage />{" "}
    </div>
  );
}
