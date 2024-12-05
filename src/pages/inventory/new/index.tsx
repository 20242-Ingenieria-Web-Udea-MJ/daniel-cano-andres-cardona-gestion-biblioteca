import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';

import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { useToast } from '@/src/hooks/use-toast';

import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';
import { CREATE_BOOK } from '@/src/utils/graphql/mutations/book';
import UploadImageButton from '@/src/components/molecules/UploadImageButton';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  image: z.string().min(2, {
    message: 'La URL de la imagen debe tener al menos 2 caracteres.',
  }),
  title: z.string().min(2, {
    message: 'El título debe tener al menos 2 caracteres.',
  }),
  author: z.string().min(2, {
    message: 'El nombre del autor debe tener al menos 2 caracteres.',
  }),
  genre: z.string().min(2, {
    message: 'El género debe tener al menos 2 caracteres.',
  }),
  copies: z.preprocess(
    (value) => (value === '' ? undefined : Number(value)),
    z.number().int().min(1, {
      message: 'El número de copias debe ser un entero positivo.',
    })
  ),
});

export default function InputForm() {
  const { data: session, status } = useSession();

  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: '',
      title: '',
      author: '',
      genre: '',
      copies: 0,
    },
  });

  const [createBookMutation] = useMutation(CREATE_BOOK);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await createBookMutation({
        variables: {
          title: values.title,
          author: values.author,
          image: values.image,
          genre: values.genre,
          copies_available: values.copies,
        },
      })
        .then(() => {
          toast({
            title: 'El libro se ha creado correctamente',
          });

          router.push('/inventory');
        })
        .catch((err) => {
          toast({
            title: 'Error al crear el libro' + err.message,
            variant: 'destructive',
          });
        });
    } catch (error) {
      toast({
        title: 'Hubo un problema al crear el libro.' + error,
        variant: 'destructive',
      });
    }
  }

  useEffect(() => {
    form.setValue('image', imageUrl);
  }, [imageUrl, form]);

  if (status === 'loading') return <ReactLoading type='spin' color='#2563EB' />;

  if (session?.user.role !== 'ADMIN') return <div>Acceso denegado</div>;

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-6'>Agregar Libro</h1>

      {imageUrl !== '' && (
        <div className='w-32 h-48 border overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt='Portada del libro'
            className='h-full w-full'
          />
        </div>
      )}

      <div className='my-4'>
        <UploadImageButton setUrl={setImageUrl} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingresa la URL de la imagen'
                    disabled
                    {...field}
                  />
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
                  <Input placeholder='Ingresa el título del libro' {...field} />
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
                  <Input placeholder='Ingresa el autor del libro' {...field} />
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
                  <Input placeholder='Ingresa el género del libro' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='copies'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copias disponibles</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Ingresa las copias disponibles del libro'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='button'
            variant='destructive'
            className='mr-4'
            onClick={() => router.push('/inventory')}
          >
            Cancelar
          </Button>
          <Button type='submit'>Agregar libro</Button>
        </form>
      </Form>
    </div>
  );
}
