import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';
import { Book } from '@/src/types/book';
import { RESERVE_BOOK } from '@/src/utils/graphql/mutations/book';
import { ApolloQueryResult, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useToast } from '@/src/hooks/use-toast';

const Index = ({
  book,
  refetch,
}: {
  book: Book;
  refetch: () => Promise<ApolloQueryResult<Book>>;
}) => {
  const { toast } = useToast();

  const [reserveBook] = useMutation(RESERVE_BOOK);
  const { data: session } = useSession();

  const handleReserveBook = async () => {
    const bookId = book.id;
    const userId = session?.user.id;

    try {
      const response = await reserveBook({
        variables: { userId, bookId },
      });

      toast({
        title: response.data.reserveBook,
      });

      await refetch();
    } catch (error) {
      toast({
        title: 'Hubo un error al realizar la reserva. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className='w-max'>
      <CardHeader className='p-2'>
        <Image
          src={book?.image}
          width={200}
          height={500}
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

        <Button className='mt-4 w-full' onClick={handleReserveBook}>
          Reservar Libro
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;
