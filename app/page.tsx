import DynamicComponent from "@/components/layout/DynamicComponent";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="md:px-40 px-5">
        <DynamicComponent />
      </div>
    </div>
  );
}