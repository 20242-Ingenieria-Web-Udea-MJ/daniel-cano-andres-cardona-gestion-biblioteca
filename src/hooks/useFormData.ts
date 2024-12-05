import { useRef, useState } from 'react';

// @ts-expect-error fix types
const useFormData = (initial) => {
  const form = useRef(initial);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState({} as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFormData: any = () => {
    const fd = new FormData(form.current);

    const obj = {};
    fd.forEach((value, key) => {
      const str = key.split(':');

      if (str.length > 1) {
        // @ts-expect-error fix types
        obj[str[0]] = {
          // @ts-expect-error fix types
          ...obj[str[0]],

          [str[1]]: value,
        };
      } else {
        // @ts-expect-error fix types
        obj[str[0]] = value;
      }
    });

    return obj;
  };

  const updateFormData = () => {
    setFormData(getFormData());
  };

  return { form, formData, updateFormData } as const;
};

export default useFormData;
