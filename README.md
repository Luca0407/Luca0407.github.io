# Portfolio — Luca Elizondo

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni build) listo para publicar en GitHub Pages.

```
portfolio/
├── index.html        # Todo el contenido
├── css/styles.css    # Estilos, temas oscuro/claro y responsive
├── js/i18n.js        # Traducciones al inglés y selector ES / EN
├── js/main.js        # Tema, menú, animaciones, capturas que se turnan, marquee y "copiar"
├── assets/           # Solo lo que usa la página (favicon, foto, CV en PDF, mockups y capturas)
└── _fuentes/         # Originales, fuentes del CV y scripts de los mockups. No se publica (.gitignore)
```

## Verlo en local

Desde la carpeta `Programacion`:

```bash
python -m http.server 5500 --directory portfolio
```

Abrir http://localhost:5500. Abrir `index.html` con doble clic también funciona.

## Publicar cambios

El sitio está en <https://luca0407.github.io> (repo `Luca0407/Luca0407.github.io`, GitHub Pages desde
`main`). Para publicar un cambio, desde esta carpeta:

```bash
git add .
git status        # revisar: no tienen que aparecer .claude/ ni _fuentes/
git commit -m "Qué cambió"
git push
```

GitHub tarda uno o dos minutos en actualizarlo. No subas archivos arrastrándolos a la web de GitHub: así el
`.gitignore` no se aplica y se publicarían `.claude/` (informes del consejo) y `_fuentes/` (originales).

## Idiomas (ES / EN)

- El español es el texto que está en `index.html`. El inglés está en el objeto `EN` de `js/i18n.js`.
- Cada texto traducible tiene `data-i18n="clave"` (o `data-i18n-attr="aria-label:clave"` para atributos).
  Si agregás o cambiás un texto en el HTML, actualizá la misma clave en `EN`. Si una clave no tiene
  traducción, se muestra en español.
- Idioma inicial: `?lang=en` o `?lang=es` en la URL → la última elección del visitante → el idioma del
  navegador (español si empieza con `es`, si no, inglés).
- Link directo en inglés para compartir: <https://luca0407.github.io/?lang=en>.
- Las capturas de las apps quedan en español a propósito, porque así son las apps reales.

## Cambios frecuentes

### Cambiar la foto

La foto es `assets/foto.webp` (vertical 4:5, 800×1000 px); el original está en `_fuentes/fotos/`. Para
cambiarla, exportá la nueva con el mismo nombre y tamaño: no hace falta tocar `index.html`.

### Actualizar el CV

Los PDF (`assets/cv/Luca_Elizondo_CV_ES.pdf` y `_EN.pdf`) salen de `_fuentes/cv/cv-es.html` y `cv-en.html`.
Editá el HTML y regenerá el PDF con Edge (mismo nombre, así los links de la página siguen andando):

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --no-pdf-header-footer \
  --print-to-pdf="assets/cv/Luca_Elizondo_CV_ES.pdf" "file:///$PWD/_fuentes/cv/cv-es.html"
```

Para que pase los filtros automáticos (ATS): una sola columna, sin tablas, íconos ni imágenes, títulos de
sección estándar y fechas en formato MM/AAAA. Antes de subirlo, abrí el PDF y probá seleccionar el texto.

### Vista previa al compartir el link

`assets/og.jpg` (1200×630) es la imagen que muestran LinkedIn y WhatsApp. Sale de `_fuentes/og/og.html`:
abrilo en Edge con la ventana en 1200×630 y capturalo, o usá `--headless --window-size=1200,630 --screenshot`.
Si cambia la URL del sitio, actualizá `og:url`, `og:image` y `canonical` en el `<head>` de `index.html`.

### Cambiar las capturas de un mockup

Decisión: los mockups actuales quedan como están y no hace falta mantener este proceso. Si alguna vez cambia
una captura y no vale la pena repetirlo, una captura plana en su lugar alcanza.

Las capturas no se pegan tal cual: un script las deforma para la pantalla de cada foto de mockup y
recorta el fondo. Los originales y los scripts están en `_fuentes/` (no se publican):

- `_fuentes/capturas/`: capturas originales (STIMCh, Print-Table PC y celular).
- `_fuentes/mockups/`: fotos de los mockups (laptop de costado, laptop de frente y celular).
- `_fuentes/scripts/`: scripts en Python (necesitan `pip install pillow numpy opencv-python-headless`).

Editá la captura en `_fuentes/capturas/` (mismo nombre) y, desde `_fuentes/scripts/`, corré:

```bash
# STIMCh (laptop de frente) → copiar salida/laptop.webp, screen-1.webp y screen-2.webp a assets/stimch/
python build_front.py ../mockups/laptop_mockup2.webp salida . ../capturas/stimch_ss1.png ../capturas/stimch_ss2.png

# Print-Table, laptop (capturas de PC) → copiar salida/screen-*.webp a assets/printable/
python screens.py printable salida . ../capturas/printable_pc_ss1.png ../capturas/printable_pc_ss2.png ../capturas/printable_pc_ss3.png

# Print-Table, celular → copiar a assets/printable/: phone-frame.webp como phone-photo-frame.webp,
# phone-screen-off.webp como phone-photo-screen.webp y phone-photo-1/2/3.webp
python build_phone.py ../mockups/phone_mockup3.webp salida . ../capturas/Printable_ss1.jpeg ../capturas/Printable_ss2.jpeg ../capturas/Printable_ss3.jpeg
```

Cómo se completa cada captura hasta la proporción de la pantalla (qué filas se usan, dónde se tapa una
tarjeta cortada) está en cada script (`SPECS` en `build_front.py`, `PROJECTS` en `screens.py`). Si una
captura nueva tiene otro tamaño, hay que ajustar esos valores. `analyze.py`, `edges.py` y `build2.py`
generaron la laptop de costado (`assets/laptop-photo.webp`) y los datos de su pantalla; no hace falta
volver a correrlos.

### Color de cada proyecto

El brillo, el ícono y los checks de cada tarjeta usan el tono `--h` del `style` del `<article>`
(por ejemplo `style="--h:200"`). Cambiá el número (0–360) para cambiar el color.
