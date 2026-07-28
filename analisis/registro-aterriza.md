**1. NEGATIVOS** *(Cubre el riesgo ALTO de evasión de reglas de negocio)*

* **Formulario con todos los campos vacíos:**
  * **Resultado esperado:** Al hacer clic en "Crear cuenta", la acción se bloquea y se resalta visualmente (ej. bordes rojos o texto) que los campos son obligatorios.

* **Contraseña inferior al mínimo requerido:**
  * **Resultado esperado:** Al ingresar una contraseña de 7 caracteres y enviar, el registro se bloquea y aparece un mensaje de error explícito indicando "Mínimo 8 caracteres".

* **Email con formato inválido:**
  * **Resultado esperado:** Al ingresar texto sin arroba ni dominio (ej. `anaejemplo.com`), el campo lanza un error de formato de correo y no procesa el registro.

**2. DATOS** 
* **Edad con caracteres no numéricos o negativos:**
  * **Resultado esperado:** El campo "Edad" bloquea el ingreso de letras o caracteres especiales, y al intentar enviar un valor como `-5` o `0`, muestra un error de edad no válida.

**3. CAMINO FELIZ**
* **Registro exitoso con datos válidos:**
  * **Resultado esperado:** Completando todos los campos con datos reales (ej. "Ana García", "ana@ejemplo.com", "Segura2026!", "25") y al presionar "Crear cuenta", el formulario procesa y muestra el mensaje de éxito (ej. "Cuenta creada exitosamente") en la UI.

**4. REGRESIÓN**
* **Navegación correcta al enlace de Iniciar Sesión:**
  * **Resultado esperado:** Al hacer clic en el enlace inferior "¿Ya tienes cuenta? Inicia sesión", el navegador redirige a la URL de login correcta sin generar errores en consola ni perder la navegación de la aplicación.
