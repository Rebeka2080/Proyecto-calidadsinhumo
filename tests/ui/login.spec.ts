import { test, expect } from '@playwright/test';

test.describe('Login - Inicio de Sesión', () => {
  // ───── PREPARAR (Arrange) ─────
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('CP-LOG-01: Login exitoso con cuenta válida de prueba', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test('CP-LOG-02: Acceso denegado por contraseña incorrecta', async ({ page }) => {
    // ───── ACTUAR (Act) ────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Incorrecta123');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
  });

  test('CP-LOG-03: Acceso denegado por email no registrado', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('maria.123@gmail.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
  });

  test('CP-LOG-04: Bloqueo del envío cuando el campo email está vacío', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    // Verificar que el navegador bloquea por campo requerido (validación nativa HTML5 o UI custom)
    // Asumimos que el formulario no se envía
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-05: Bloqueo del envío cuando el campo contraseña está vacío', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-06: Bloqueo del envío cuando ambos campos están vacíos', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    // Campos vacíos por defecto

    // ───── ACTUAR (Act) ─────
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page).toHaveURL('/login');
  });

  test('CP-LOG-07: Acceso denegado por formato de email inválido', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia123');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    // El navegador suele bloquear y mostrar un popup del input type email
    await expect(page).toHaveURL('/login');
  });

  test.skip('CP-LOG-08: Login exitoso con nueva contraseña tras un reseteo', async ({ page }) => {

    // ───── PREPARAR (Arrange) ─────
    // Asumimos que el reset ya ocurrió como precondición en el entorno

    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('NuevaSegura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // //───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test.skip('CP-LOG-09: Login fallido con contraseña antigua tras un reseteo', async ({ page }) => {
    //───── ACTUAR (Act) ─────
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('El email o la contraseña son incorrectos.')).toBeVisible();
  });
});

