import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '@/src/utils/graphql/mutations/book';

function CreateBookForm() {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    genre: '',
    copies_available: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'copies_available' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBook({
        variables: {
          data: formData,
        },
      });
      console.log('Libro creado:', response.data.createBook);
    } catch (err) {
      console.error('Error al crear el libro:', err);
    }
  };

  return (
    <div>
      <h1>Crear un libro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="image">URL de la imagen (Opcional):</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="genre">Género:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="copies_available">Copias disponibles:</label>
          <input
            type="number"
            id="copies_available"
            name="copies_available"
            value={formData.copies_available}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
          disabled={loading}
        >
          Crear libro
        </button>
      </form>

      {/* Mensajes de estado */}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p className="text-green-500">Libro creado con éxito</p>}
    </div>
  );
}

export default CreateBookForm;