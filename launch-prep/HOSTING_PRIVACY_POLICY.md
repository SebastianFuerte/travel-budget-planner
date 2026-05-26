# Cómo hostear la Privacy Policy (gratis, 5 minutos)

Las stores requieren una **URL pública** para la Privacy Policy. Tienes 3 opciones, todas gratis:

---

## Opción 1: GitHub Pages (recomendada)

Es la más profesional y la más fácil si ya tienes GitHub.

### Pasos:
1. Crea un repo nuevo en GitHub llamado `travel-budget-planner-legal` (o similar)
2. Sube el archivo `PRIVACY_POLICY.md` renombrado como `index.md` o `privacy-policy.md`
3. Ve a Settings → Pages → Source: "Deploy from branch" → branch: `main` → folder: `/ (root)`
4. En 2 minutos tu URL será:
   ```
   https://[tu-usuario].github.io/travel-budget-planner-legal/privacy-policy
   ```
5. Esa URL la pones en Google Play Console y App Store Connect

**Tip:** También sube `TERMS_OF_SERVICE.md` al mismo repo para tener ambas URLs.

---

## Opción 2: Notion (el más rápido)

1. Crea una página en Notion
2. Copia y pega el contenido de `PRIVACY_POLICY.md`
3. Click en "Share" → "Share to web" → activa el toggle
4. Copia la URL pública que genera

**Cons:** La URL tiene formato largo (notion.so/abc123...) pero es válida para las stores.

---

## Opción 3: Google Sites (si prefieres Google)

1. Entra a sites.google.com
2. Crea un sitio nuevo
3. Añade una página "Privacy Policy" y pega el contenido
4. Publica → obtienes una URL `sites.google.com/view/tu-app/privacy-policy`

---

## URLs que necesitas tener listas antes de submit

| Documento | Dónde se usa | Obligatorio |
|-----------|-------------|-------------|
| Privacy Policy URL | Google Play + App Store | ✅ Sí |
| Terms of Service URL | Dentro de la app (paywall) | Recomendado |
| Support URL | App Store Connect | ✅ Sí (puede ser mailto:) |
| Marketing URL | App Store Connect | No |

### Support URL mínima válida (sin sitio web)
```
mailto:jsfuertem@unal.edu.co
```
App Store acepta un `mailto:` como Support URL. Es suficiente para pasar revisión.

---

## Actualizar app.json con la URL

Una vez tengas la URL, agrégala en `app.json`:

```json
{
  "expo": {
    "extra": {
      "privacyPolicyUrl": "https://[tu-usuario].github.io/travel-budget-planner-legal/privacy-policy"
    }
  }
}
```

Y actualiza el texto del paywall si hay un link a Privacy Policy en la UI.
