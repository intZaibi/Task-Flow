'use client'
import dynamic from "next/dynamic";
import ToDoInput from "./ToDoInput";
const Board = dynamic(() => import("@/components/layout/Board"), { ssr: false });

export default function DynamicComponent() {
  return (
    <div>
      <ToDoInput/>
      <Board/>
    </div>
  )
}