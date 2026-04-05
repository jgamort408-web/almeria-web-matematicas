/* ================================================================
   script.js — Funcionalidad compartida
   "Almería en cifras y formas" · Matemáticas 1.º ESO
   ================================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------------
       1. ESTILOS DEL FOOTER (inyectados en <head> para máxima
          compatibilidad, independientemente de cómo se cargue el HTML)
    ---------------------------------------------------------------- */
    var CSS_FOOTER = [
        '/* ====== FOOTER SITIO ====== */',
        '.footer-sitio {',
        '    background: linear-gradient(135deg, #002f4b 0%, #005A8C 100%);',
        '    color: #fff;',
        '    margin-top: 40px;',
        '    font-family: "Segoe UI", Arial, sans-serif;',
        '}',
        '.footer-contenido {',
        '    max-width: 1150px;',
        '    margin: 0 auto;',
        '    padding: 26px 24px 20px;',
        '    display: flex;',
        '    flex-wrap: wrap;',
        '    align-items: center;',
        '    justify-content: space-between;',
        '    gap: 20px;',
        '}',
        '.footer-autor {',
        '    display: flex;',
        '    flex-direction: column;',
        '    gap: 5px;',
        '}',
        '.footer-nombre {',
        '    font-weight: bold;',
        '    font-size: 1rem;',
        '    color: #fff;',
        '    letter-spacing: 0.3px;',
        '}',
        '.footer-centro {',
        '    color: #F4EBD0;',
        '    text-decoration: none;',
        '    font-size: 0.9rem;',
        '    transition: color 0.2s;',
        '    display: inline-flex;',
        '    align-items: center;',
        '    gap: 5px;',
        '}',
        '.footer-centro::before { content: "\\1F3EB"; }',
        '.footer-centro:hover { color: #fff; text-decoration: underline; }',
        '.footer-centro:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; border-radius: 3px; }',
        '.footer-idiomas {',
        '    display: flex;',
        '    align-items: center;',
        '    gap: 6px;',
        '    flex-wrap: wrap;',
        '}',
        '.footer-idiomas-label {',
        '    font-size: 0.85rem;',
        '    color: rgba(255,255,255,0.75);',
        '    margin-right: 2px;',
        '}',
        '.btn-idioma {',
        '    background: rgba(255,255,255,0.1);',
        '    border: 1px solid rgba(255,255,255,0.25);',
        '    color: #fff;',
        '    padding: 5px 10px;',
        '    border-radius: 5px;',
        '    cursor: pointer;',
        '    font-size: 0.82rem;',
        '    font-weight: bold;',
        '    font-family: inherit;',
        '    transition: background 0.2s, border-color 0.2s, transform 0.1s;',
        '    line-height: 1.4;',
        '}',
        '.btn-idioma:hover {',
        '    background: rgba(255,255,255,0.22);',
        '    border-color: rgba(255,255,255,0.55);',
        '    transform: translateY(-1px);',
        '}',
        '.btn-idioma:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; }',
        '.btn-idioma.activo {',
        '    background: #D36E5A;',
        '    border-color: #D36E5A;',
        '    cursor: default;',
        '    transform: none;',
        '}',
        '.footer-copy {',
        '    font-size: 0.78rem;',
        '    color: rgba(255,255,255,0.55);',
        '    white-space: nowrap;',
        '}',
        '/* Toast */',
        '.toast-idioma {',
        '    position: fixed;',
        '    bottom: 76px;',
        '    left: 50%;',
        '    transform: translateX(-50%) translateY(12px);',
        '    background: rgba(30,30,30,0.94);',
        '    color: #fff;',
        '    padding: 10px 22px;',
        '    border-radius: 8px;',
        '    font-size: 0.95rem;',
        '    font-family: "Segoe UI", Arial, sans-serif;',
        '    opacity: 0;',
        '    pointer-events: none;',
        '    transition: opacity 0.3s, transform 0.3s;',
        '    z-index: 9999;',
        '    max-width: 90vw;',
        '    text-align: center;',
        '    box-shadow: 0 4px 16px rgba(0,0,0,0.3);',
        '}',
        '.toast-idioma.visible {',
        '    opacity: 1;',
        '    transform: translateX(-50%) translateY(0);',
        '}',
        '/* Botón volver arriba */',
        '.btn-top {',
        '    position: fixed;',
        '    bottom: 22px;',
        '    right: 22px;',
        '    background: #005A8C;',
        '    color: #fff;',
        '    border: none;',
        '    border-radius: 50%;',
        '    width: 46px;',
        '    height: 46px;',
        '    font-size: 1.3rem;',
        '    line-height: 1;',
        '    cursor: pointer;',
        '    opacity: 0;',
        '    pointer-events: none;',
        '    transition: opacity 0.3s, background 0.2s, transform 0.2s;',
        '    z-index: 9998;',
        '    box-shadow: 0 3px 10px rgba(0,0,0,0.25);',
        '    display: flex;',
        '    align-items: center;',
        '    justify-content: center;',
        '}',
        '.btn-top.visible { opacity: 1; pointer-events: auto; }',
        '.btn-top:hover { background: #003F63; transform: translateY(-2px); }',
        '.btn-top:focus { outline: 2px solid #F4EBD0; outline-offset: 3px; }',
        '@media (max-width: 640px) {',
        '    .footer-contenido {',
        '        flex-direction: column;',
        '        text-align: center;',
        '        align-items: center;',
        '        padding: 22px 16px 18px;',
        '    }',
        '    .footer-idiomas { justify-content: center; }',
        '    .footer-copy { white-space: normal; text-align: center; }',
        '    .btn-top { width: 40px; height: 40px; font-size: 1.1rem; }',
        '}'
    ].join('\n');

    /* ----------------------------------------------------------------
       2. MENSAJES DEL SELECTOR DE IDIOMA
    ---------------------------------------------------------------- */
    var MENSAJES_IDIOMA = {
        en: '\uD83C\uDDEC\uD83C\uDDE7 English version coming soon!',
        ar: '\uD83C\uDDF8\uD83C\uDDE6 \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0642\u0631\u064A\u0628\u0627\u064B!',
        pl: '\uD83C\uDDF5\uD83C\uDDF1 Wersja polska wkr\u00F3tce!',
        ru: '\uD83C\uDDF7\uD83C\uDDFA \u0420\u0443\u0441\u0441\u043A\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0441\u043A\u043E\u0440\u043E!',
        nl: '\uD83C\uDDF3\uD83C\uDDF1 Nederlandse versie binnenkort!',
        de: '\uD83C\uDDE9\uD83C\uDDEA Deutsche Version bald verf\u00FCgbar!'
    };

    /* ----------------------------------------------------------------
       3. INYECTAR CSS DEL FOOTER EN <head>
    ---------------------------------------------------------------- */
    function inyectarCSS() {
        if (document.getElementById('almeria-footer-css')) return;
        var style = document.createElement('style');
        style.id = 'almeria-footer-css';
        style.textContent = CSS_FOOTER;
        document.head.appendChild(style);
    }

    /* ----------------------------------------------------------------
       4. DETECTAR RUTA RAÍZ SEGÚN PROFUNDIDAD DE PÁGINA
    ---------------------------------------------------------------- */
    function getRutaRaiz() {
        var path = window.location.pathname;
        if (/\/bloque[1-4]\//i.test(path)) return '../';
        return '';
    }

    /* ----------------------------------------------------------------
       5. CARGAR footer.html E INYECTAR EN #site-footer
    ---------------------------------------------------------------- */
    function cargarFooter() {
        var placeholder = document.getElementById('site-footer');
        if (!placeholder) return;

        var footerPath = getRutaRaiz() + 'footer.html';

        fetch(footerPath)
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(function (html) {
                placeholder.innerHTML = html;
                activarFooter();
                activarBotonTop();
            })
            .catch(function (err) {
                console.warn('[Almeria web] footer.html no disponible:', err);
                // Fallback mínimo (útil en file:// o en caso de error)
                placeholder.innerHTML =
                    '<footer style="background:#003F63;color:#fff;text-align:center;' +
                    'padding:18px;margin-top:30px;font-family:Arial,sans-serif;font-size:0.9rem;">' +
                    '<strong>Juan Mar\u00EDa G\u00E1mez Ortiz</strong> &nbsp;&bull;&nbsp; ' +
                    '<a href="https://iesalandalus.org/joomla/" style="color:#F4EBD0;text-decoration:none;">' +
                    'I.E.S. Al-\u00C1ndalus</a>' +
                    '</footer>';
            });
    }

    /* ----------------------------------------------------------------
       6. LÓGICA INTERNA DEL FOOTER
    ---------------------------------------------------------------- */
    function activarFooter() {
        // Año del copyright
        var spanAno = document.getElementById('footer-año');
        if (spanAno) spanAno.textContent = new Date().getFullYear();

        // Selector de idioma
        var toast = document.getElementById('toast-idioma');
        document.querySelectorAll('.btn-idioma').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.dataset.lang;
                if (lang === 'es') return;
                var msg = MENSAJES_IDIOMA[lang] || 'Versi\u00F3n pr\u00F3ximamente disponible';
                if (toast) mostrarToast(toast, msg);
            });
        });
    }

    /* ----------------------------------------------------------------
       7. BOTÓN VOLVER ARRIBA
    ---------------------------------------------------------------- */
    function activarBotonTop() {
        var btn = document.getElementById('btn-top');
        if (!btn) return;
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 320);
        }, { passive: true });
    }

    /* ----------------------------------------------------------------
       8. TOAST
    ---------------------------------------------------------------- */
    var _toastTimer = null;
    function mostrarToast(el, msg) {
        el.textContent = msg;
        el.classList.add('visible');
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(function () {
            el.classList.remove('visible');
        }, 3200);
    }

    /* ----------------------------------------------------------------
       9. SMOOTH SCROLL GLOBAL
    ---------------------------------------------------------------- */
    function activarSmoothScroll() {
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    /* ----------------------------------------------------------------
       10. RESALTAR ENLACE ACTIVO EN NAVEGACIÓN
    ---------------------------------------------------------------- */
    function resaltarNavActiva() {
        var path = window.location.pathname;
        var style = document.createElement('style');
        style.textContent = 'a[aria-current="page"] { font-weight: bold !important; text-decoration: underline !important; }';
        document.head.appendChild(style);

        document.querySelectorAll('a[href]').forEach(function (a) {
            var href = a.getAttribute('href');
            if (!href || href.charAt(0) === '#' || /^https?:\/\//.test(href)) return;
            try {
                var resolved = new URL(href, window.location.href).pathname;
                if (resolved === path) {
                    a.setAttribute('aria-current', 'page');
                }
            } catch (e) { /* silencio */ }
        });
    }

    /* ----------------------------------------------------------------
       INIT
    ---------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        inyectarCSS();
        activarSmoothScroll();
        cargarFooter();
        resaltarNavActiva();
    });

})();
