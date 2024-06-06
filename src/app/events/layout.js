import Navbar from "@/components/Navbar";

export default function EventLayout({ children }) {
  return (
    <div className="flex gap-5 h-[calc(100vh-40px)] w-full">
      <Navbar/>
      {children}
    </div>
  );
}
