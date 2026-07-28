
**1. CAMINO FELIZ**
* **Login exitoso con cuenta válida de prueba:**
  * **Resultado esperado:** Al ingresar `ana.garcia@ejemplo.com` y `Segura2026!`, aparece en pantalla exactamente el texto "Has iniciado sesión correctamente.", se genera el token de sesión y se carga la vista/URL de la cuenta autenticada.

**2. NEGATIVOS** 
* **Credenciales inválidas por contraseña incorrecta:**
  * **Resultado esperado:** Deniega acceso. Muestra un mensaje de error genérico que NO especifica si el fallo fue el email o la contraseña (evitando enumeración).
* **Credenciales inválidas por email no registrado:**
  * **Resultado esperado:** Deniega acceso. Muestra el MISMO mensaje de error genérico que en el escenario anterior.
* **Formulario con campos vacíos desde la UI:**
  * **Resultado esperado:** Al dejar email o contraseña vacíos e intentar enviar, el front-end bloquea el envío de la petición de red y resalta los campos como obligatorios.

**3 REGRESIÓN**
* **Compatibilidad de contraseña tras un cambio o reseteo:**
  * **Resultado esperado:** Cambiar la contraseña desde otra vista (ej. "Olvidé mi contraseña") y luego intentar iniciar sesión con la NUEVA contraseña resulta en un login exitoso, mientras que la antigua falla.
  