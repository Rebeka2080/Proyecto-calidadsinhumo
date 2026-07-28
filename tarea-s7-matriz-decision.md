# Tarea S7 — Mi matriz de decisión de automatización

## Mi lista de candidatos

| # | Candidato |
|---|-----------|
| CP-01 | Login con usuario y contraseña válidos → entra y ve su panel |
| CP-02 | Login con contraseña incorrecta → no entra, muestra error |
| CP-03 | API: POST /auth devuelve token con credenciales válidas |
| CP-04 | API: POST /booking crea una reserva y devuelve los datos correctos |
| CP-05 | API: PUT /booking/:id SIN token → debe devolver 403 (seguridad) |
| CP-06 | Verificar que el botón "Iniciar sesión" es de color azul |
| CP-07 | Probar el nuevo banner promocional de la home (campaña de 2 semanas, copy cambia casi cada día) |
| CP-08 | Validar que el formato de fecha del comprobante se ve "lindo" / alineado en pantalla (estético, depende de la resolución del navegador) |
| CP-09 | Buscar reservas por nombre del huésped: feature nueva, criterios de filtrado aún no definidos |
| CP-10 | Validar que tras 5 logins fallidos la cuenta se bloquea (regla de seguridad estable, pero el dato de prueba requiere reset manual) |

---

## La tabla puntuada (después de mi GATE)

> **Criterios de puntuación (1 a 3):**
> - **Frec** — Frecuencia de ejecución
> - **Estab** — Estabilidad de la funcionalidad
> - **Valor** — Valor de negocio / riesgo
> - **Mant** — Facilidad de mantenimiento
>
> **Zonas:** 🟢 VERDE 10–12 | 🟡 AMARILLO 7–9 | 🔴 ROJO 4–6

| # | Candidato | Frec | Estab | Valor | Mant | Total | Zona | Por qué |
|---|-----------|:----:|:-----:|:-----:|:----:|:-----:|------|---------|
| CP-01 | Login válido → ve panel | 3 | 3 | 3 | 3 | **12** | 🟢 VERDE | Es el flujo principal del sistema, se ejecuta en cada regresión y si falla es un problema crítico. |
| CP-02 | Login con contraseña incorrecta | 3 | 3 | 3 | 3 | **12** | 🟢 VERDE | Es el caso negativo del login. Va junto con CP-01 y agrega cobertura de seguridad sin esfuerzo extra. |
| CP-03 | POST /auth → devuelve token | 3 | 3 | 3 | 3 | **12** | 🟢 VERDE | Es una prueba de API, rápida y fácil de mantener. Si el token no se genera bien, nada funciona. |
| CP-04 | POST /booking → reserva creada | 3 | 3 | 3 | 3 | **12** | 🟢 VERDE | Es el corazón del negocio. La API es estable y la prueba corre en segundos. |
| CP-05 | PUT /booking sin token → 403 | 3 | 3 | 3 | 3 | **12** | 🟢 VERDE | Valida que nadie pueda modificar una reserva sin autenticarse. Si esto falla en producción es un incidente de seguridad. |
| CP-06 | Botón "Iniciar sesión" es azul | 2 | 1 | 1 | 1 | **5** | 🔴 ROJO | Es puramente visual. Si el equipo cambia el diseño, el test se rompe. No afecta la funcionalidad para nada. |
| CP-07 | Banner promocional (2 semanas) | 1 | 1 | 1 | 1 | **4** | 🔴 ROJO | El banner dura dos semanas y el texto cambia casi todos los días. No vale la pena escribir un test para algo así. |
| CP-08 | Fecha del comprobante "lindo" / alineado | 2 | 2 | 1 | 1 | **6** | 🔴 ROJO | Es estético y depende del navegador y la resolución. No hay forma confiable de automatizarlo y no impacta al usuario si está un píxel corrido. |
| CP-09 | Búsqueda por nombre de huésped | 2 | 1 | 2 | 2 | **7** | 🔴 ROJO ⬇️ *bajado de AMARILLO* | La funcionalidad todavía no está definida. Automatizar ahora sería escribir un test que probablemente haya que tirar el mes que viene. |
| CP-10 | Bloqueo tras 5 logins fallidos | 3 | 3 | 3 | 1 | **10** | 🟡 AMARILLO ⬇️ *bajado de VERDE* | La regla de seguridad está clara, pero el dato de prueba hay que resetearlo a mano antes de cada ejecución. Eso lo hace semiautomático. |

---

## Mis 3 decisiones justificadas

### 1. Un SÍ claro

**Candidato:** CP-01 — Login con usuario y contraseña válidos → ve su panel

**Por qué SÍ:** Cumple todo: se ejecuta siempre, es estable, es crítico y es fácil de mantener. Si este test falla, significa que algo muy importante está roto. Es el primero que automatizaría porque además sirve de base para los demás casos de login.

---

### 2. Un NO claro

**Candidato:** CP-07 — Banner promocional de la home

**Por qué NO:** No conviene automatizarlo porque el texto del banner cambia casi todos los días y la campaña dura solo dos semanas. Tendría que estar actualizando el script constantemente y al final igual hay que darlo de baja. El tiempo que me llevaría escribirlo y mantenerlo no vale lo que aporta. Es mejor revisarlo manualmente mientras dure la campaña.

---

### 3. Un dudoso resuelto

**Candidato:** CP-09 — Búsqueda de reservas por nombre del huésped

**Mi decisión:** 🔴 ROJO — lo dejo en testing manual por ahora.

**Qué me hizo inclinarme:** El negocio todavía no definió cómo va a quedar esa funcionalidad. Si automatizo ahora y el mes que viene cambian los criterios de filtrado, tengo que reescribir el test desde cero. Prefiero esperar a que esté todo claro y después sí automatizarlo.

---

## Dónde le discutí a la IA

**Candidato:** CP-10 — Bloqueo tras 5 logins fallidos

La IA lo puso en VERDE con 10/12. Yo lo bajé a **AMARILLO** porque no estoy de acuerdo con ese puntaje.

El problema no es la funcionalidad, que está clara y es importante. El problema es que para ejecutar este test hay que resetear el contador de intentos fallidos a mano antes de cada corrida. Eso significa que si el test corre a la noche de forma automática y nadie hizo el reset, el test va a fallar por el dato y no por un bug real.

Para mí, un test que necesita que alguien haga algo manual antes de ejecutarse no es un test automatizado de verdad. Es semiautomático, y eso le quita valor dentro de una suite de regresión.

Lo dejé en AMARILLO hasta ver si se puede resolver el dato de otra forma, por ejemplo con un endpoint de API que haga el reset o con acceso a la base de datos desde el entorno de prueba. Si eso existe o se puede implementar, ahí sí lo subo a VERDE.
