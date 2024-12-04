import UsersTable from '@/src/components/organism/Users';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';

export default function Users() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <ReactLoading type='spin' color='#2563EB' />;

  if (session?.user.role !== 'ADMIN') return <div>Acceso denegado</div>;

  return (
    <div className='grid w-full'>
      <h1 className='text-3xl font-semibold mb-6'>Gestión de Usuarios</h1>
      <UsersTable />
    </div>
  );
}
