# Modular Data Architecture Standard (v8.8)

## Overzicht
Om de Google Sheets interface voor de klant overzichtelijk te houden en de stabiliteit van de Factory te verhogen, hanteert Athena CMS de **Modular Data Standard**.

## De 1-op-1 Regel
Elke UI-sectie op de website correspondeert met exact één JSON-bestand en één tabblad in de Sheet.

### 1. Content Tabbladen (Zichtbaar)
Tabbladen die direct door de klant bewerkt mogen worden hebben een schone, Nederlandstalige naam.
- `header`: Logo, slogan, CTA.
- `hero`: Hoofdtitel, achtergrondbeeld.
- `voordelen`: Lijst met USP's en iconen.
- `footer`: Contactgegevens, copyright tekst.

### 2. Config Tabbladen (Verborgen)
Technische configuratiebestanden die de werking van de site bepalen, krijgen een underscore (`_`) prefix. De Factory verbergt deze tabbladen automatisch voor de klant.
- `_site_settings`: Globale identiteit en layout-toggles.
- `_style_config`: Kleurenpalet en lettertypes.
- `_section_order`: De volgorde van componenten op de pagina.
- `_system`: Interne metadata.

## SmartIcon Systeem
De `GenericSection` en andere componenten ondersteunen de **SmartIcon** logic:
- **SVG Pad**: Als een cel in de Sheet begint met `M`, wordt dit gerenderd als een inline SVG.
- **FontAwesome**: Als een cel een geldige FA-klasse bevat (bijv. `fa-bolt`), wordt dit als font-icoon getoond.

## Implementatie in React
De `main.jsx` gebruikt `import.meta.glob` om dynamisch alle data in te laden, waardoor handmatige registratie van nieuwe secties niet meer nodig is.
