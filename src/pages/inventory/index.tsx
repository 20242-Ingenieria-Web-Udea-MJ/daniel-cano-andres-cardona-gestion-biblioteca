import { PrismaClient } from '@prisma/client';
import safeJsonStringify from 'safe-json-stringify';

import Book from '@/src/components/molecules/Book';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../../utils/graphql/queries/books';
import { Book as BookType } from '@/src/types/book';
import { Button } from '@/src/components/ui/button';

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
  const [books, setBooks] = useState([]);

  const { refetch } = useQuery(GET_ALL_BOOKS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setBooks(data.books);
    },
  });

  return (
    <div className='grid w-full'>
      <div className='flex flex-row text-center gap-10'>
        <h1 className='text-3xl font-semibold mb-6'>Inventario</h1>
        <Button className='bg-lime-600 hover:bg-lime-400' onClick={() => (window.location.href = '/creation')}>+</Button>
        <Button className='bg-red-600 hover:bg-red-400' onClick={() => (window.location.href = '/users')}>-</Button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {books.map((book: BookType) => (
          <div key={book.id} className='max-w-[300px]'>
            <Book book={book} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
}
