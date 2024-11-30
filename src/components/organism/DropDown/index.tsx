import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

interface IndexProps {
  data: { id: string; value: string; label: string }[];
}

const Index: React.FC<IndexProps> = ({ data }) => {
  return (
    <div>
      <Select name='role'>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Selecciona un rol' />
        </SelectTrigger>
        <SelectContent>
          {data.map((item: { id: string; value: string; label: string }) => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Index;
