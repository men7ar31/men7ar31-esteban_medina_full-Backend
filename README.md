# 🚀 NestJS API con Autenticación, Almacenamiento y Búsqueda de Imágenes

## 📌 Descripción
Esta aplicación está construida con **NestJS** y proporciona funcionalidades de autenticación con JWT y Google OAuth, almacenamiento de archivos en **AWS S3**, y búsqueda de imágenes en **Unsplash**.

## 🔧 Tecnologías utilizadas
- **NestJS** (Framework de Node.js)
- **MongoDB Atlas** (Base de datos NoSQL)
- **JWT (JSON Web Tokens)** (Autenticación)
- **Google OAuth** (Autenticación con Google)
- **AWS S3** (Almacenamiento de archivos)
- **Unsplash API** (Búsqueda de imágenes)
- **Swagger** (Documentación de la API)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
 git clone <URL_DEL_REPOSITORIO>
 cd <NOMBRE_DEL_PROYECTO>
```

### 2️⃣ Instalar dependencias
```bash
 npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```


### 4️⃣ Iniciar el servidor
```bash
 npm run start
```

## 📖 Endpoints principales

### 🛠️ **Autenticación** (`/auth`)
- `POST /auth/register` → Registro de usuario
- `POST /auth/login` → Inicio de sesión
- `POST /auth/profile` → Obtener perfil del usuario autenticado (requiere JWT)
- `GET /auth/google` → Redirección a Google OAuth
- `GET /auth/google/callback` → Callback de autenticación con Google
- `POST /auth/forgot-password` → Solicitar recuperación de contraseña
- `POST /auth/reset-password` → Restablecer contraseña

### 📂 **Almacenamiento en S3** (`/upload`)
- `POST /upload` → Subir un archivo a AWS S3
- `GET /upload/file/:fileName` → Obtener URL de un archivo
- `DELETE /upload/file/:fileName` → Eliminar un archivo
- `POST /upload/rename` → Renombrar un archivo

### 🖼️ **Búsqueda de imágenes**
- `GET /unsplash/search` → Buscar imágenes en Unsplash
- `GET /unsplash-s3/upload?query=...` → Buscar y subir imágenes de Unsplash a S3

## 📜 Documentación con Swagger
Después de iniciar el servidor, accede a la documentación interactiva en:
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

## 👤 Contacto

- **Autor:** Esteban Nicolás Medina
- **Correo:** [medinanico93@gmail.com](mailto:medinanico93@gmail.com)
- **LinkedIn:** [Perfil](https://www.linkedin.com/in/esteban-nicolas-medina-men/)
