import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';

import { useMutation, useQuery } from '@apollo/client';

import { useState } from 'react';

import { GET_ALL_RESERVATIONS } from '@/src/utils/graphql/queries/reservation';
import { Reservation } from '@/src/types/reservation';
import { MARK_AS_RETURNED } from '@/src/utils/graphql/mutations/book';

export default function Component() {
  const [reservations, setReservations] = useState([]);

  useQuery(GET_ALL_RESERVATIONS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setReservations(data.reservations);
    },
  });

  const [markAsReturned] = useMutation(MARK_AS_RETURNED);

  const handleReturnBook = async (reservationId: string) => {
    try {
      await markAsReturned({
        variables: { reservationId },
      });
      alert('La devolución se ha registrado con éxito.');
    } catch (error) {
      if (error.message.includes('Este libro ya fue marcado como devuelto')) {
        alert('Este libro ya fue marcado como devuelto.');
      } else {
        console.error('Error al devolver el libro:', error);
        alert('Hubo un problema al devolver el libro.');
      }
    }
  };

  return (
    <Card>
      <CardHeader className='px-7 flex flex-row justify-between items-center'>
        <div>
          <CardTitle>Libros Reservados</CardTitle>
          <CardDescription className='mt-2'>
            Cuando un usuario haya regresado un libro, el administrador debe
            hacer click en el botón para registrarlo nuevamente en la base de
            datos.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden sm:table-cell text-center'>
                Fecha de la Reserva
              </TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Usuario
              </TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Email
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Nombre del Libro
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Autor
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation: Reservation) => (
              <TableRow key={reservation.id} className='bg-accent'>
                <TableCell className='hidden sm:table-cell text-center'>
                  <div className='font-medium'>
                    {new Date(reservation.reservedAt).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  <div className='font-medium'>{reservation.user.name}</div>
                </TableCell>
                <TableCell className='hidden md:table-cell text-center'>
                  {reservation.user.email}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  {reservation.book.title}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  {reservation.book.author}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  {!reservation.returned ? (
                    <Button onClick={() => handleReturnBook(reservation.id)}>
                      Registrar Devolución
                    </Button>
                  ) : (
                    <Badge
                      className='bg-green-600 text-white'
                      variant='outline'
                    >
                      Devuelto
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
