import { PrismaClient } from '@prisma/client';
import safeJsonStringify from 'safe-json-stringify';

import Books from '@/src/components/organism/Books';

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: {
      users: safeJsonStringify(users),
    },
  };
}

export default function Inventory() {
  return (
    <div className='grid w-full'>
      <h1 className='text-3xl font-semibold mb-6'>Inventario</h1>
      <Books />
    </div>
  );
}
