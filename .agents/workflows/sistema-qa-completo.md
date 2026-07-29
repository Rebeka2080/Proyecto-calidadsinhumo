---
description: Toma un documento funcional y genera toda la documentación de QA en cadena — > requerimientos, casos de prueba, BDD Gherkin, plan de prueba y matriz de trazabilidad
---

Eres un sistema de QA que trabaja en CINCO estaciones en cadena. Te doy un
documento funcional y produces toda la documentación de QA, paso a paso, en
orden. Cada estación usa la salida de la anterior. No te saltes ninguna.

═══════════════════════════════════════════
CÓMO ENTREGAR LA SALIDA (importante)
═══════════════════════════════════════════
- Si estás en una herramienta que puede CREAR ARCHIVOS (un agente como
  Antigravity o Claude Code): guarda cada artefacto en su propio archivo
  dentro de una carpeta "output/", y al final dime el nombre de cada archivo.
- Si NO puedes crear archivos (un chat como Gemini): devuelve cada artefacto
  como texto, separando cada uno con una línea:  ===== nombre-del-archivo =====

═══════════════════════════════════════════
ESTACIÓN 1 — ANALIZAR EL DOCUMENTO   →  output/context.json
═══════════════════════════════════════════
Lee el documento funcional y extrae el contexto del sistema en JSON.
REGLA: usa SOLO lo que está en el documento. Si algo no está especificado
(el dominio, el propósito del negocio, etc.), pon null — NO lo inventes ni lo
deduzcas del nombre del sistema.
{
  "domain": "dominio del negocio (null si el documento no lo dice)",
  "system": "nombre del sistema",
  "feature": "feature analizada",
  "platform": "Web | Mobile | API | Desktop",
  "actors": ["actores del sistema"],
  "business_rules": ["reglas de negocio explícitas en el documento"],
  "summary": "2-3 oraciones de qué hace esta feature"
}

═══════════════════════════════════════════
ESTACIÓN 2 — EXTRAER REQUERIMIENTOS   →  output/requirements.json
═══════════════════════════════════════════
Usando el contexto y el documento, extrae TODOS los requerimientos
(incluidos los implícitos). Array JSON:
[
  {
    "id": "REQ-001",
    "title": "título conciso del requerimiento",
    "type": "functional | non-functional",
    "priority": "high | medium | low",
    "acceptance_criteria": ["El sistema debe...", "Cuando... entonces..."]
  }
]
Asigna IDs secuenciales: REQ-001, REQ-002, REQ-003...
Prioridad: HIGH = flujos principales y seguridad; MEDIUM = errores y estados
intermedios; LOW = mensajes informativos.

═══════════════════════════════════════════
ESTACIÓN 3 — DISEÑAR CASOS DE PRUEBA   →  output/test-cases.json
═══════════════════════════════════════════
Para cada requerimiento, diseña los casos. Cobertura mínima:
- REQ high:   1 happy path + 2 negativos + 1 edge case
- REQ medium: 1 happy path + 1 negativo
- REQ low:    1 happy path
Array JSON:
[
  {
    "tc_id": "TC-REQ001-001",
    "req_ref": "REQ-001",
    "title": "título descriptivo del caso",
    "type": "happy_path | negative | edge_case | boundary",
    "steps": ["1. [Actor] hace [acción]", "2. El sistema muestra [estado]"],
    "test_data": {"campo": "valor de ejemplo concreto"},
    "expected_result": "qué debe pasar"
  }
]
Cada TC debe tener su "req_ref" apuntando a un REQ válido (trazabilidad).

═══════════════════════════════════════════
ESTACIÓN 4 — ESCRIBIR BDD GHERKIN   →  output/[feature].feature
═══════════════════════════════════════════
Convierte cada caso de prueba en un escenario Gherkin. Steps EN ESPAÑOL.
Archivo .feature:
Feature: [nombre de la feature del contexto]

  @[tc_id] @req-[req_ref] @[type]
  Scenario: [título del caso]
    Given [precondición — estado inicial]
    When [acción del actor]
    Then [resultado esperado]
Reglas: un Scenario por caso, UN comportamiento por escenario, máximo 5 steps,
tags obligatorios @tc y @req. Incluye TODOS los casos de la Estación 3.

═══════════════════════════════════════════
ESTACIÓN 5 — GENERAR ARTEFACTOS FINALES
   →  output/test-plan.md  y  output/traceability.md
═══════════════════════════════════════════
Genera DOS documentos Markdown:

(1) test-plan.md — formato IEEE 829-lite:
# Plan de Prueba — [sistema] · [feature]
## 1. Objetivo
## 2. Alcance (en scope / fuera de scope)
## 3. Estrategia de prueba (tipos aplicados, cobertura objetivo)
## 4. Criterios de entrada / Criterios de salida
## 5. Lista de casos de prueba
| TC ID | REQ | Descripción | Tipo | Prioridad |
## 6. Riesgos identificados

(2) traceability.md — matriz de trazabilidad:
# Matriz de Trazabilidad — [sistema]
| REQ ID | Descripción | TC IDs | Escenarios BDD | Cobertura |

═══════════════════════════════════════════
AL TERMINAR
═══════════════════════════════════════════
Dame un resumen corto: cuántos requerimientos extrajiste, cuántos casos
diseñaste, y la lista de artefactos/archivos que produjiste.

Aquí está el documento funcional:
[PEGA AQUÍ EL DOCUMENTO FUNCIONAL]
```
