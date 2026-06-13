# 🗑️ Soft Delete vs Hard Delete - Guía Completa

## Comparación Visual

### SOFT DELETE (Recomendado ✅)

```
┌──────────────────────────────────────┐
│ ANTES (Registro Activo)              │
├──────────────────────────────────────┤
│ id: 550e8400...                      │
│ name: Salar de Uyuni                 │
│ is_active: true                      │
│ deleted_at: NULL                     │
│ Estado: 🟢 VISIBLE                   │
└──────────────────────────────────────┘

                    ↓
            Usuario clic DELETE
                    ↓

┌──────────────────────────────────────┐
│ DESPUÉS (Soft Delete)                │
├──────────────────────────────────────┤
│ id: 550e8400...  ← MISMO             │
│ name: Salar de Uyuni  ← MISMO        │
│ is_active: false  ← CAMBIÓ           │
│ deleted_at: 2024-05-31 10:30:45 ← SE LLENÓ
│ Estado: 🔴 OCULTO (pero recuperable) │
│ Registro: SIGUE EN BD                │
└──────────────────────────────────────┘

Características:
✅ Datos preservados
✅ Recuperable al instante
✅ Auditoría completa
✅ Relaciones intactas
✅ Cumplimiento legal (GDPR)
```

### HARD DELETE (Eliminación Física)

```
┌──────────────────────────────────────┐
│ ANTES (Registro Activo)              │
├──────────────────────────────────────┤
│ id: 550e8400...                      │
│ name: Salar de Uyuni                 │
│ is_active: true                      │
│ deleted_at: NULL                     │
│ Estado: 🟢 VISIBLE                   │
└──────────────────────────────────────┘

                    ↓
         Usuario clic DELETE (force)
                    ↓

┌──────────────────────────────────────┐
│ DESPUÉS (Hard Delete)                │
├──────────────────────────────────────┤
│                                      │
│  ❌ REGISTRO DESAPARECE COMPLETAMENTE │
│  ❌ NO RECUPERABLE                   │
│  ❌ DATOS PERDIDOS PARA SIEMPRE      │
│                                      │
└──────────────────────────────────────┘

Características:
❌ Datos perdidos
❌ No recuperable
❌ No hay auditoría
❌ Relaciones pueden romperse
❌ Problemas legales (GDPR)
```

## Decisión de Cuál Usar

### Usa SOFT DELETE cuando:
- ✅ Necesitas auditoría
- ✅ Datos pueden ser recuperados
- ✅ Cumplimiento regulatorio (GDPR, HIPAA)
- ✅ Sistema de historial importante
- ✅ Errores humanos posibles
- ✅ Análisis histórico requerido

**Recomendación: 95% de las veces**

### Usa HARD DELETE cuando:
- 🔴 Usuario específicamente solicita (con confirmación)
- 🔴 Datos de prueba/temporales
- 🔴 Necesidad de liberar espacio urgente
- 🔴 Compliance requerido (CCPA derecho al olvido)
- 🔴 Datos sensibles (PII) después de periodo

**Recomendación: Solo en casos especiales**

## Implementación en NestJS

### Soft Delete (Lógico)

```typescript
// destinations.service.ts
async softDelete(id: string) {
  // OPCIÓN 1: Soft Delete
  const destination = await this.repo.findOne({ where: { id } });
  destination.deletedAt = new Date();
  destination.isActive = false;
  await this.repo.save(destination);
  
  // LOG: Auditoría
  await this.accessLogService.logEvent({
    event: 'SOFT_DELETE',
    resource: id,
    userId: currentUser.id
  });
  
  return { message: 'Eliminado lógicamente' };
}
```

### Hard Delete (Físico)

```typescript
// destinations.service.ts
async hardDelete(id: string, force: boolean = false) {
  if (!force) {
    throw new ForbiddenException('Hard delete requiere force=true');
  }
  
  // Verificar permisos
  if (currentUser.role !== 'ADMIN') {
    throw new ForbiddenException('Solo ADMINs pueden hacer hard delete');
  }
  
  // OPCIÓN 2: Hard Delete
  const result = await this.repo.delete({ id });
  
  if (result.affected === 0) {
    throw new NotFoundException('No encontrado');
  }
  
  // LOG: Auditoría con WARNING
  await this.accessLogService.logEvent({
    event: 'HARD_DELETE_WARNING',
    resource: id,
    userId: currentUser.id,
    note: 'Hard delete ejecutado - DATOS PERDIDOS'
  });
  
  return { message: 'Eliminado permanentemente (IRREVERSIBLE)' };
}
```

## Diferencias en Queries SQL

### Ver datos activos (sin soft-deleted):

```sql
-- Devuelve 4 (Salar de Uyuni no aparece)
SELECT * FROM destination 
WHERE is_active = true AND deleted_at IS NULL;
```

### Ver todos incluyendo soft-deleted:

```sql
-- Devuelve 5 (incluyendo Salar de Uyuni)
SELECT * FROM destination;
```

### Después de hard delete:

```sql
-- Devuelve 4 (Salar de Uyuni DESAPARECIÓ)
SELECT * FROM destination;
-- Ya no hay registro para recuperar
```

## Restauración

### Restaurar Soft Delete (Fácil):

```typescript
async restore(id: string) {
  const destination = await this.repo.findOne({ where: { id } });
  destination.deletedAt = null;
  destination.isActive = true;
  await this.repo.save(destination);
  return destination;
}

// SQL:
UPDATE destination 
SET deleted_at = NULL, is_active = true
WHERE id = '...';
```

**Tiempo: < 1 segundo**  
**Confirmación: Si, datos intactos**

### Restaurar Hard Delete (Imposible):

```
❌ NO POSIBLE
❌ Solo desde backup
❌ Requiere restaurar BD completa
❌ Tiempo: Horas/Días
❌ Pérdida de datos más recientes
```

## Implementación Recomendada

```typescript
// destinations.controller.ts
@Delete(':id')
@UseGuards(JwtAuthGuard)
async remove(
  @Param('id') id: string,
  @Query('force') force?: boolean,
  @Query('hard') hard?: boolean
) {
  if (hard || force) {
    // Hard delete
    return this.destinationsService.hardDelete(id, true);
  } else {
    // Soft delete (por defecto)
    return this.destinationsService.softDelete(id);
  }
}

// Uso:
DELETE /api/destinations/123        → Soft Delete (default)
DELETE /api/destinations/123?force=true  → Soft Delete
DELETE /api/destinations/123?hard=true   → Hard Delete (ADMIN only)
```

## Auditoría Completa

### AccessLog registra todo:

```sql
SELECT * FROM access_log WHERE event IN ('SOFT_DELETE', 'HARD_DELETE_WARNING');

 id  | user_id | event                 | resource | created_at
─────┼─────────┼───────────────────────┼──────────┼──────────────────────
 1   | admin1  | SOFT_DELETE           | 550e8400 | 2024-05-31 10:30:45
 2   | admin1  | RESTORE               | 550e8400 | 2024-05-31 10:35:00
 3   | admin2  | HARD_DELETE_WARNING   | 550e8400 | 2024-05-31 10:40:00
```

## Casos de Uso Reales

### Caso 1: Error de Usuario

```
Escenario: Admin elimina destino por error
├─ Tipo: Soft Delete
├─ Acción: SELECT * WHERE deleted_at IS NOT NULL
├─ Encuentra: Salar de Uyuni eliminado
├─ Restaura: PATCH /api/destinations/:id/restore
└─ Tiempo: 2 segundos
✅ PROBLEMA RESUELTO
```

### Caso 2: Auditoría Legal

```
Escenario: Autoridad requiere auditoría completa
├─ Tipo: Soft Delete
├─ Acción: SELECT * FROM access_log WHERE event = 'SOFT_DELETE'
├─ Encuentra: Quién, cuándo, por qué se eliminó
├─ Resultado: Historial completo
└─ Cumplimiento: ✅ GDPR, CCPA, etc
✅ AUDITORÍA COMPLETA
```

### Caso 3: Espacio de Almacenamiento

```
Escenario: BD muy grande, necesitar liberar espacio
├─ Tipo: Hard Delete (después de retención)
├─ Acción: DELETE FROM destination WHERE deleted_at < DATE_SUB(NOW(), 90 days)
├─ Resultado: Elimina datos soft-deleted hace >90 días
└─ Precaución: Hacer backup primero
⚠️ CUIDADO: IRREVERSIBLE
```

## Resumen

| Aspecto | Soft Delete | Hard Delete |
|---------|-------------|------------|
| **Datos** | Preservados | Perdidos |
| **Recuperación** | Inmediata | Imposible |
| **Auditoría** | Completa | Parcial |
| **Relaciones** | Intactas | Riesgo |
| **GDPR** | Cumple | Precaución |
| **Velocidad** | Rápida | Rápida |
| **Recomendado** | 95% de casos | 5% de casos |
| **Predeterminado** | Sí (default) | No (requiere force) |

---

**Recomendación Final:** Usa Soft Delete por defecto, Hard Delete solo cuando sea absolutamente necesario después de aprobación.
