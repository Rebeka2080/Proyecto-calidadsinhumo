import { test, expect } from '@playwright/test';

test.describe('Registro de Usuario', () => {
  // ───── PREPARAR (Arrange) ─────
  test.beforeEach(async ({ page }) => {
    await page.goto('/registro');
  });

  test('CP-REG-01: Registro exitoso con datos válidos', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Ana García');
    await page.getByLabel('Email').fill(`ana.garcia.${Date.now()}@ejemplo.com`); // Email dinámico
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('25');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('¡Registro exitoso! Tu cuenta ha sido creada.')).toBeVisible();
  });

  test('CP-REG-02: Bloqueo de registro al enviar formulario con todos los campos vacíos', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    // Dejamos los campos vacíos por defecto

    // ───── ACTUAR (Act) ─────
    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    // Validamos que el formulario no avance
    await expect(page).toHaveURL('/registro');
  });

  test('CP-REG-03: Error al ingresar una contraseña inferior al mínimo requerido', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Ana García');
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Corta1!'); // 7 caracteres
    await page.getByLabel('Edad').fill('25');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres')).toBeVisible();
  });

  test('CP-REG-04: Error al ingresar un email con formato inválido', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Ana García');
    await page.getByLabel('Email').fill('anaejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('25');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page).toHaveURL('/registro');
  });

  test('CP-REG-05: Error por intentar registrar un email duplicado', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Usuario Duplicado');
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com'); // Correo ya existente
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('25');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('Este email ya está registrado')).toBeVisible();
  });


  test.skip('CP-REG-06: Error por no cumplir con la complejidad de la contraseña', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Ana García');
    await page.getByLabel('Email').fill('ana.garcia2@ejemplo.com');
    await page.getByLabel('Contraseña').fill('segurasegura'); // Sin mayúscula ni número
    await page.getByLabel('Edad').fill('25');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page.getByText('debe incluir al menos una mayúscula y un número')).toBeVisible();
  });

  test('CP-REG-07: Bloqueo de caracteres no numéricos y edades no válidas', async ({ page }) => {
    // ───── ACTUAR (Act) ─────
    await page.getByLabel('Nombre completo').fill('Ana García');
    await page.getByLabel('Email').fill('ana.garcia3@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('-5');

    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // ───── VERIFICAR (Assert) ─────
    // Puede variar dependiendo si la UI limpia el campo o si deja enviar y el backend falla
    // En el Gherkin se menciona "error de edad no válida"
    await expect(page.getByText('Debes tener al menos 16 años')).toBeVisible();
  });

  test('CP-REG-08: Navegación correcta al enlace de Iniciar Sesión', async ({ page }) => {
    // ───── PREPARAR (Arrange) ─────
    const linkLogin = page.getByRole('link', { name: 'Inicia sesión' });

    // ───── ACTUAR (Act) ─────
    await linkLogin.click();

    // ───── VERIFICAR (Assert) ─────
    await expect(page).toHaveURL('/login');
  });
});
