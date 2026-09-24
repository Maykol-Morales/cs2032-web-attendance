# cs2032-web-attendance

> Proyecto del curso **CS2032 – Cloud Computing** · UTEC

Web de **registro de asistencia** para las sesiones del curso. El alumno escanea el QR que genera el profesor desde el [panel de administración](https://github.com/Maykol-Morales/cs2032-web-admin), inicia sesión con su cuenta de Google de UTEC y la asistencia se registra junto con su ubicación.

🌐 **En producción:** https://attendance.cs2032.com

## Flujo

1. El QR de la sesión abre la web con los parámetros `?course=<id>&session=<id>`.
2. El alumno inicia sesión con Google (solo se aceptan correos de UTEC).
3. El navegador pide la geolocalización del alumno.
4. Se envía `POST /attendance` al backend con el curso, la sesión, el correo y la ubicación.
5. La web muestra el resultado: registrada, ya registrada, sesión no encontrada, correo no válido, etc.

## Stack

- Astro 5 · React 19 · TypeScript
- Tailwind CSS 4 · shadcn/ui · Sonner
- Google OAuth (`@react-oauth/google`)
- pnpm
- Despliegue estático en AWS S3 + CloudFront

## Configuración

Crea un archivo `.env` (está en `.gitignore`):

| Variable | Descripción |
|---|---|
| `PUBLIC_BACK_END_URL` | URL base de la API de asistencia |
| `PUBLIC_BACK_END_KEY` | API key enviada en el header `x-api-key` |
| `PUBLIC_GOOGLE_CLIENT_ID` | Client ID de Google OAuth |

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:4321/?course=<id>&session=<id>
pnpm build      # genera dist/
pnpm preview
```

## Estructura

```
src/
├── components/
│   ├── google-auth.tsx   # Login con Google y orquestación del flujo
│   ├── views/            # Pantallas: sin parámetros, sin ubicación, pre/post login
│   └── ui/               # Componentes shadcn/ui
├── hooks/                # use-attendance, use-geo-location, use-google-auth, use-query-parameter
├── layouts/
└── pages/index.astro
```

## Repositorios relacionados

- [cs2032-web-admin](https://github.com/Maykol-Morales/cs2032-web-admin) — panel del profesor (sesiones y QR)
- [cs2032-web-hackathon](https://github.com/Maykol-Morales/cs2032-web-hackathon) — web del hackathon HACK//UTEC
