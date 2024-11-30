import { Label } from '@/src/components/ui/label';
import { Switch } from '@/src/components/ui/switch';

interface IndexProps {
  id: string;
  title: string;
  setData: (checked: boolean) => void;
  data: boolean;
}

const Index = ({ id, title, setData, data }: IndexProps) => {
  return (
    <div className='flex flex-col items-start gap-1 justify-center space-x-2'>
      <Label htmlFor={id}>{title}</Label>
      <Switch
        id={id}
        onCheckedChange={() => {
          setData(!data);
        }}
        checked={data}
      />
    </div>
  );
};

export default Index;
