# Tarea S12 - Tercer Test Login + Cuenta de la Repetición

## Tests de Login

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login - Inicio de Sesión', () => {
  // ───── PREPARAR (Arrange) ─────
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('CP-LOG-01: Login exitoso con cuenta válida de prueba', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test('CP-LOG-02: Login fallido por contraseña incorrecta', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Incorrecta123');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-03: Acceso denegado por email no registrado', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('maria.123@gmail.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-04: Bloqueo del envío cuando el campo email está vacío', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('El email es obligatorio')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-05: Bloqueo del envío cuando el campo contraseña está vacío', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('La contraseña es obligatoria')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-06: Bloqueo del envío cuando ambos campos están vacíos', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('El email es obligatorio')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-07: Acceso denegado por formato de email inválido', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia123');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
```

---

## Mi cuenta para S12

```typescript
// MI CUENTA PARA S12:
// Escribí page.goto('/login') _7_ veces.
// Llené el email _6_ veces.
// Clickeé el botón 'Iniciar sesión' _7_ veces.
//
// PREGUNTA: si mañana el botón 'Iniciar sesión' cambia de nombre
// (por ejemplo pasa a llamarse 'Entrar'), ¿en cuántos lugares
// tendría que tocar mi código para que los tests sigan andando?
// Mi respuesta: _7__
```
