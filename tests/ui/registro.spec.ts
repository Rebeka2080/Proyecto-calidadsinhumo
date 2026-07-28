import { test, expect } from '@playwright/test';

test.describe('Registro - Creación de Cuenta', () => {
  const urlRegistro = 'https://playground.calidadsinhumo.com/registro';

  test.beforeEach(async ({ page }) => {
    await page.goto(urlRegistro);
  });

  test('CP-REG-01: Formulario con todos los campos vacíos', async ({ page }) => {
    const btnSubmit = page.getByRole('button', { name: 'Crear cuenta' });
    
    // Hacemos clic sin llenar ningún dato
    await btnSubmit.click();
    
    // Validamos que se bloquee la acción y resalte que los campos son obligatorios
    await expect(page.getByText('El nombre es obligatorio').first()).toBeVisible();
  });

  test('CP-REG-02: Contraseña inferior al mínimo requerido', async ({ page }) => {
    await page.getByLabel('Nombre').fill('Ana García');
    await page.getByLabel('Email').fill('ana@ejemplo.com');
    await page.getByLabel('Edad').fill('25');
    
    // Contraseña de 7 caracteres (inferior al mínimo de 8)
    await page.getByLabel('Contraseña').fill('1234567');
    
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    
    // Validamos mensaje explícito de longitud de contraseña
    await expect(page.getByText('La contraseña debe tener al menos 8 caracteres')).toBeVisible();
  });

  test('CP-REG-03: Email con formato inválido', async ({ page }) => {
    await page.getByLabel('Nombre').fill('Ana García');
    // Email sin arroba ni dominio
    await page.getByLabel('Email').fill('anaejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('25');
    
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    
    // Validamos mensaje de error de formato de correo
    await expect(page.getByText('El email no tiene un formato válido').first()).toBeVisible();
  });

  test('CP-REG-04: Edad con caracteres no numéricos o negativos', async ({ page }) => {
    await page.getByLabel('Nombre').fill('Ana García');
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');
    // Edad no válida (valor negativo)
    await page.getByLabel('Edad').fill('-5');
    
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    
    // Validamos mensaje de error para edad no válida
    await expect(page.getByText('Debes tener al menos 16 años').first()).toBeVisible();
  });

  test('CP-REG-05: Registro exitoso con datos válidos (Camino Feliz)', async ({ page }) => {
    const emailUnico = `ana.garcia.${Date.now()}@ejemplo.com`;

    await page.getByLabel('Nombre').fill('Ana García');
    await page.getByLabel('Email').fill(emailUnico);
    await page.getByLabel('Contraseña').fill('Segura2026!');
    await page.getByLabel('Edad').fill('25');
    
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    
    // Validamos mensaje de éxito en la UI
    await expect(page.getByText('¡Registro exitoso! Tu cuenta ha sido creada.')).toBeVisible();
  });

  test('CP-REG-06: Navegación correcta al enlace de Iniciar Sesión', async ({ page }) => {
    // Hacemos clic de forma exacta en el enlace para ir a la vista de login
    await page.getByRole('link', { name: 'Inicia sesión', exact: true }).click();
    
    // Validamos que redirija correctamente a la URL de login
    await expect(page).toHaveURL(/.*login/);
  });
});
