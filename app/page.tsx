import Image from "next/image";
import Footer from "@/components/Footer";
import { FileText, PlayCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/maskable_icon_x192.png"
          alt="ArgoNext Logo"
          width={192}
          height={192}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold">ArgoNext</h1>
        <p className="text-xl">
          A modern fullstack web application built with Next.js 15, React 19,
          and SQLite.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Frontend Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js 15 with SSR</li>
              <li>React 19 + TypeScript</li>
              <li>Tailwind CSS styling</li>
              <li>Recharts visualization</li>
              <li>Modern UI components</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Backend Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>SQLite with Knex</li>
              <li>JWT Authentication</li>
              <li>File uploads with Multer</li>
              <li>API Routes</li>
              <li>Secure data handling</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/arghoritma/argonext"
          >
            <FileText size={20} />
            View on GitHub
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/dashboard"
          >
            <PlayCircle size={20} />
            Try Demo
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
