import { test, expect } from '@playwright/test';

test.describe('Login de Academia sin Humo', () => {
  const url = 'https://playground.calidadsinhumo.com/login';

  test.beforeEach(async ({ page }) => {
    // Navegar a la página de login antes de cada test
    await page.goto(url);
  });

  test('Login exitoso con credenciales válidas', async ({ page }) => {
    // Llenar campos utilizando locators semánticos (getByLabel)
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    
    // Clic en el botón utilizando locator semántico (getByRole)
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Validar el mensaje de éxito (getByText)
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test('Login fallido con contraseña incorrecta', async ({ page }) => {
    // Llenar campos con email válido pero clave incorrecta
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('ClaveIncorrecta123!');
    
    // Clic en el botón
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Validar que aparece un mensaje de error 
    // Como el mensaje exacto puede variar, buscamos cualquier elemento con rol alert
    // o un texto genérico de error de credenciales.
    await expect(page.getByRole('alert').or(page.getByText(/error|incorrecto/i))).toBeVisible();
  });

  test('Formulario no se envía con campos vacíos', async ({ page }) => {
    // Hacemos clic directamente en el botón de iniciar sesión sin llenar nada
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Como los campos están vacíos y suelen tener validación nativa (required),
    // el formulario no se enviará y la URL debe permanecer en el login.
    await expect(page).toHaveURL(/.*login/);
    
    // También podemos validar que los mensajes de éxito/error del backend no estén visibles
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeHidden();
  });
});
