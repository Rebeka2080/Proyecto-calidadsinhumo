# S11 – Análisis de Tests de Registro Fallidos

## Contexto

Durante la ejecución de la suite de tests automatizados con Playwright, **4 tests del formulario de registro fallaron**. A continuación se detalla qué ocurrió, por qué falló y cómo se resolvió.

---

## ¿Qué falló?

Los tests fallaron porque los mensajes de validación que buscaban en la pantalla **no coincidían** con los que la aplicación mostraba realmente.

Playwright intentaba encontrar estos textos en el DOM y no los encontraba:

| Test | Texto buscado por el test |
|---|---|
| CP-REG-01 | `'Cuenta creada exitosamente'` |
| CP-REG-03 | `'Mínimo 8 caracteres'` |
| CP-REG-05 | `'Este email ya está en uso'` |
| CP-REG-06 | `'debe incluir al menos una mayúscula y un número'` |

---

## ¿Por qué falló?

El problema fue el **hardcodeo de textos**: los mensajes estaban escritos de forma fija y literal en el código del test. Si la aplicación muestra un texto aunque sea levemente diferente (distinta redacción, mayúsculas, signos de puntuación), Playwright no lo encuentra y el test falla.

El patrón de error fue consistente en todos los casos:

```
Error: expect(locator).toBeVisible() failed
Locator: getByText('...')
Expected: visible
Error: element(s) not found
```

Esto indica que los textos hardcodeados en los tests **no matcheaban** lo que realmente renderizaba la aplicación. Lo más probable es que los mensajes de validación de la app sean distintos a los que se escribieron originalmente en los tests.

---

## ¿Cómo se resolvió?

1. Se abrió el **Playwright HTML Report** para ver los screenshots del momento exacto del fallo y observar los textos reales que mostraba la app.

2. Se identificaron los textos correctos que muestra la UI.

3. Se actualizaron los **locators** en cada test con el texto exacto que usa la aplicación.

4. Se volvieron a ejecutar los tests → todos pasaron ✅

---

