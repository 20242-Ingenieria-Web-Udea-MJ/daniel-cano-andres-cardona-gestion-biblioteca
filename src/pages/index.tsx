import { PrismaClient } from "@prisma/client";
import safeJsonStringify from "safe-json-stringify";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: {
      users: safeJsonStringify(users),
    },
  };
}

export default function Home({ users }: any) {
  const { data: session } = useSession();
  if (!session) {
    signIn("auth0");
  }
  console.log("session", session, users);
  // const getProducts = async () => {
  //   await axios.get("https://fakestoreapi.com/products").then((res: any) => {
  //     console.log("res", res);
  //   });
  // };
  // getProducts();

  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    ></div>
  );
}
