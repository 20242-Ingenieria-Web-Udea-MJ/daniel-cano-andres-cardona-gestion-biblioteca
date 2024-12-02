import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { Button } from '../../ui/button';

const Index = () => {
  const [resource, setResource] = useState();
  console.log('resource', resource);
  return (
    <CldUploadWidget
      uploadPreset='UdeA Inge Web'
      onSuccess={(result, { widget }) => {
        console.log('result', result);
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
