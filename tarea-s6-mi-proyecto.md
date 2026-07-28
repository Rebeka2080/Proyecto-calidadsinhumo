 Tarea S6: Nuevo test de registro en mi proyecto


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


Mi validación línea por línea:

1. ¿Cada acción tiene `await`?  
 Sí, todas las acciones asíncronas (`fill`, `click`, `toBeVisible`) cuentan con su `await` explícito.

2. ¿Los selectores son semánticos o frágiles?  
 Son 100% semánticos se usaron getByLabel, getByRole y getByText, evitando selectores CSS o XPath frágiles.

3. ¿Los datos de prueba tienen sentido para el negocio?
Sí,  se utiliza un nombre valido ("Ana García"), una contraseña segura, una edad dentro del rango permitido ("25") y un email unico y valido

4. El experimento del await
Si le saco los `await`, Playwright intentará ejecutar todas las líneas en paralelo en menos de un milisegundo, haciendo clic en el botón antes de terminar de llenar los campos y convirtiendo la prueba en inestable (flaky) o fallida.

5. UNA cosa que aporté yo y la IA no sabía:

- Priorización de casos de prueba:
La IA me generó una lista larga de casos de prueba, pero fui yo quien tomó la decisión de filtrar y seleccionar únicamente los casos de prueba que considere más importantes e imprescindibles para automatizar.

- Convención estricta de localizadores:
Establecí como prioridad el uso de localizadores semánticos para llenar los campos de formulario en lugar de otros. Si bien la IA había generado algunos de ellos, se detectaron ambigüedades que fueron revisadas y corregidas
