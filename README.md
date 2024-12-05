<h1>Sistema de Gestión de Biblioteca</h1>

<h2>Desarrollado por:</h2>
<p>Daniel Cano Hernández</p>
<p>Andrés Cardona</p>

<hr/>

<h2>Usuarios para probar la aplicación en local:</h2>
<h3>Administrador</h3>
<p>
  Correo: admin@bibliotecaingeweb.com
</p>
<p>Clave: Admin123$</p>
<h3>Usuario</h3>
<p>
  Correo: usuariodeprueba@ingewebudea.com
</p>
<p>Clave: Usuario123$</p>

<hr/>

<p>
  El objetivo de este proyecto es desarrollar una aplicación web segura y escalable utilizando Next.js y NextAuth.js para la autenticación de usuarios, Auth0 para la gestión de identidades, y Cloudinary para el manejo de archivos multimedia. La aplicación está diseñada para proporcionar una experiencia de usuario intuitiva y eficiente, al tiempo que asegura el almacenamiento y recuperación de datos mediante Supabase como base de datos.
</p>

<hr/>

<h2>Funcionalidades:</h2>

<h3>Visualizar libros disponibles</h3>
<p>En la página de inicio se pueden ver todos los libros que hay disponibles con sus respectivas características y un botón para reservarlos.</p>

<h3>Inventario</h3>
<p>Esta sección permite gestionar el inventario de libros. Cualquier usuario puede acceder a esta página, pero solo el administrador puede modificar o agregar nuevos libros.</p>

<h3>Reservaciones</h3>
<p>En esta sección se muestran todas las reservas de libros que se han realizado. La idea es que cuando un usuario haya regresado un libro a la biblioteca, el administrador presione el botón de "Registrar devolución" para cambiar el estado de "Pendiente" a "Devuelto".</p>

<h3>Gestión de usuarios</h3>
<p>Esta sección solo estará disponible para el administrador del sistema. Aquí podrá editar, borrar y agregar nuevos usuarios al sistema de biblioteca.</p>

<hr /> 

<h2>Pasos para ejecutar el proyecto</h2>

<ol>
  <li>Clonar el repositorio</li>
  <li>Ejecutar el comando <i>yarn</i></li>
  <li>Ejecutar el comando <i>yarn generate</i></li>
  <li>Ejecutar el comando <i>yarn dev</i></li>
</ol>

<h2>Despliegue en Vercel</h2>

<p>https://daniel-cano-andres-cardona-gestion-biblioteca.vercel.app/</p>
