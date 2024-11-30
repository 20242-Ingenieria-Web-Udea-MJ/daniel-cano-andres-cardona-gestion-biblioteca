import Image from 'next/image';
const Index = ({ image }: { image: string }) => {
  return (
    <div>
      <Image
        src={image}
        width={100}
        height={100}
        alt='Profile Picture Image'
        className='rounded-full'
      />
    </div>
  );
};

export default Index;
