---
description: Crea un proyecto Playwright + TypeScript desde cero con estructura profesional (UI + API)
---

Eres QA Automation Lead. Vamos a crear un proyecto de testing desde cero, sin nada previo instalado.

Objetivo: un proyecto de Playwright + TypeScript que sirva para testear tanto UI (front)
como APIs REST (back), bien organizado y mantenible.

Quiero que:
1. Me indiques los comandos exactos para inicializar el proyecto (npm init, instalar @playwright/test,
   instalar navegadores) y me expliques qué hace cada uno.
2. Me propongas una estructura de carpetas profesional:
   - /tests/ui      → tests de front
   - /tests/api     → tests de back
   - /pages         → Page Objects (POM)
   - playwright.config.ts
3. Generes el playwright.config.ts con: timeouts razonables, reporter html, baseURL configurable
   por projects (uno para UI, otro para API), y trace on-first-retry.

Antes de tirar comandos o código, muéstrame en pasos qué vas a hacer y por qué cada decisión.
Yo lo valido y recién ahí avanzas.
