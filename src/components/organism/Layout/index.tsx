import Sidebar from "@/src/components/molecules/Sidebar";
import Navbar from "@/src/components/molecules/Navbar";
// import { useSession, signIn } from "next-auth/react";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

import { ReactNode } from "react";

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  // const { data: session, status } = useSession();
  // if (status === "loading") return <div>Loading...</div>;
  // if (!session) {
  //   signIn("auth0");
  // }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
