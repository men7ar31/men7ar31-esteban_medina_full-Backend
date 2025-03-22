# 🚀 NestJS API con Autenticación, Almacenamiento y Búsqueda de Imágenes

## 📌 Descripción
Esta API está construida con **NestJS** y ofrece funcionalidades como:
👉 Autenticación con **JWT y Google OAuth**  
👉 Almacenamiento de archivos en **AWS S3**  
👉 Búsqueda de imágenes en **Unsplash**  
👉 Documentación con **Swagger**  
👉 Desplegable con **Docker**  

---

## 🔧 Tecnologías utilizadas
- **NestJS** (Framework de Node.js)
- **MongoDB Atlas** (Base de datos NoSQL)
- **JWT (JSON Web Tokens)** (Autenticación)
- **Google OAuth** (Inicio de sesión con Google)
- **AWS S3** (Almacenamiento de archivos)
- **Unsplash API** (Búsqueda de imágenes)
- **Swagger** (Documentación de la API)
- **Docker** (Contenedorización)
- **Jest** (Pruebas unitarias y E2E)

---

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

---

## 🏃‍♂️ Ejecutar el servidor

### Modo desarrollo:
```bash
npm run start:dev
```

### Modo producción:
```bash
npm run build
npm run start
```

---

## 🐬 Ejecutar con Docker
Si prefieres correr la API con **Docker**, usa el siguiente comando:

```bash
docker-compose up --build
```

Esto levantará la aplicación con la configuración definida en `docker-compose.yml`.

---

## 📚 Endpoints principales

### 🛠️ **Autenticación** (`/auth`)
| Método | Ruta | Descripción |
|--------|------|------------|
| `POST` | `/auth/register` | Registro de usuario |
| `POST` | `/auth/login` | Inicio de sesión |
| `GET` | `/auth/profile` | Obtener perfil del usuario autenticado |
| `GET` | `/auth/google` | Redirección a Google OAuth |
| `GET` | `/auth/google/callback` | Callback de autenticación con Google |
| `POST` | `/auth/forgot-password` | Solicitar recuperación de contraseña |
| `POST` | `/auth/reset-password` | Restablecer contraseña |

Ejemplo de respuesta en `/auth/login`:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

---

### 📂 **Almacenamiento en S3** (`/upload`)
| Método | Ruta | Descripción |
|--------|------|------------|
| `POST` | `/upload` | Subir un archivo a AWS S3 |
| `GET` | `/upload/file/:fileName` | Obtener URL de un archivo |
| `DELETE` | `/upload/file/:fileName` | Eliminar un archivo |
| `POST` | `/upload/rename` | Renombrar un archivo |

---

### 🎨 **Búsqueda de imágenes** (`/unsplash`)
| Método | Ruta | Descripción |
|--------|------|------------|
| `GET` | `/unsplash/search` | Buscar imágenes en Unsplash |
| `GET` | `/unsplash-s3/upload?query=...` | Buscar y subir imágenes de Unsplash a S3 |

---

## 🤖 Pruebas

Para ejecutar **pruebas unitarias**:
```bash
npm run test
```

Para ejecutar **pruebas E2E**:
```bash
npm run test:e2e
```

Para ver la cobertura de pruebas:
```bash
npm run test:cov
```

---

## 🐝 Documentación con Swagger
Después de iniciar el servidor, accede a la documentación interactiva en:  
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

## 👤 Contacto

- **Autor:** Esteban Nicolás Medina
- **Correo:** [medinanico93@gmail.com](mailto:medinanico93@gmail.com)
- **LinkedIn:** [Perfil](https://www.linkedin.com/in/esteban-nicolas-medina-men/)

