**1. NEGATIVOS** *(Cubre el riesgo ALTO de evasión de reglas de negocio)*
* **Formulario con todos los campos vacíos:**
  * **Resultado esperado:** Al hacer clic en "Crear cuenta", la acción se bloquea y se resalta visualmente (ej. bordes rojos o texto) que los campos son obligatorios.
* **Contraseña inferior al mínimo requerido:**
  * **Resultado esperado:** Al ingresar una contraseña de 7 caracteres y enviar, el registro se bloquea y aparece un mensaje de error explícito indicando "Mínimo 8 caracteres".
* **Email con formato inválido:**
  * **Resultado esperado:** Al ingresar texto sin arroba ni dominio (ej. `anaejemplo.com`), el campo lanza un error de formato de correo y no procesa el registro.

**2. DATOS** *(Cubre los riesgos de Seguridad XSS y valores ilógicos)*
* **Inyección de código malicioso (XSS) en Nombre:**
  * **Resultado esperado:** Al enviar el formulario con un valor como `<script>alert('XSS')</script>`, el sistema bloquea el registro o, en caso de permitirlo, muestra el nombre escapado como texto plano, sin ejecutar alertas ni alterar el DOM.
* **Edad con caracteres no numéricos o negativos:**
  * **Resultado esperado:** El campo "Edad" bloquea el ingreso de letras o caracteres especiales, y al intentar enviar un valor como `-5` o `0`, muestra un error de edad no válida.

**3. CAMINO FELIZ**
* **Registro exitoso con datos válidos:**
  * **Resultado esperado:** Completando todos los campos con datos reales (ej. "Ana García", "ana@ejemplo.com", "Segura2026!", "25") y al presionar "Crear cuenta", el formulario procesa y muestra el mensaje de éxito (ej. "Cuenta creada exitosamente") en la UI.

**4. BORDE / LÍMITES**
* **Contraseña en el límite exacto (8 caracteres):**
  * **Resultado esperado:** El sistema reconoce el límite inferior como válido y permite la creación de la cuenta sin mostrar el error de "Mínimo 8 caracteres".
* **Espacios en blanco al inicio/final del Email o Nombre:**
  * **Resultado esperado:** El front-end limpia (trim) automáticamente los espacios sobrantes y procesa la información de forma correcta, permitiendo el registro.

**5. ESTADOS**
* **Persistencia de estado al refrescar (F5):**
  * **Resultado esperado:** Si el usuario completa la mitad del formulario y recarga la página, los campos se reinician (limpian) evitando el envío accidental de información residual.

**6. REGRESIÓN**
* **Navegación correcta al enlace de Iniciar Sesión:**
  * **Resultado esperado:** Al hacer clic en el enlace inferior "¿Ya tienes cuenta? Inicia sesión", el navegador redirige a la URL de login correcta sin generar errores en consola ni perder la navegación de la aplicación.
