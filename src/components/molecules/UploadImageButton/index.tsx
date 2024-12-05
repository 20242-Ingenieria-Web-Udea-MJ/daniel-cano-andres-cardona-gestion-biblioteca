import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';

const Index = ({ setUrl }: { setUrl: (url: string) => void }) => {
  const [resource, setResource] = useState();

  useEffect(() => {
    // @ts-expect-error fix type
    if (resource) setUrl(resource?.url);
  }, [resource, setUrl]);

  return (
    <CldUploadWidget
      uploadPreset='UdeA Inge Web'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess={(result, { widget }) => {
        // @ts-expect-error fix type
        setResource(result?.info); // { public_id, secure_url, etc }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return (
          <Button type='button' onClick={handleOnClick}>
            Cambiar imagen
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default Index;
