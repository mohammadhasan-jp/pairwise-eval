import Image from "next/image";
import Header from "./Header/Header";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  pb-20 gap-16 sm:p-20">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold mb-6">صفحه اصلی</h1>
          <Link
            href="/add-employees"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            {
              redirect("/add-employees")  
            }
            شروع
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
