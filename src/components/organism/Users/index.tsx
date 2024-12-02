import { Badge } from '@/src/components/ui/badge';
import {
  Card,
  CardContent,
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
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '@/src/utils/graphql/queries/users';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { DELETE_USER } from '@/src/utils/graphql/mutations/users';
import { User } from '@/src/types/user';
import { useToast } from '@/src/hooks/use-toast';

export default function Component() {
  const [users, setUsers] = useState<User[]>([]);
  useQuery(GET_ALL_USERS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setUsers(data.users);
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  const { toast } = useToast();

  const handleDelete = async (userId: string) => {
    try {
      const { data } = await deleteUser({ variables: { userId } });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      console.log(data.deleteUserCustom);

      toast({
        title: 'El usuario se ha eliminado correctamente.',
      });
    } catch (error) {
      toast({
        title: `Error al eliminar el usuario. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader className='px-7 flex flex-row justify-between items-center'>
        <div>
          <CardTitle>Usuarios</CardTitle>
        </div>
        <Link href={`/users/new`}>
          <Button>+ Agregar Usuario</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Imagen</TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Usuario
              </TableHead>
              <TableHead className='hidden sm:table-cell text-center'>
                Email
              </TableHead>
              <TableHead className='hidden md:table-cell text-center'>
                Rol
              </TableHead>
              <TableHead className='text-center'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id} className='bg-accent'>
                <TableCell className='flex justify-center'>
                  <Avatar>
                    <AvatarImage src={user.image} alt='@shadcn' />
                  </Avatar>
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  <div className='font-medium'>{user.name}</div>
                </TableCell>
                <TableCell className='hidden md:table-cell text-center'>
                  {user.email}
                </TableCell>
                <TableCell className='hidden sm:table-cell text-center'>
                  <Badge className='text-xs' variant='secondary'>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className='text-center'>
                  <Link href={`/users/${user.id}`}>
                    <Badge className='text-xs' variant='default'>
                      <Edit />
                    </Badge>
                  </Link>
                  <Badge
                    className='text-xs cursor-pointer ml-2'
                    variant='destructive'
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash />
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
