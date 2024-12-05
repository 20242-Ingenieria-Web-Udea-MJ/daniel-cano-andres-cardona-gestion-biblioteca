import { Badge } from '@/src/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { useMutation, useQuery } from '@apollo/client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Edit, Trash } from 'lucide-react';

import { useToast } from '@/src/hooks/use-toast';
import { GET_ALL_BOOKS } from '@/src/utils/graphql/queries/books';
import { Book } from '@/src/types/book';
import { DELETE_BOOK } from '@/src/utils/graphql/mutations/book';
import PrivateComponent from '@/src/components/organism/Private';

export default function Component() {
  const [books, setBooks] = useState([]);

  useQuery(GET_ALL_BOOKS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setBooks(data.books);
    },
  });

  const [deleteBook] = useMutation(DELETE_BOOK);

  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteBook({ variables: { id } });

      setBooks((prevBooks) => prevBooks.filter((book: Book) => book.id !== id));

      console.log(data);

      toast({
        title: 'El libro se ha eliminado correctamente.',
      });
    } catch (error) {
      toast({
        title: `Error al eliminar el libro. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader className='px-7 flex flex-row justify-between items-center'>
        <div>
          <CardTitle>Libros</CardTitle>
        </div>
        <PrivateComponent allowedRoles={['ADMIN']}>
          <Link href={`/inventory/new`}>
            <Button>+ Agregar Libro</Button>
          </Link>
        </PrivateComponent>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Imagen</TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Título
              </TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Autor
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Género
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Copias Disponibles
              </TableHead>
              <PrivateComponent allowedRoles={['ADMIN']}>
                <TableHead className='text-center'>Acciones</TableHead>
              </PrivateComponent>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book: Book) => (
              <TableRow key={book.id} className='bg-accent h-16'>
                <TableCell className='flex justify-center p-1 h-16'>
                  <Avatar className='block rounded-none h-full'>
                    <AvatarImage
                      src={book.image}
                      alt='@shadcn'
                      className='h-full'
                    />
                  </Avatar>
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  <div className='font-medium'>{book.title}</div>
                </TableCell>
                <TableCell className='hidden md:table-cell text-center'>
                  {book.author}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  {book.genre}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  {book.copies_available}
                </TableCell>
                <PrivateComponent allowedRoles={['ADMIN']}>
                  <TableCell className='text-center'>
                    <Link href={`/inventory/${book.id}`}>
                      <Badge className='text-xs' variant='default'>
                        <Edit />
                      </Badge>
                    </Link>
                    <Badge
                      className='text-xs cursor-pointer ml-2'
                      variant='destructive'
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash />
                    </Badge>
                  </TableCell>
                </PrivateComponent>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
