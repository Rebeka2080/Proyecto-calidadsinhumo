# Tarea S9 — Mi quality gate corriendo

## Los casos que probé

**1. CAMINO FELIZ**
- **Login exitoso con cuenta válida de prueba**
  - Ingresar `ana.garcia@ejemplo.com` y `Segura2026!`
  - Resultado esperado: aparece en pantalla exactamente el texto "Has iniciado sesión correctamente.", se genera el token de sesión y se carga la vista/URL de la cuenta autenticada.

**2. NEGATIVOS**
- **Credenciales inválidas por contraseña incorrecta**
  - Ingresar email registrado `ana.garcia@ejemplo.com` y contraseña incorrecta
  - Resultado esperado: deniega acceso, muestra mensaje de error genérico que NO especifica si el fallo fue el email o la contraseña.

- **Credenciales inválidas por email no registrado**
  - Ingresar email no registrado y una contraseña válida
  - Resultado esperado: deniega acceso, muestra el MISMO mensaje de error genérico que en el escenario anterior.

- **Formulario con campos vacíos desde la UI**
  - Dejar email o contraseña vacíos e intentar enviar
  - Resultado esperado: el front-end bloquea el envío de la petición de red y resalta los campos como obligatorios.

**3. REGRESIÓN**
- **Compatibilidad de contraseña tras un cambio o reseteo**
  - Cambiar la contraseña desde otra vista (ej. "Olvidé mi contraseña")
  - Resultado esperado: login con la NUEVA contraseña es exitoso, login con la antigua falla.

---

## El veredicto del juez

### Tabla de puntaje

| Criterio | Puntuación | Argumento |
|---|:---:|---|
| **Cobertura** | 2 | Hay camino feliz, negativos de credenciales y regresión. Faltan: sesión activa/concurrente, bloqueo por intentos, token expirado, acceso sin JS, CSRF. |
| **Claridad** | 3 | Los resultados esperados son concretos y verificables (texto exacto, mismo mensaje, bloqueo de red). No hay ambigüedad en lo que está escrito. |
| **Casos límite** | 1 | No hay bordes: sin límite de intentos, sin contraseñas en el límite de longitud, sin caracteres especiales, sin espacios en blanco al inicio/fin, sin email con mayúsculas. |
| **Gherkin** | 2 | La traducción es correcta y los pasos son atómicos. El Caso 2 no especifica qué email registrado usa → dato POR CONFIRMAR. |

**PUNTAJE TOTAL: 8 → 🟡 REVISAR**

### Qué falta

Casos ausentes:

| # | Caso | Estado |
|---|---|---|
| F1 | Bloqueo por intentos fallidos — ¿se bloquea la cuenta o el IP tras N intentos? ¿Cuántos? | POR CONFIRMAR |
| F2 | Contraseña en el límite de longitud — ¿longitud mínima/máxima? | Borde crítico |
| F3 | Email con formato inválido (ej. sinArroba, @sindominio) | Validación de formato |
| F4 | Espacios en blanco en email o contraseña — ¿se trimean o fallan? | Por definir |
| F5 | Sesión ya activa — ¿qué pasa si ya hay sesión abierta en otra pestaña? | Por definir |
| F6 | Token expirado — ¿qué ocurre si el usuario intenta acceder con una sesión vencida? | Por definir |

### Veredicto final

Los casos que hay están bien escritos, pero es una cobertura básica. La parte de casos límite está vacía. Antes de subir a verde, revisar al menos los ítems F2 y F3 de la lista de faltantes.

---

## El caso que agregué yo (en Gherkin)

```gherkin
Scenario: Acceso denegado por formato de email inválido
  Given el usuario se encuentra en la página de login
  When ingresa el email "ana.garcia123" y la contraseña "Segura2026!"
  And hace clic en el botón de iniciar sesión
  Then se deniega el acceso
  And se muestra un mensaje de error genérico que no especifica si el fallo fue el email o la contraseña
```

---

## En una frase: ¿qué encontró tu rúbrica que la IA, sola, no habría visto?

Que tenía casos límite completamente ausentes — las reglas de negocio sobre longitud de contraseña, trimado de espacios, formato de email y comportamiento ante múltiples intentos nunca se cuestionaron porque no estaban en el test, pero el juez los detectó como un hueco de cobertura crítico.
