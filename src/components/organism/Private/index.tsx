import React from 'react';
import { useSession } from 'next-auth/react';
import { Enum_RoleName } from '@prisma/client';

function Index({
  children,
  allowedRoles,
  elseComponent = <div></div>,
}: {
  children: React.ReactNode;
  allowedRoles: Enum_RoleName[];
  elseComponent?: React.ReactNode;
}) {
  const { data: session } = useSession();

  const role = session?.user.role;

  // @ts-expect-error fix type
  if (allowedRoles.includes(role)) {
    return <div>{children}</div>;
  }
  return <div>{elseComponent}</div>;
}

export default Index;
