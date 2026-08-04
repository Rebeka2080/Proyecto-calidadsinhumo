Feature: Registro de usuario

  # ═══ 1. CAMINO FELIZ ═══

  Scenario: Registro exitoso con datos válidos
    Given el usuario se encuentra en la página de registro
    When el usuario completa todos los campos con datos válidos ("Ana García", "ana@ejemplo.com", "Segura2026!", "25")
    And hace clic en el botón "Crear cuenta"
    Then el formulario se procesa correctamente
    And se muestra el mensaje de éxito "Cuenta creada exitosamente" en la UI

  # ═══ 2. NEGATIVOS ═══

  Scenario: Bloqueo de registro al enviar formulario con todos los campos vacíos
    Given el usuario se encuentra en la página de registro
    When el usuario deja todos los campos vacíos
    And hace clic en el botón "Crear cuenta"
    Then el sistema bloquea la acción
    And los campos obligatorios se resaltan visualmente

  Scenario: Error al ingresar una contraseña inferior al mínimo requerido
    Given el usuario se encuentra en la página de registro
    When el usuario completa el formulario con datos válidos
    But ingresa una contraseña con 7 caracteres
    And hace clic en el botón "Crear cuenta"
    Then el registro se bloquea
    And aparece un mensaje de error explícito indicando "Mínimo 8 caracteres"

  Scenario: Error al ingresar un email con formato inválido
    Given el usuario se encuentra en la página de registro
    When el usuario ingresa en el campo email un texto sin arroba ni dominio como "anaejemplo.com"
    Then el campo lanza un error de formato de correo
    And no se procesa el registro

  Scenario: Error por intentar registrar un email duplicado
    Given el usuario se encuentra en la página de registro
    And el email "ana@ejemplo.com" ya está registrado en el sistema
    When el usuario completa el formulario utilizando el email "ana@ejemplo.com"
    And hace clic en el botón "Crear cuenta"
    Then la acción se bloquea
    And se muestra el mensaje de error "Este email ya está en uso"

  Scenario: Error por no cumplir con la complejidad de la contraseña
    Given el usuario se encuentra en la página de registro
    When el usuario completa el formulario
    But ingresa una contraseña sin mayúsculas ni números como "segurasegura"
    And hace clic en el botón "Crear cuenta"
    Then el registro se bloquea
    And se muestra un mensaje indicando que la contraseña debe incluir al menos una mayúscula y un número

  # ═══ 3. DATOS ═══

  Scenario: Bloqueo de caracteres no numéricos y edades no válidas
    Given el usuario se encuentra en la página de registro
    When el usuario intenta ingresar letras o caracteres especiales en el campo "Edad"
    Then el campo bloquea el ingreso de dichos caracteres
    When el usuario ingresa un valor negativo o cero como "-5" o "0"
    And hace clic en el botón "Crear cuenta"
    Then el sistema muestra un error de edad no válida

  # ═══ 4. REGRESIÓN ═══

  Scenario: Navegación correcta al enlace de Iniciar Sesión
    Given el usuario se encuentra en la página de registro
    When el usuario hace clic en el enlace "¿Ya tienes cuenta? Inicia sesión"
    Then el navegador redirige a la URL de login correcta
    And no se generan errores en consola
    And no se pierde la navegación de la aplicación
