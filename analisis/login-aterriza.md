**1. INTEGRACIÓN** *(Cubre el riesgo ALTO de fallo de comunicación/caída de servicio)*
* **Inicio de sesión con servicio de autenticación caído:**
  * **Resultado esperado:** La interfaz no se congela ni "crashea". Muestra un mensaje de "Servicio no disponible" y en la consola de red (F12) se verifica un código de estado HTTP 503/500 manejado correctamente.
* **Timeout en respuesta de base de datos:**
  * **Resultado esperado:** Si la DB no responde en el tiempo límite, se corta la petición. Se muestra al usuario un aviso para reintentar y la red registra un código 504 (Gateway Timeout).

**2. DATOS** *(Cubre el riesgo ALTO de vulneración, inyección y robo de datos)*
* **Intento de inyección SQL en campo email:**
  * **Resultado esperado:** Ingresando `' OR 1=1 --` el acceso es denegado. La respuesta del servidor es "Credenciales inválidas" o formato inválido, sin revelar errores de sintaxis de base de datos en la respuesta HTTP.
* **Cifrado de credenciales en tránsito:**
  * **Resultado esperado:** Al inspeccionar la petición de login en las herramientas de desarrollo, la URL utiliza `https://` y el payload viaja cifrado de extremo a extremo.

**3. ESTADOS** *(Cubre el riesgo ALTO de gestión insegura de sesión)*
* **Generación y almacenamiento seguro del token de sesión:**
  * **Resultado esperado:** Tras un login exitoso, las herramientas de desarrollo del navegador muestran un token (ej. JWT o SessionID) asignado. Si usa cookies, tienen atributos `HttpOnly` y `Secure`.
* **Navegación a la página de login con sesión ya activa:**
  * **Resultado esperado:** El sistema detecta el estado "logueado" y redirige automáticamente al usuario a su área privada sin pedirle las credenciales nuevamente.

**4. CAMINO FELIZ**
* **Login exitoso con cuenta válida de prueba:**
  * **Resultado esperado:** Al ingresar `ana.garcia@ejemplo.com` y `Segura2026!`, aparece en pantalla exactamente el texto "Has iniciado sesión correctamente.", se genera el token de sesión y se carga la vista/URL de la cuenta autenticada.

**5. NEGATIVOS** *(Cubre el riesgo MEDIO de enumeración y validaciones front-end)*
* **Credenciales inválidas por contraseña incorrecta:**
  * **Resultado esperado:** Deniega acceso. Muestra un mensaje de error genérico que NO especifica si el fallo fue el email o la contraseña (evitando enumeración).
* **Credenciales inválidas por email no registrado:**
  * **Resultado esperado:** Deniega acceso. Muestra el MISMO mensaje de error genérico que en el escenario anterior.
* **Formulario con campos vacíos desde la UI:**
  * **Resultado esperado:** Al dejar email o contraseña vacíos e intentar enviar, el front-end bloquea el envío de la petición de red y resalta los campos como obligatorios.
* **Evasión de UI enviando petición nula al backend:**
  * **Resultado esperado:** Interceptando la petición y enviando payload con `null` o vacío, el servidor responde con un código `400 Bad Request` controlado y un JSON de error de validación, sin generar una excepción interna `500`.

**6. BORDE / LÍMITES**
* **Email con espacios en blanco al inicio o final:**
  * **Resultado esperado:** El sistema "trimmea" (recorta) los espacios automáticamente antes de procesar y permite el login si los datos son correctos.
* **Email válido con longitud máxima permitida por la base de datos:**
  * **Resultado esperado:** La petición se procesa sin arrojar excepciones de truncamiento o desbordamiento de la base de datos. Si las credenciales coinciden, ingresa.

**7. ROLES Y PERMISOS**
* **Intento de login con cuenta desactivada/bloqueada (si aplica):**
  * **Resultado esperado:** El sistema deniega el acceso y muestra un mensaje indicando que la cuenta no está activa (POR CONFIRMAR: si esta regla de negocio existe actualmente).

**8. REGRESIÓN**
* **Compatibilidad de contraseña tras un cambio o reseteo:**
  * **Resultado esperado:** Cambiar la contraseña desde otra vista (ej. "Olvidé mi contraseña") y luego intentar iniciar sesión con la NUEVA contraseña resulta en un login exitoso, mientras que la antigua falla.
