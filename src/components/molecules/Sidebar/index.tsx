import React from "react";
import Link from "next/link";
import { Home, Package, ChartLine, Users, Book } from "lucide-react";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";

// import { useSession } from "next-auth/react";

const Index = () => {
  // const { data: session } = useSession();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6" />
            <span className="">Nombre Biblioteca</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2  text-primary transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Inicio
            </Link>
            <Link
              href="/inventory"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Inventario
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ChartLine className="h-4 w-4" />
              Transacciones
            </Link>
            <Link
              href="/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Usuarios
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4 flex flex-row gap-5 justify-center items-center">
              <Avatar>
                <AvatarImage src={session?.user?.image} alt="@shadcn" />
                <AvatarImage src="https://picsum.photos/200" alt="@shadcn" />
              </Avatar>
              <div className="flex flex-col items-center justify-center">
                <CardTitle>{session?.user?.name}Daniel</CardTitle>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  {session?.user?.role}
                  Admin
                </CardContent>
              </div>
            </CardHeader>
          </Card> */}
          <div className="flex items-center gap-4">
            <Avatar>
              {/* <AvatarImage src={session?.user?.image} alt="@shadcn" /> */}
              <AvatarImage src="https://picsum.photos/200" alt="@shadcn" />
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-bold">
                {/* {session?.user?.name} */}
                Daniel
              </h3>
              <p>
                {/* {session?.user?.role} */}
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
