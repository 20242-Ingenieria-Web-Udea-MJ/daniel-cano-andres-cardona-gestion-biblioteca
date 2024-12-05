import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Image from 'next/image';

import { Book } from '@/src/types/book';

import { ApolloQueryResult } from '@apollo/client';

import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/src/components/ui/badge';

const Index = ({
  book,
}: {
  book: Book;
  refetch: () => Promise<ApolloQueryResult<Book>>;
}) => {
  return (
    <Card className='w-full h-[300px] flex flex-col justify-center items-centerrounded-lg'>
      <CardHeader className='p-2 h-32 overflow-hidden'>
        <Image
          src={book?.image}
          width={200}
          height={100}
          alt='Portada del libro'
          className='rounded-lg'
        />
        <CardTitle className='text-lg text-center'>{book?.title}</CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <p>
          <span className='font-semibold'>Autor: </span>
          {book?.author}
        </p>
        <p>
          <span className='font-semibold'>Género: </span>
          {book?.genre}
        </p>
        <p>
          <span className='font-semibold'>Copias disponibles: </span>{' '}
          {book?.copies_available}
        </p>

        <div className='mt-2 flex justify-center'>
          <Link href={`/inventory/${book?.id}`}>
            <Badge className='text-xs' variant='default'>
              <Edit />
            </Badge>
          </Link>
          <Badge
            className='text-xs cursor-pointer ml-2'
            variant='destructive'
            onClick={() => {}}
          >
            <Trash />
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
