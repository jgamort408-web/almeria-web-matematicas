#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sync_nav.py — Fuente de verdad para header y footer de Almeria en cifras y formas
================================================================================
EDITA LAS PLANTILLAS AQUI ABAJO y ejecuta este script para que el cambio
se propague automaticamente a los 29 HTML del proyecto.

  python sync_nav.py

Los archivos header.html y footer.html de la raiz NO se usan en produccion;
este script es el unico punto de mantenimiento del nav.
"""

import re, os, glob

BASE = r"C:\Users\Medion PC\Desktop\almeria-web-matematicas"
SKIP = {'header.html', 'footer.html'}

# ============================================================
#  PLANTILLAS  — edita aqui para cambiar el nav en toda la web
# ============================================================

# {R} = ruta relativa a la raiz ('', o '../' segun profundidad)
HEADER_TPL = """\
    <header class="site-header" role="banner">
    <div class="header-inner">
        <a href="{R}index.html" class="header-logo" aria-label="Almeria en cifras y formas - Inicio">
            <span class="header-logo-icon" aria-hidden="true">📐</span>
            <span class="header-logo-texto">
                <strong>Almeria</strong><span class="header-logo-sub"> en cifras y formas</span>
            </span>
        </a>
        <button class="header-hamburger" id="hamburger-btn"
                aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">
            <span></span><span></span><span></span>
        </button>
        <nav class="header-nav" id="main-nav" aria-label="Navegacion principal">
            <a href="{R}index.html"      class="header-link"><span aria-hidden="true">🏠</span> Inicio</a>
            <a href="{R}proyecto.html"   class="header-link"><span aria-hidden="true">📌</span> Proyecto</a>
            <a href="{R}ruta.html"       class="header-link"><span aria-hidden="true">🗺️</span> Ruta</a>
            <a href="{R}glosario.html"   class="header-link"><span aria-hidden="true">📖</span> Glosario</a>
            <a href="{R}evaluacion.html" class="header-link"><span aria-hidden="true">✅</span> Evaluacion</a>
        </nav>
    </div>
</header>"""

FOOTER_TPL = """\
    <footer class="footer-sitio" role="contentinfo">
    <div class="footer-contenido">
        <div class="footer-autor">
            <span class="footer-nombre">Juan María Gámez Ortiz</span>
            <a href="https://iesalandalus.org/joomla/" class="footer-centro">I.E.S. Al-Ándalus</a>
        </div>
        <nav class="footer-idiomas" aria-label="Selector de idioma">
            <span class="footer-idiomas-label"><span aria-hidden="true">🌐</span> Idioma:</span>
            <button class="btn-idioma activo" data-lang="es"><span aria-hidden="true">🇪🇸</span> ES</button>
            <button class="btn-idioma" data-lang="en"><span aria-hidden="true">🇬🇧</span> EN</button>
            <button class="btn-idioma" data-lang="ar"><span aria-hidden="true">🇸🇦</span> AR</button>
            <button class="btn-idioma" data-lang="pl"><span aria-hidden="true">🇵🇱</span> PL</button>
            <button class="btn-idioma" data-lang="ru"><span aria-hidden="true">🇷🇺</span> RU</button>
            <button class="btn-idioma" data-lang="nl"><span aria-hidden="true">🇳🇱</span> NL</button>
            <button class="btn-idioma" data-lang="de"><span aria-hidden="true">🇩🇪</span> DE</button>
        </nav>
        <div id="google_translate_element" aria-hidden="true"></div>
        <div class="footer-copy">
            \u00a9 <span id="footer-a\u00f1o"></span> &nbsp;\u00b7&nbsp; Matem\u00e1ticas 1.\u00ba ESO &nbsp;\u00b7&nbsp; Almer\u00eda
        </div>
    </div>
</footer>
<div class="toast-idioma" id="toast-idioma" role="alert" aria-live="polite"></div>
<button class="btn-top" id="btn-top" aria-label="Volver arriba" title="Volver arriba">\u2191</button>"""

# ============================================================
#  PATRONES DE BUSQUEDA (robustos ante cambios menores en espacios)
# ============================================================
HEADER_RE = re.compile(
    r'[ \t]*<header\s+class="site-header"[^>]*>.*?</header>',
    re.DOTALL
)
FOOTER_RE = re.compile(
    r'[ \t]*<footer\s+class="footer-sitio"[^>]*>.*?</button>',
    re.DOTALL
)

# ============================================================
#  LOGICA
# ============================================================
def raiz(filepath):
    """Devuelve la ruta relativa a la raiz del proyecto."""
    rel = os.path.relpath(filepath, BASE)
    depth = rel.count(os.sep)
    return '../' * depth if depth > 0 else ''

def sync_file(filepath):
    r = raiz(filepath)
    with open(filepath, encoding='utf-8') as f:
        html = f.read()

    new_header = HEADER_TPL.replace('{R}', r)
    new_footer = FOOTER_TPL

    changed = False

    # Sync header
    m = HEADER_RE.search(html)
    if m:
        current = m.group(0).strip()
        canonical = new_header.strip()
        if current != canonical:
            html = html[:m.start()] + new_header + html[m.end():]
            changed = True
    else:
        print(f'  WARN: header no encontrado en {os.path.relpath(filepath, BASE)}')

    # Sync footer
    m = FOOTER_RE.search(html)
    if m:
        current = m.group(0).strip()
        canonical = new_footer.strip()
        if current != canonical:
            html = html[:m.start()] + new_footer + html[m.end():]
            changed = True
    else:
        print(f'  WARN: footer no encontrado en {os.path.relpath(filepath, BASE)}')

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return 'UPDATED'
    return 'OK    '

# ============================================================
#  MAIN
# ============================================================
files = sorted(glob.glob(os.path.join(BASE, '**/*.html'), recursive=True))
updated = 0
for fp in files:
    if os.path.basename(fp) in SKIP:
        continue
    status = sync_file(fp)
    if status == 'UPDATED':
        updated += 1
    print(f'{status} {os.path.relpath(fp, BASE)}')

print(f'\nArchivos actualizados: {updated} / {len(files) - len(SKIP)}')
print('Para cambiar el nav en el futuro: edita las plantillas al inicio de este script y ejecuta:')
print('  python sync_nav.py')
