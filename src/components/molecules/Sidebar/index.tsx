import React from 'react';
import Link from 'next/link';
import { Home, Package, Users, Book } from 'lucide-react';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';

import { useSession } from 'next-auth/react';

import PrivateComponent from '@/src/components/organism/Private';
import { useRouter } from 'next/router';

const Index = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Book className='h-6 w-6' />
            <span className=''>Biblioteca El Gato Negro</span>
          </Link>
        </div>
        <div className='mt-auto p-4'>
          <div className='flex flex-col items-center gap-2'>
            <Avatar className='w-14 h-14'>
              <AvatarImage src={session?.user?.image} alt='@shadcn' />
            </Avatar>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='font-bold'>{session?.user?.name}</h3>
              <p>{session?.user?.role}</p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              href='/'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home className='h-4 w-4' />
              Inicio
            </Link>
            <Link
              href='/inventory'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive('/inventory')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Package className='h-4 w-4' />
              Inventario
            </Link>
            <Link
              href='/reservations'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive('/reservations')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Book className='h-4 w-4' />
              Reservaciones
            </Link>
            <PrivateComponent allowedRoles={['ADMIN']}>
              <Link
                href='/users'
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive('/users') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Users className='h-4 w-4' />
                Usuarios
              </Link>
            </PrivateComponent>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Index;
