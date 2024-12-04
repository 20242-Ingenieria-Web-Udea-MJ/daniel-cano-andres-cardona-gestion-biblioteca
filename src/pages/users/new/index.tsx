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
import { createUser } from '@/src/utils/api';
import { nanoid } from 'nanoid';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/src/utils/graphql/mutations/users';
import { useRouter } from 'next/router';
import { useToast } from '@/src/hooks/use-toast';

import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Ingresa un correo electrónico válido.',
  }),
});

export default function InputForm() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const [createUserMutation] = useMutation(CREATE_USER);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const password = nanoid();
    try {
      await createUser({
        name: data.username,
        email: data.email,
        password,
      })
        .then(async (res) => {
          const user = res.usuario;
          await createUserMutation({
            variables: {
              data: {
                accounts: {
                  create: {
                    type: user.identities[0].provider,
                    provider: user.identities[0].provider,
                    providerAccountId: user.user_id,
                  },
                },
                name: user.name,
                role: 'USER',
                email: user.email,
                image: user.picture,
              },
            },
          })
            .then(() => {
              toast({
                title: 'El usuario se ha creado correctamente',
              });
            })
            .catch((err) => {
              toast({
                title: err.message,
                variant: 'destructive',
              });
            });
        })
        .catch(() => {
          toast({
            title: 'Ha ocurrido un problema al crear el usuario.',
            variant: 'destructive',
          });
        });

      router.push('/users');
    } catch (error) {
      console.log(error);
    }
  }

  if (status === 'loading') return <ReactLoading type='spin' color='#2563EB' />;

  if (session?.user.role !== 'ADMIN') return <div>Acceso denegado</div>;

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-6'>Agregar Usuario</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingresa tu nombre de usuario'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingresa tu correo electrónico'
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
            onClick={() => router.push('/users')}
          >
            Cancelar
          </Button>
          <Button type='submit'>Crear usuario</Button>
        </form>
      </Form>
    </div>
  );
}
