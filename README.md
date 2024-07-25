# Filmoteca Ionic

Filmoteca Ionic es un proyecto de biblioteca de películas creado en Angular, TypeScript e Ionic.

## Prerequisitos

Deberás tener instalado lo siguiente

- **[Node.js](https://nodejs.org/)**: Incluye npm (Node Package Manager).
- **[Ionic CLI](https://ionicframework.com/docs/cli)**: Instalalo globalmente por npm:

  ```bash
  npm install -g @ionic/cli
  ```
  
## Paso a Paso

### 1. Clonar el Repositorio

Abre una terminal y clona el repositorio usando Git:

```bash
git clone https://github.com/aramirez00-dev/filmotecaIonic.git
```

Navega al directorio del proyecto:

```bash
cd filmotecaIonic
```

### 2. Instalar Dependencias

Instala las dependencias del proyecto con npm:

```bash
npm install
```

### 3. Ejecutar la Aplicación

Inicia el servidor de desarrollo de Ionic:

```bash
ionic serve
```

### 4. Probar la Aplicación

Ya podés probar la app!

## Características principales

- **Login**: Valida la página de inicio de sesión y la funcionalidad de autenticación.
- **Register**: Registro de usuario, incluyendo la validación del formulario.
- **Home**: Página de inicio que muestra la lista de películas.
- **Movie Details**: Confirma que la página de detalles de la película muestra información precisa sobre la película.
- **Edit Movie**: Puedes editar y guardar los detalles de la película.
- **Profile**: Verifica que la página de perfil muestre correctamente la información del usuario y permita la edición del perfil.
- **TMDB**: Servicio a través del cual obtiene datos para cargar la información de las películas.

## Pendientes

- **Logo de usuario**: Agregar funcionalidad de agregar y editar logo de usuario.
- **Experiencia**: Mejorar estilos, homogeneizar paletas de colores, refactorizar visuales para una mejor experiencia de usuario.
- **Routing**: Optimizar y restringir mejor la dinámica de routing.
- **Servicios**: Corregir redundancias en servicios creados.
- **Manejo de errores**: Agregar manejo de errores en lugares críticos.
- **Pruebas Unitarias**: Agregar pruebas unitarias con Karma y Jest.

