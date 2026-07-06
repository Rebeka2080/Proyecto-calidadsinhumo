# context.md — Documento Técnico del Proyecto

> Generado automáticamente mediante análisis del proyecto.  
> Última actualización: 2026-07-04

---

## 1. Resumen

**`nuevoproyectos5`** es un proyecto de automatización de pruebas de calidad (QA) desarrollado en el contexto del curso *Automation IA con Adri — Sesión 5*.

El objetivo del proyecto es automatizar la verificación funcional del sitio web [playground.calidadsinhumo.com](https://playground.calidadsinhumo.com), comenzando por el módulo de **Login**. La estrategia de pruebas contempla cobertura de tests UI (interfaz de usuario) y, en el futuro, tests de API.

El proyecto está en una etapa **inicial / en construcción**: la configuración base está operativa y existe un primer conjunto de tests de UI funcionales.

---

## 2. Arquitectura y módulos

### Estructura de carpetas

```
nuevoproyectos5/
├── IA/
│   └── context.md              ← Este documento
├── analisis/
│   └── login-aterriza.md       ← Análisis de escenarios de prueba (login)
├── tests/
│   ├── example.spec.ts         ← Test de humo / ejemplo base (Playwright.dev)
│   ├── ui/
│   │   └── login.spec.ts       ← Tests de interfaz de usuario (Login)
│   └── api/                    ← Vacío — reservado para tests de API (pendiente)
├── playwright-report/           ← Reportes HTML generados por Playwright
├── playwright.config.ts         ← Configuración central de Playwright
├── package.json                 ← Dependencias y scripts npm
├── tsconfig.json                ← Configuración de TypeScript
└── prompt_context.md            ← Prompt que origina este documento
```

### Módulos de prueba actuales

| Módulo | Archivo | Estado |
|---|---|---|
| Ejemplo base | `tests/example.spec.ts` | ✅ Operativo |
| Login UI | `tests/ui/login.spec.ts` | ✅ Operativo |
| API | `tests/api/` | 🔲 Pendiente |

---

## 3. Tecnología y versiones

| Herramienta / Librería | Versión | Rol |
|---|---|---|
| **Node.js** | (entorno del sistema) | Runtime de ejecución |
| **TypeScript** | ^6.0.3 | Lenguaje de los tests |
| **@playwright/test** | ^1.61.1 | Framework de automatización E2E |
| **@types/node** | ^26.1.0 | Tipado de Node.js para TypeScript |

### Configuración TypeScript (`tsconfig.json`)

| Opción | Valor |
|---|---|
| `target` | `ES2016` |
| `module` | `commonjs` |
| `strict` | `true` |
| `esModuleInterop` | `true` |
| `skipLibCheck` | `true` |

### Scripts npm disponibles (`package.json`)

| Comando | Acción |
|---|---|
| `npm test` | Ejecuta todos los tests con Playwright |
| `npm run test:ui` | Ejecuta únicamente los tests de la carpeta `tests/ui` |
| `npm run test:report` | Abre el reporte HTML generado |

---

## 4. Contratos (si existen)

**No existen contratos formales definidos** (interfaces TypeScript, esquemas JSON, mocks de API) en el estado actual del proyecto. Los tests de UI interactúan directamente con el sitio web real mediante locators de Playwright.

> Cuando se implementen los tests de API en `tests/api/`, se recomienda definir interfaces TypeScript que modelen los payloads de request/response.

---

## 5. Módulos de datos

No existe una capa de datos formal (fixtures, factories, helpers de datos) en el proyecto actual. Los datos de prueba están **embebidos directamente en los tests**:

| Dato | Valor | Ubicación |
|---|---|---|
| URL base | `https://playground.calidadsinhumo.com/login` | `tests/ui/login.spec.ts` |
| Email válido | `ana.garcia@ejemplo.com` | `tests/ui/login.spec.ts` |
| Contraseña válida | `Segura2026!` | `tests/ui/login.spec.ts` |

> ⚠️ **Recomendación**: externalizar los datos de prueba a archivos de fixture (`.json`) o a un archivo `test-data.ts` para facilitar el mantenimiento y evitar hardcoding.

---

## 6. Estándares y convenciones del código

### Locators utilizados

El proyecto sigue las **buenas prácticas de Playwright** priorizando locators semánticos y accesibles:

| Tipo de locator | Uso observado | Ejemplo |
|---|---|---|
| `getByLabel()` | Campos de formulario | `page.getByLabel('Email')` |
| `getByRole()` | Botones y elementos con rol ARIA | `page.getByRole('button', { name: 'Iniciar sesión' })` |
| `getByText()` | Mensajes de confirmación/error | `page.getByText('Has iniciado sesión correctamente.')` |

### Organización de tests

- Se usa `test.describe()` para agrupar casos relacionados.
- Se usa `test.beforeEach()` para lógica de setup compartida (navegación a la URL).
- Un archivo spec por módulo/funcionalidad (ej. `login.spec.ts`).

### Nomenclatura

- Archivos de tests: `kebab-case` con sufijo `.spec.ts` (ej. `login.spec.ts`).
- Nombres de tests: descriptivos en español (ej. `'Login exitoso con credenciales válidas'`).

---

## 7. Riesgos, supuestos y limitaciones

### Riesgos

| ID | Riesgo | Severidad | Observación |
|---|---|---|---|
| R1 | Datos de prueba hardcodeados en los tests | Media | Email y contraseña expuestos en el código fuente |
| R2 | Tests dependientes del entorno externo (playground) | Alta | Si el sitio cae o cambia, todos los tests fallan |
| R3 | Sin tests de API implementados | Alta | La carpeta `tests/api/` está vacía |
| R4 | Sin cobertura de seguridad automatizada | Media | El análisis documenta escenarios de inyección SQL y sesión, pero no están automatizados |
| R5 | Sin integración CI/CD configurada | Media | No existe pipeline (GitHub Actions, etc.) aunque el config contempla variables `CI` |

### Supuestos

- El sitio `playground.calidadsinhumo.com` permanece disponible y estable durante la ejecución de los tests.
- Las credenciales de prueba (`ana.garcia@ejemplo.com` / `Segura2026!`) son válidas y permanentes en el entorno de playground.
- Los tests se ejecutan en modo **headless** sobre **Chromium** (configuración actual en `playwright.config.ts`).

### Limitaciones actuales

- El proyecto solo automatiza la **capa UI** del módulo de Login.
- No existen **Page Objects** ni capas de abstracción; los tests acceden directamente a la página.
- No hay manejo de **variables de entorno** para credenciales o URLs base.
- El reporte disponible es únicamente **HTML** (Playwright built-in); no hay integración con Allure u otras herramientas de reporting.

---

> 📌 **Nota de mantenimiento**: Actualizar este documento después de cada implementación o modificación relevante del proyecto (nuevos módulos, cambios de configuración, incorporación de fixtures, etc.).
