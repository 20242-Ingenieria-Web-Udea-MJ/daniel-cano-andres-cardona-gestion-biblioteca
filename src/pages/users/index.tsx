import UsersTable from '@/src/components/organism/Users';

export default function Users() {
  return (
    <div className='grid w-full'>
      <h1 className='text-3xl font-semibold mb-6'>Gestión de Usuarios</h1>
      <UsersTable />
    </div>
  );
}
