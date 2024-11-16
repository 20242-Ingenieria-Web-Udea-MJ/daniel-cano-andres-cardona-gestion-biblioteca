import React from 'react';
import useFormData from '@/src/hooks/useFormData';
import { nanoid } from 'nanoid';
import { createUser } from '@/src/utils/api';

export default function Users() {
  const { form, formData, updateFormData } = useFormData(null);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    const password = nanoid(8);
    try {
      const usuario = await createUser({
        name: formData.name,
        email: formData.email,
        password,
      });
      console.log(usuario);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Users</h1>
      <p>This is the users page</p>
      <form ref={form} onChange={updateFormData} onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input type='email' id='email' name='email' />
        </label>
        <label htmlFor='password'>
          Password
          <input type='password' id='password' name='password' />
        </label>
        <label htmlFor='confirmPassword'>
          Confirm Password
          <input type='password' id='confirmPassword' name='confirmPassword' />
        </label>
        <label htmlFor='name'>
          Name
          <input type='text' id='name' name='name' />
        </label>
        <label htmlFor='lastName'>
          Last Name
          <input type='text' id='lastName' name='lastName' />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
