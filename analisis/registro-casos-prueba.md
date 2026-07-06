# Casos de Prueba - Registro de Cuenta (Formato ISTQB & Gherkin)

## CP-REG-01: Formulario con todos los campos vacíos
**Objetivo:** Verificar que el sistema valide la obligatoriedad de los campos e impida el registro sin datos.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
Feature: Registro de Estudiante

  Scenario: Intento de registro con todos los campos vacíos
    Given que el usuario está en la página de Crear Cuenta
    When el usuario deja todos los campos en blanco
    And hace clic en el botón "Crear cuenta"
    Then el sistema bloquea la acción de registro
    And muestra mensajes de error visuales indicando que los campos son requeridos
```

## CP-REG-02: Contraseña inferior al mínimo requerido
**Objetivo:** Asegurar que el sistema no permita el registro con una contraseña insegura (menor a 8 caracteres).
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Intento de registro con contraseña corta
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa un nombre, email y edad válidos
    And ingresa una contraseña de "7" caracteres
    And hace clic en el botón "Crear cuenta"
    Then el sistema bloquea la acción de registro
    And muestra un mensaje de error indicando que la contraseña requiere un mínimo de 8 caracteres
```

## CP-REG-03: Email con formato inválido
**Objetivo:** Comprobar que el campo de correo electrónico requiere una estructura válida (incluyendo '@' y dominio).
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Intento de registro con formato de email inválido
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa un email sin formato válido (ej. "anaejemplo.com")
    And completa los demás campos con datos válidos
    And hace clic en el botón "Crear cuenta"
    Then el sistema bloquea la acción de registro
    And el campo email muestra un error de validación de formato
```

## CP-REG-04: Inyección de código malicioso (XSS) en Nombre
**Objetivo:** Verificar que el sistema escapa los caracteres especiales en las entradas para prevenir ataques de Cross-Site Scripting.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Ingreso de script malicioso en campo de texto
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa "<script>alert('XSS')</script>" en el campo Nombre
    And completa los demás campos con datos válidos
    And hace clic en el botón "Crear cuenta"
    Then el sistema trata la entrada como texto plano
    And no ejecuta el script malicioso en el navegador
```

## CP-REG-05: Edad con caracteres no numéricos o negativos
**Objetivo:** Asegurar que el campo de edad solo acepte valores numéricos enteros positivos y lógicos.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Intento de registro con edad no válida
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa un valor negativo "-5" en el campo Edad
    And completa los demás campos con datos válidos
    And hace clic en el botón "Crear cuenta"
    Then el sistema bloquea la acción de registro
    And muestra un mensaje de error de edad no válida
```

## CP-REG-06: Registro exitoso con datos válidos (Camino Feliz)
**Objetivo:** Verificar que un usuario puede crear una cuenta proporcionando datos correctos que cumplen todas las reglas.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Registro exitoso de cuenta
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa "Ana García" en el campo Nombre
    And ingresa "ana@ejemplo.com" en el campo Email
    And ingresa la contraseña "Segura2026!"
    And ingresa "25" en el campo Edad
    And hace clic en el botón "Crear cuenta"
    Then el formulario se envía correctamente
    And se muestra un mensaje confirmando que la cuenta fue creada exitosamente
```

## CP-REG-07: Contraseña en el límite exacto (8 caracteres)
**Objetivo:** Validar el comportamiento de frontera (Límites) de la contraseña, aceptando exactamente 8 caracteres.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Registro con contraseña de límite inferior
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa un nombre, email y edad válidos
    And ingresa una contraseña de exactamente 8 caracteres (ej. "12345678")
    And hace clic en el botón "Crear cuenta"
    Then el formulario se envía correctamente
    And se muestra un mensaje confirmando que la cuenta fue creada exitosamente
```

## CP-REG-08: Espacios en blanco al inicio/final del Email o Nombre
**Objetivo:** Confirmar que el sistema aplica un "trim" a los campos de texto, eliminando espacios residuales sin generar errores.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Ingreso de datos con espacios en blanco residuales
    Given que el usuario está en la página de Crear Cuenta
    When el usuario ingresa un email con espacios al inicio y final (ej. " ana@ejemplo.com ")
    And completa los demás campos con datos válidos
    And hace clic en el botón "Crear cuenta"
    Then el sistema elimina los espacios residuales
    And el formulario se envía correctamente
```

## CP-REG-09: Persistencia de estado al refrescar (F5)
**Objetivo:** Verificar que al recargar la página, los datos ingresados no se envíen accidentalmente y el formulario vuelva a su estado inicial.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta y el formulario está parcialmente completado.

```gherkin
  Scenario: Recarga de la página durante el registro
    Given que el usuario está en la página de Crear Cuenta
    And ha completado los campos "Nombre" y "Email"
    When el usuario recarga o refresca la página web
    Then todos los campos del formulario se muestran vacíos
    And no se envía ninguna solicitud de creación de cuenta
```

## CP-REG-10: Navegación correcta al enlace de Iniciar Sesión
**Objetivo:** Comprobar el correcto funcionamiento de los enlaces internos de la interfaz.
**Precondición:** El usuario se encuentra en la página de Crear Cuenta.

```gherkin
  Scenario: Redirección hacia la pantalla de inicio de sesión
    Given que el usuario está en la página de Crear Cuenta
    When el usuario hace clic en el enlace "¿Ya tienes cuenta? Inicia sesión"
    Then es redirigido a la página de Inicio de Sesión
    And no ocurren errores de navegación en la consola del navegador
```
