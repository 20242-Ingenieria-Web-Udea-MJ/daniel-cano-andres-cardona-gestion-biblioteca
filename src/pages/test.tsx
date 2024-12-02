import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const Test = () => {
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
        return <button onClick={handleOnClick}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default Test;
