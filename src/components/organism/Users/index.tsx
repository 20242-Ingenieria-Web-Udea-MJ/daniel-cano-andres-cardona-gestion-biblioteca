import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/src/utils/graphql/queries/users";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export default function Component() {
  const [users, setUsers] = useState([]);
  useQuery(GET_ALL_USERS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setUsers(data.users);
    },
  });
  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Usuarios</CardTitle>
          {/* <CardDescription>Recent orders from your store.</CardDescription> */}
        </div>
        <Link href={`/users/new`}>
          <Button>+ Agregar Usuario</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead className="hidden sm:table-cell">Usuario</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow className="bg-accent">
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="font-medium">Daniel</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                daniel.canoh@udea.edu.co
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Admin
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/users/123`}>
                  <Badge className="text-xs" variant="default">
                    Edit
                  </Badge>
                </Link>
                <Badge className="text-xs" variant="destructive">
                  Delete
                </Badge>
              </TableCell>
            </TableRow> */}
            {users.map((user: User) => (
              <TableRow key={user.id} className="bg-accent">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.image} alt="@shadcn" />
                  </Avatar>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{user.name}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Admin
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/users/${user.id}`}>
                    <Badge className="text-xs" variant="default">
                      Edit
                    </Badge>
                  </Link>
                  <Badge
                    className="text-xs cursor-pointer"
                    variant="destructive"
                  >
                    Delete
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
