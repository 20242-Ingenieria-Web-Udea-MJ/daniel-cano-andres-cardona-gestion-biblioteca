import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

import { GET_USER } from '@/src/utils/graphql/queries/users';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import UploadImage from '@/src/components/molecules/UploadImage';

import { UPDATE_USER } from '@/src/utils/graphql/mutations/users';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useRouter } from 'next/router';
import { useToast } from '@/src/hooks/use-toast';
import ReactLoading from 'react-loading';

const ROLE = [
  { id: '1', value: 'ADMIN', label: 'Admin' },
  { id: '2', value: 'USER', label: 'Usuario' },
];

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: {
      id,
    },
  };
}

const formSchema = z.object({
  image: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export default function Index({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [updateUser, { loading: mutationLoading }] = useMutation(UPDATE_USER);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
      email: '',
      role: '',
    },
  });

  const [getUser, { loading: querieLoading }] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      form.reset(data.user);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    await updateUser({
      variables: {
        where: {
          id: id,
        },
        data: {
          image: {
            set: values.image,
          },
          name: {
            set: values.name,
          },
          email: {
            set: values.email,
          },
          role: {
            set: values.role,
          },
        },
      },
    })
      .then(() => {
        toast({
          title: 'Actualizado correctamente',
        });
      })
      .catch((err) => {
        toast({
          title: err.message,
          variant: 'destructive',
        });
      });

    router.push('/users');
  };

  useEffect(() => {
    getUser({ variables: { userId: id } });
  }, [id, getUser]);

  if (querieLoading || mutationLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <ReactLoading type='spin' color='#2563EB' />
      </div>
    );

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-6'>Editar Usuario</h1>
      <div className='flex flex-col items-center mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='flex flex-col items-center'>
                  <FormLabel>Imagen de Perfil</FormLabel>

                  <UploadImage image={field.value} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='shadcn'
                      {...field}
                      className='w-[400px]'
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
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    Esta información no puede ser modificada.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Selecciona un rol' />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE.map(
                          (item: {
                            id: string;
                            value: string;
                            label: string;
                          }) => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              className='mr-4'
              variant='destructive'
              onClick={() => router.push('/users')}
            >
              Cancelar
            </Button>
            <Button type='submit'>Confirmar</Button>
          </form>
        </Form>
      </div>
      {/* <CldUploadButton uploadPreset='UdeA Inge Web' /> */}
      {/* <form ref={form} onChange={updateFormData} onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-10 mx-auto max-w-xl'>
          <div className='col-span-2 flex flex-col justify-center items-center'>
            <UploadImage image={user?.image} />
            <Label htmlFor='picture' className='mt-4'>
              Image
            </Label>
            <Input id='picture' type='file' />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>

            <Input id='email' type='email' name='email' />
          </div>
          <div>
            <Label htmlFor='name'>Name</Label>

            <Input id='name' name='name' type='text' />
          </div>
          <div className='flex flex-col justify-center items-start gap-1'>
            <Label htmlFor='name'>Role</Label>

            <DropDown data={ROLE} />
          </div>
          <div className='flex flex-col justify-center items-start gap-1'>
            <Switch
              id='enabled'
              title='Enabled'
              data={enabled}
              setData={setEnabled}
            />
          </div>
        </div>
        <div className='flex justify-center mt-6'>
          <Button type='submit'>Confirmar</Button>
        </div>
      </form> */}
    </div>
  );
}
