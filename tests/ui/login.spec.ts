import { test, expect } from '@playwright/test';

test.describe('Login - Inicio de Sesión', () => {
  const urlLogin = 'https://playground.calidadsinhumo.com/login';

  test.beforeEach(async ({ page }) => {
    await page.goto(urlLogin);
  });

  test('CP-LOG-01: Login exitoso con cuenta válida de prueba (Camino Feliz)', async ({ page }) => {
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    
    // Validamos que aparezca el mensaje de éxito y la sesión quede autenticada
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test('CP-LOG-02: Credenciales inválidas por contraseña incorrecta', async ({ page }) => {
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('ClaveErronea123!');
    
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    
    // Validamos mensaje de error genérico (sin revelar si falló email o clave)
    await expect(page.getByRole('alert').or(page.getByText(/error|incorrecto/i))).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeHidden();
  });

  test('CP-LOG-03: Credenciales inválidas por email no registrado', async ({ page }) => {
    await page.getByLabel('Email').fill('no.registrado@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    
    // Validamos que muestre el mismo error genérico
    await expect(page.getByRole('alert').or(page.getByText(/error|incorrecto/i))).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeHidden();
  });

  test('CP-LOG-04: Formulario con campos vacíos desde la UI', async ({ page }) => {
    const btnSubmit = page.getByRole('button', { name: 'Iniciar sesión' });
    
    // Hacemos clic sin completar los campos
    await btnSubmit.click();
    
    // Validamos que se mantenga en la página y no procese el ingreso
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeHidden();
  });
});
