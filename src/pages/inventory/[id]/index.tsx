import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { useRouter } from 'next/router';
import { useToast } from '@/src/hooks/use-toast';
import ReactLoading from 'react-loading';
import { GET_BOOK } from '@/src/utils/graphql/queries/books';
import { UPDATE_BOOK } from '@/src/utils/graphql/mutations/book';
import { useSession } from 'next-auth/react';
import UploadImageButton from '@/src/components/molecules/UploadImageButton';

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: { id },
  };
}

const formSchema = z.object({
  image: z.string().min(2, { message: 'La imagen es obligatoria.' }),
  title: z.string().min(2, { message: 'El título es obligatorio.' }),
  author: z.string().min(2, { message: 'El autor es obligatorio.' }),
  genre: z.string().min(2, { message: 'El género es obligatorio.' }),
  copies_available: z.preprocess(
    (value) => (value === '' ? undefined : Number(value)),
    z.number().int().min(1, {
      message: 'El número de copias debe ser un entero positivo.',
    })
  ),
});

export default function EditBook({ id }: { id: string }) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { toast } = useToast();
  const [updateBook, { loading: mutationLoading }] = useMutation(UPDATE_BOOK);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      title: '',
      author: '',
      genre: '',
      copies_available: 1,
    },
  });

  const [imageUrl, setImageUrl] = useState('');
  // console.log(imageUrl);

  const [getBook, { loading: queryLoading }] = useLazyQuery(GET_BOOK, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      form.reset(data.book);

      if (data?.book?.image) setImageUrl(data.book.image);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateBook({
        variables: {
          where: { id },
          data: {
            title: { set: values.title },
            author: { set: values.author },
            image: { set: values.image },
            genre: { set: values.genre },
            copies_available: { set: values.copies_available },
          },
        },
      });
      toast({ title: 'Libro actualizado correctamente.' });
      router.push('/inventory');
    } catch (err) {
      toast({
        title: 'Ha ocurrido un problema al actualizar el libro: ' + err,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    getBook({ variables: { bookId: id } });
  }, [id, getBook]);

  useEffect(() => {
    form.setValue('image', imageUrl);
  }, [imageUrl, form]);

  if (queryLoading || mutationLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <ReactLoading type='spin' color='#2563EB' />
      </div>
    );

  if (status === 'loading') return <ReactLoading type='spin' color='#2563EB' />;

  if (session?.user.role !== 'ADMIN') return <div>Acceso denegado</div>;

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-6'>Editar Libro</h1>

      {imageUrl !== '' && (
        <div className='w-32 h-48 border overflow-hidden mx-auto'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt='Portada del libro'
            className='h-full w-full'
          />
        </div>
      )}

      <div className='my-4 flex justify-center'>
        <UploadImageButton setUrl={setImageUrl} />
      </div>

      <div className='flex flex-col items-center mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input placeholder='URL de la imagen' {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder='Título del libro' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder='Autor del libro' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Input placeholder='Género del libro' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='copies_available'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copias Disponibles</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              className='mr-4'
              variant='destructive'
              onClick={() => router.push('/inventory')}
            >
              Cancelar
            </Button>
            <Button type='submit'>Guardar Cambios</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
