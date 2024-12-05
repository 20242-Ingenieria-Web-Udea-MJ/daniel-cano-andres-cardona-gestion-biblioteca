import prisma from 'config/prisma';

const BookCustomResolvers = {
  Query: {
    // Obtener todos los libros
    books: async () => {
      return prisma.book.findMany();
    },

    // Obtener un libro por ID
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    book: async (_: any, { id }: { id: string }) => {
      return prisma.book.findUnique({ where: { id } });
    },
  },

  Mutation: {
    reserveBook: async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: any,
      { userId, bookId }: { userId: string; bookId: string }
    ) => {
      try {
        // Verificar si el usuario ya tiene una reserva activa para el mismo libro
        const existingReservation = await prisma.reservation.findFirst({
          where: {
            userId,
            bookId,
            returned: false, // Verificar que la reserva no haya sido devuelta
          },
        });

        if (existingReservation) {
          throw new Error(
            'Ya tienes este libro reservado y no ha sido devuelto.'
          );
        }

        // Verificar si hay copias disponibles
        const book = await prisma.book.findUnique({
          where: { id: bookId },
        });

        if (!book) {
          throw new Error('El libro no existe.');
        }

        if (book.copies_available <= 0) {
          throw new Error('No hay copias disponibles de este libro.');
        }

        // Crear la reserva y actualizar las copias disponibles
        await prisma.$transaction(async (prisma) => {
          await prisma.book.update({
            where: { id: bookId },
            data: {
              copies_available: {
                decrement: 1,
              },
            },
          });

          await prisma.reservation.create({
            data: {
              userId,
              bookId,
            },
          });
        });

        return 'Reserva realizada con éxito';
      } catch (error) {
        console.error('Error al reservar el libro:', error);
        throw new Error('Hubo un problema al realizar la reserva.');
      }
    },

    markAsReturned: async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: any,
      { reservationId }: { reservationId: string }
    ) => {
      try {
        // Buscar la reserva por el ID
        const reservation = await prisma.reservation.findUnique({
          where: { id: reservationId },
          include: { book: true }, // Incluir información del libro
        });

        // Validar si la reserva existe y si ya fue devuelta
        if (!reservation) {
          throw new Error('Reserva no encontrada.');
        }

        if (reservation.returned === true) {
          throw new Error('Este libro ya fue marcado como devuelto.');
        }

        // Cambiar el estado de la reserva a "devuelto"
        await prisma.reservation.update({
          where: { id: reservationId },
          data: { returned: true },
        });

        await prisma.book.update({
          where: { id: reservation?.book.id },
          data: {
            copies_available: {
              increment: 1,
            },
          },
        });

        return 'Libro devuelto con éxito.';
      } catch (error) {
        console.log('Error al marcar el libro como devuelto:', error);
        throw new Error(
          // @ts-expect-error fix type
          error.message || 'Hubo un problema al marcar el libro como devuelto.'
        );
      }
    },

    createBook: async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { title, author, image, genre, copies_available }: any
    ) => {
      return prisma.book.create({
        data: { title, author, image, genre, copies_available },
      });
    },

    // updateBook: async (
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   _: any,
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   { id, title, author, image, genre, copies_available }: any
    // ) => {
    //   return prisma.book.update({
    //     where: { id },
    //     data: { title, author, image, genre, copies_available },
    //   });
    // },

    deleteBookCustom: async (_parent: unknown, { id }: { id: string }) => {
      try {
        const deletedBook = await prisma.book.delete({
          where: { id },
        });

        return deletedBook;
      } catch (error) {
        console.error('Error eliminando libro:', error);
        throw new Error('Hubo un problema al eliminar el libro.');
      }
    },
  },
};

export default BookCustomResolvers;
