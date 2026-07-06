import { test, expect } from '@playwright/test';

test.describe('Registro de Cuenta', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.calidadsinhumo.com/registro');
  });

  test('CP-REG-01: Formulario con todos los campos vacíos', async ({ page }) => {
    const btnSubmit = page.locator('button[data-testid="register-submit"]');
    
    // Hacemos clic sin llenar ningún dato
    await btnSubmit.click();
    
    // Validaciones de mensajes de error esperados (usamos getByText como acordamos)
    // Ajustaremos los textos exactos si los test fallan.
    await expect(page.getByText('El nombre es obligatorio').first()).toBeVisible();
  });

  test('CP-REG-02: Contraseña inferior al mínimo requerido', async ({ page }) => {
    // Llenamos los demás campos con datos válidos
    await page.locator('[data-testid="register-name"]').fill('Ana García');
    await page.locator('[data-testid="register-email"]').fill('ana@ejemplo.com');
    await page.locator('[data-testid="register-age"]').fill('25');
    
    // Contraseña de 7 caracteres (corta)
    await page.locator('[data-testid="register-password"]').fill('1234567');
    
    await page.locator('button[data-testid="register-submit"]').click();
    
    // Validamos que aparezca el mensaje de error por la longitud
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres')).toBeVisible();
  });

  test('CP-REG-06: Registro exitoso con datos válidos (Camino Feliz)', async ({ page }) => {
    await page.locator('[data-testid="register-name"]').fill('Ana García');
    await page.locator('[data-testid="register-email"]').fill('ana@ejemplo.com');
    await page.locator('[data-testid="register-password"]').fill('Segura2026!');
    await page.locator('[data-testid="register-age"]').fill('25');
    
    await page.locator('button[data-testid="register-submit"]').click();
    
    // Validación de éxito
    await expect(page.getByText('¡Registro exitoso! Tu cuenta ha sido creada.')).toBeVisible();
  });

  test('CP-REG-07: Contraseña en el límite exacto (8 caracteres)', async ({ page }) => {
    await page.locator('[data-testid="register-name"]').fill('Carlos Perez');
    await page.locator('[data-testid="register-email"]').fill('carlos@ejemplo.com');
    
    // Contraseña exactamente de 8 caracteres
    await page.locator('[data-testid="register-password"]').fill('12345678');
    await page.locator('[data-testid="register-age"]').fill('30');
    
    await page.locator('button[data-testid="register-submit"]').click();
    
    // Validación de éxito
    await expect(page.getByText('¡Registro exitoso! Tu cuenta ha sido creada.')).toBeVisible();
  });
});
