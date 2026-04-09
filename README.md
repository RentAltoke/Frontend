# 🏢 RentAltoke - Frontend

Frontend del sistema **RentAltoke**, una plataforma para la gestión de inmuebles, unidades (departamentos/locales) e inquilinos.

Este proyecto está desarrollado con **Angular** y permite administrar de forma eficiente propiedades y sus unidades asociadas.

---

## 📌 Características

- Gestión de **Inmuebles**
- Gestión de **Unidades** (departamentos, locales, etc.)
- Gestión de **Inquilinos**
- Formularios con validaciones
- Navegación mediante rutas (Angular Router)
- Interfaz moderna y modular

---

## 🛠️ Tecnologías utilizadas

- Angular (CLI 21+)
- TypeScript
- HTML5 / CSS3
- RxJS
- Angular Router

---

## 🚀 Ejecución del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/rentaltoke-frontend.git
cd rentaltoke-frontend
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

##  Ejecución del Trabajo

Cómo trabaja cada integrante

Cada uno se encarga de un módulo (ideal en tu caso):

Dev 1 → Inmuebles
Dev 2 → Unidades
Dev 3 → Inquilinos

```bash
# 1. Clonar repo
git clone <repo>

# 2. Cambiar a develop
git checkout develop

# 3. Crear su rama
git checkout -b feature/inmuebles
```

### Subir cambios correctamente

```bash
git add .
git commit -m "feat: agregar listado de inmuebles"
git push origin feature/inmuebles
```

### Mantenerse actualizado (evitar conflictos)
Antes de trabajar SIEMPRE:
```bash
git checkout develop
git pull origin develop

git checkout feature/inmuebles
git merge develop
```

Prueba de workflow