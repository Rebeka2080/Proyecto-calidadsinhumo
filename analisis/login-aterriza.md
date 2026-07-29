Feature: Login de usuario

  # ═══ 1. CAMINO FELIZ ═══

  Scenario: Login exitoso con cuenta válida de prueba
    Given el usuario se encuentra en la página de login
    When ingresa el email "ana.garcia@ejemplo.com" y la contraseña "Segura2026!"
    And hace clic en el botón de iniciar sesión
    Then aparece en pantalla el texto "Has iniciado sesión correctamente."
    And se genera el token de sesión
    And se carga la vista de la cuenta autenticada

  # ═══ 2. NEGATIVOS ═══

  Scenario: Acceso denegado por contraseña incorrecta
    Given el usuario se encuentra en la página de login
    When ingresa el email registrado "ana.garcia@ejemplo.com" y la contraseña incorrecta "Incorrecta123"
    And hace clic en el botón de iniciar sesión
    Then se deniega el acceso
    And se muestra el mensaje "El email o la contraseña son incorrectos."

  Scenario: Acceso denegado por email no registrado
    Given el usuario se encuentra en la página de login
    When ingresa el email no registrado "maria.123@gmail.com" y la contraseña "Segura2026!"
    And hace clic en el botón de iniciar sesión
    Then se deniega el acceso
    And se muestra el mismo mensaje genérico que cuando la contraseña es incorrecta

  Scenario: Bloqueo del envío cuando el campo email está vacío
    Given el usuario se encuentra en la página de login
    When deja el campo email vacío y completa la contraseña con "Segura2026!"
    And intenta enviar el formulario
    Then el front-end bloquea el envío de la petición de red
    And el campo email queda resaltado como obligatorio

  Scenario: Bloqueo del envío cuando el campo contraseña está vacío
    Given el usuario se encuentra en la página de login
    When completa el email con "ana.garcia@ejemplo.com" y deja el campo contraseña vacío
    And intenta enviar el formulario
    Then el front-end bloquea el envío de la petición de red
    And el campo contraseña queda resaltado como obligatorio

  Scenario: Bloqueo del envío cuando ambos campos están vacíos
    Given el usuario se encuentra en la página de login
    When deja el campo email y el campo contraseña vacíos
    And intenta enviar el formulario
    Then el front-end bloquea el envío de la petición de red
    And ambos campos quedan resaltados como obligatorios

  Scenario: Acceso denegado por formato de email inválido
    Given el usuario se encuentra en la página de login
    When ingresa el email con formato inválido "ana.garcia123" y la contraseña "Segura2026!"
    And hace clic en el botón de iniciar sesión
    Then el front-end bloquea el envío antes de hacer la petición de red
    And se muestra un mensaje indicando que el formato del email no es válido

  # ═══ 3. REGRESIÓN ═══

  Background: El usuario ha reseteado su contraseña
    Given el usuario solicitó un reseteo desde la vista "Olvidé mi contraseña"
    And completó el flujo y estableció la nueva contraseña "NuevaSegura2026!"

  Scenario: Login exitoso con nueva contraseña tras un reseteo
    Given el usuario se encuentra en la página de login
    When ingresa el email "ana.garcia@ejemplo.com" y la nueva contraseña "NuevaSegura2026!"
    And hace clic en el botón de iniciar sesión
    Then el acceso es concedido
    And se carga la vista de la cuenta autenticada

  Scenario: Login fallido con contraseña antigua tras un reseteo
    Given el usuario se encuentra en la página de login
    When ingresa el email "ana.garcia@ejemplo.com" y la contraseña anterior "Segura2026!"
    And hace clic en el botón de iniciar sesión
    Then se deniega el acceso
    And se muestra el mensaje genérico de credenciales incorrectas