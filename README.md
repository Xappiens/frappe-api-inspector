# 🚀 Frappe & ERPNext DocType Inspector

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Frappe](https://img.shields.io/badge/Frappe-ERPNext-orange)
![Author](https://img.shields.io/badge/Author-Javier_Rodriguez_Fernandez-blueviolet)

Una potente e inteligente **Single Page Application (SPA)** diseñada para interactuar con la REST API de servidores Frappe/ERPNext. Facilita enormemente el trabajo de los desarrolladores y consultores permitiendo inspeccionar la estructura de los `DocTypes`, generar payloads JSON para integraciones, lanzar tests automatizados y capturar Webhooks.

## 🌟 Características Principales

1. **Escáner Inteligente de Permisos**: Aunque tu servidor tenga la API bloqueada, la aplicación utiliza un escáner por fuerza bruta basado en los menús (*Workspaces*) y un diccionario estándar de ERPNext para extraer únicamente los DocTypes a los que tienes acceso real (lectura), 100% automático y "Admin-Free".
2. **Inspección Profunda de Schemas**: Explora los campos obligatorios, ocultos, opciones (Selects/Links) de cualquier documento base o personalizado sin depender del navegador oficial.
3. **Comparador (Schema Diff)**: Guarda "Snapshots" (Fotografías) de la estructura actual de un DocType. Modifica tu servidor (o cambia de entorno) y descubre visualmente qué campos se han añadido o modificado con la herramienta Diffing integrada.
4. **API Test Runner Automatizado**: Construye tu propia suite de test manuales (GET, POST, PUT, DELETE) contra la API de Frappe, verifica resultados en un solo clic y asegúrate de que tus campos obligatorios funcionan.
5. **Generador de Payloads JSON**: Botón instantáneo para copiar la estructura de datos obligatoria exacta, lista para ser pegada en aplicaciones como Postman o Bruno, o en tu backend.
6. **Detector Local de Webhooks**: La aplicación incluye en su Proxy interno un escáner `localhost:3000/api/webhook-listener`. Puedes configurar tu Frappe para que escupa los eventos hacia este emulador y poder debugear payloads en tiempo real mediante la interfaz de la pestaña Webhooks.
7. **Modo Claro / Oscuro**: Para hacer el desarrollo amigable con la vista 🌛 / 🌞.
8. **Búsqueda Global (Ctrl+K / Cmd+K)**: Accede instantáneamente a cualquier DocType cacheado desde un modal al estilo VS Code.

## ⚙️ Tecnologías

- **Frontend:** Vanilla JavaScript, Tailwind CSS, HTML5. UI enfocada a rendimiento sub-milísegundo. Sin frameworks pesados.
- **Proxy/Backend:** NodeJS, Express, HTTP-Proxy-Middleware (Para sortear la política CORS de Frappe en el navegador y atrapar llamadas).

---

## 🛠️ Instalación y Uso

Asegúrate de tener instalado [Node.js v14 o superior](https://nodejs.org/).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_EMPRESA/frappe-inspector.git
   cd frappe-inspector
   ```

2. Instala las dependencias del proxy:
   ```bash
   npm install
   ```

3. Levanta el servidor:
   ```bash
   npm start
   ```
   *(Pista: En Windows también puedes doble-clic directamente en `start.bat`)*

4. La aplicación web se abrirá por defecto en **[http://localhost:3500](http://localhost:3500)**. La consola de Node.js se encargará de gestionar el tráfico cruzado CORS con tu dominio real de ERPNext.

---

## 🔐 Configuración de la API Key en Frappe

Para conectar la app:
1. Inicia sesión en Frappe/ERPNext de tu empresa.
2. Ve al Perfil de Usuario.
3. Activa / Genera las correspondientes **API Key** y **API Secret**.
4. Pega tus credenciales y la URL base de tu instalación (ej. `https://erp.tuempresa.com`) en la barra lateral de conexión de la herramienta.

---

## 👨‍💻 Autor

Desarrollado y diseñado con ♥ por **Javier Rodriguez Fernandez**.
