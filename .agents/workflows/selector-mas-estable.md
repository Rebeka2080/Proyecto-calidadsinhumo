---
description: Analiza el HTML de un elemento y devuelve los 3 selectores CSS más estables para Playwright
---

Soy QA Automation y trabajo con Playwright sobre TypeScript.
Este es el HTML de un elemento de una página que necesito agarrar
con un test:

[PEGA AQUÍ EL outerHTML DEL ELEMENTO]

Dame 3 selectores CSS posibles ordenados del MÁS estable al MENOS
estable. Para cada uno:
1. Escribe el selector CSS literal (lo que iría adentro de page.locator()).
2. Justifica en UNA línea por qué tiene ese puesto de estabilidad.

NO me expliques cómo se escribe en Playwright todavía.
Solo CSS puro y por qué.

> 📌 El ranking de estabilidad: **1.** `data-testid` · **2.** ID estable · **3.** atributo semántico (`name`, `aria-label`, `type`) · **4.** clase específica + atributo · **5.** jerarquía/posición (el más frágil).
