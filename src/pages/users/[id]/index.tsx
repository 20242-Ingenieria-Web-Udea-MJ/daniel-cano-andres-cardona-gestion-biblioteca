import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

import useFormData from '@/src/hooks/useFormData';
import { GET_USER } from '@/src/utils/graphql/queries/users';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import DropDown from '@/src/components/organism/DropDown';
import Switch from '@/src/components/molecules/Switch';
import UploadImage from '@/src/components/molecules/UploadImage';
import { UPDATE_USER } from '@/src/utils/graphql/mutations/users';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

const ROLE = [
  { id: '1', value: 'ADMIN', label: 'Admin' },
  { id: '2', value: 'USUARIO', label: 'Usuario' },
];

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: {
      id,
    },
  };
}

export default function Index({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [enabled, setEnabled] = useState(true);
  const { form, formData, updateFormData } = useFormData({});

  const [updateUser] = useMutation(UPDATE_USER);

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log(data);
      setUser(data.user);
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    await updateUser({
      variables: {
        where: {
          id: id,
        },
        data: {
          name: {
            set: formData.name,
          },
          email: {
            set: formData.email,
          },
          role: {
            set: formData.role,
          },
        },
      },
    })
      .then(() => {
        console.log('Actualizado correctamente');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser({ variables: { userId: id } });
  }, [id, getUser]);

  return (
    <div>
      <h1 className='font-semibold'>Editar Usuario</h1>
      <form ref={form} onChange={updateFormData} onSubmit={handleSubmit}>
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
            {/* <input type='email' id='email' name='email' /> */}
            <Input id='email' type='email' name='email' />
          </div>
          <div>
            <Label htmlFor='name'>Name</Label>
            {/* <input type='name' id='name' name='name' /> */}
            <Input id='name' name='name' type='text' />
          </div>
          <div className='flex flex-col justify-center items-start gap-1'>
            <Label htmlFor='name'>Role</Label>
            {/* <DropdownMenu data={Role} /> */}
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
      </form>
    </div>
  );
}
