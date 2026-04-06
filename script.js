/* ================================================================
   script.js — Almería en cifras y formas · Matemáticas 1.º ESO
   Gestiona: layout global, header compartido, footer compartido,
   selector de idioma (Google Translate), botón ↑, nav activa.
   ================================================================ */
(function () {
    'use strict';

    /* ----------------------------------------------------------------
       UTILIDADES
    ---------------------------------------------------------------- */

    /** Detecta si la página está dentro de bloque1-4/ */
    function getRaiz() {
        return /\/bloque[1-4]\//i.test(window.location.pathname) ? '../' : '';
    }

    /** Inyecta un bloque <style> en <head> una sola vez */
    function inyectarEstilo(id, css) {
        if (document.getElementById(id)) return;
        var s = document.createElement('style');
        s.id = id;
        s.textContent = css;
        document.head.appendChild(s);
    }

    /* ----------------------------------------------------------------
       1. CSS GLOBAL — Arregla el layout de TODAS las páginas
          El problema: body { display:flex; justify-content:center } en
          cada página convierte header+contenedor+footer en una FILA.
          La solución: forzar columna + stretch; centrar .contenedor
          con margin:auto en lugar de con justify-content del padre.
    ---------------------------------------------------------------- */
    var CSS_LAYOUT = '\n' +
        /* Sticky-footer + columna vertical */
        'html { height: 100%; }\n' +
        'body {\n' +
        '  display: flex !important;\n' +
        '  flex-direction: column !important;\n' +
        '  align-items: stretch !important;\n' +
        '  justify-content: flex-start !important;\n' +
        '  min-height: 100vh !important;\n' +
        '  margin: 0 !important;\n' +
        '  padding: 0 !important;\n' +
        '}\n' +
        /* Contenedor de contenido: crece para empujar el footer,
           se centra horizontalmente con margin auto */
        '.contenedor {\n' +
        '  flex: 1 0 auto !important;\n' +
        '  margin-left: auto !important;\n' +
        '  margin-right: auto !important;\n' +
        '  padding: 20px 10px !important;\n' +
        '  box-sizing: border-box !important;\n' +
        '}\n' +
        /* Header y footer no crecen ni se encogen */
        '#site-header { flex-shrink: 0; width: 100%; }\n' +
        '#site-footer  { flex-shrink: 0; width: 100%; }\n';

    /* ----------------------------------------------------------------
       2. CSS DEL HEADER
    ---------------------------------------------------------------- */
    var CSS_HEADER =
        '.site-header {\n' +
        '  background: linear-gradient(135deg, #002f4b 0%, #005A8C 100%);\n' +
        '  color: #fff;\n' +
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.25);\n' +
        '  position: sticky;\n' +
        '  top: 0;\n' +
        '  z-index: 1000;\n' +
        '  width: 100%;\n' +
        '}\n' +
        '.header-inner {\n' +
        '  max-width: 1150px;\n' +
        '  margin: 0 auto;\n' +
        '  padding: 0 20px;\n' +
        '  display: flex;\n' +
        '  align-items: center;\n' +
        '  justify-content: space-between;\n' +
        '  height: 58px;\n' +
        '  gap: 12px;\n' +
        '}\n' +
        '.header-logo {\n' +
        '  display: flex;\n' +
        '  align-items: center;\n' +
        '  gap: 8px;\n' +
        '  text-decoration: none;\n' +
        '  color: #fff;\n' +
        '  flex-shrink: 0;\n' +
        '}\n' +
        '.header-logo-icon { font-size: 1.5rem; line-height: 1; }\n' +
        '.header-logo-texto { font-size: 1rem; line-height: 1.25; }\n' +
        '.header-logo-sub { font-weight: normal; opacity: 0.85; font-size: 0.85rem; }\n' +
        '.header-logo:hover .header-logo-texto { text-decoration: underline; }\n' +
        '.header-logo:focus { outline: 2px solid #F4EBD0; outline-offset: 3px; border-radius: 3px; }\n' +
        /* Nav links */
        '.header-nav { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }\n' +
        '.header-link {\n' +
        '  color: rgba(255,255,255,0.9);\n' +
        '  text-decoration: none;\n' +
        '  padding: 6px 11px;\n' +
        '  border-radius: 6px;\n' +
        '  font-size: 0.88rem;\n' +
        '  font-weight: 500;\n' +
        '  transition: background 0.18s, color 0.18s;\n' +
        '  white-space: nowrap;\n' +
        '}\n' +
        '.header-link:hover { background: rgba(255,255,255,0.15); color: #fff; }\n' +
        '.header-link:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; border-radius: 4px; }\n' +
        '.header-link[aria-current="page"] {\n' +
        '  background: rgba(255,255,255,0.18);\n' +
        '  color: #fff;\n' +
        '  font-weight: bold;\n' +
        '  text-decoration: underline;\n' +
        '}\n' +
        /* Hamburguesa */
        '.header-hamburger {\n' +
        '  display: none;\n' +
        '  flex-direction: column;\n' +
        '  justify-content: center;\n' +
        '  gap: 5px;\n' +
        '  width: 38px; height: 38px;\n' +
        '  background: rgba(255,255,255,0.1);\n' +
        '  border: 1px solid rgba(255,255,255,0.3);\n' +
        '  border-radius: 6px;\n' +
        '  cursor: pointer;\n' +
        '  padding: 6px 8px;\n' +
        '  flex-shrink: 0;\n' +
        '}\n' +
        '.header-hamburger span {\n' +
        '  display: block; height: 2px;\n' +
        '  background: #fff; border-radius: 2px;\n' +
        '  transition: transform 0.22s, opacity 0.22s;\n' +
        '}\n' +
        '.header-hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }\n' +
        '.header-hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }\n' +
        '.header-hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }\n' +
        /* Responsive */
        '@media (max-width: 680px) {\n' +
        '  .header-hamburger { display: flex; }\n' +
        '  .header-nav {\n' +
        '    display: none; position: absolute;\n' +
        '    top: 58px; left: 0; right: 0;\n' +
        '    background: #002f4b;\n' +
        '    flex-direction: column; align-items: stretch;\n' +
        '    padding: 10px 16px 16px;\n' +
        '    gap: 4px;\n' +
        '    box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n' +
        '    z-index: 999;\n' +
        '  }\n' +
        '  .header-nav.abierto { display: flex; }\n' +
        '  .site-header { position: relative; }\n' +
        '  .header-link { padding: 10px 12px; font-size: 0.95rem; }\n' +
        '}\n';

    /* ----------------------------------------------------------------
       3. CSS DEL FOOTER
    ---------------------------------------------------------------- */
    var CSS_FOOTER =
        '.footer-sitio {\n' +
        '  background: #5A6B7C;\n' +
        '  color: #fff;\n' +
        '  border-top: 4px solid #D36E5A;\n' +
        '  padding: 32px 0 24px;\n' +
        '  font-family: "Segoe UI", Arial, sans-serif;\n' +
        '  margin-top: 0;\n' +
        '}\n' +
        '.footer-contenido {\n' +
        '  max-width: 1150px;\n' +
        '  margin: 0 auto;\n' +
        '  padding: 0 24px;\n' +
        '  display: flex;\n' +
        '  align-items: center;\n' +
        '  justify-content: space-between;\n' +
        '  flex-wrap: wrap;\n' +
        '  gap: 18px;\n' +
        '}\n' +
        '.footer-autor { display: flex; flex-direction: column; gap: 4px; }\n' +
        '.footer-nombre { font-weight: bold; font-size: 0.97rem; }\n' +
        '.footer-centro {\n' +
        '  color: #F4EBD0; text-decoration: none;\n' +
        '  font-size: 0.88rem; transition: opacity 0.2s;\n' +
        '  display: inline-flex; align-items: center; gap: 5px;\n' +
        '}\n' +
        '.footer-centro:hover { opacity: 0.8; text-decoration: underline; }\n' +
        '.footer-centro:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; border-radius: 3px; }\n' +
        '.footer-idiomas { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }\n' +
        '.footer-idiomas-label { font-size: 0.82rem; color: rgba(255,255,255,0.7); margin-right: 2px; }\n' +
        '.btn-idioma {\n' +
        '  background: rgba(255,255,255,0.1);\n' +
        '  border: 1px solid rgba(255,255,255,0.25);\n' +
        '  color: #fff; padding: 5px 11px;\n' +
        '  border-radius: 20px; cursor: pointer;\n' +
        '  font-size: 0.8rem; font-weight: bold;\n' +
        '  font-family: inherit;\n' +
        '  transition: background 0.18s, border-color 0.18s;\n' +
        '}\n' +
        '.btn-idioma:hover { background: #D36E5A; border-color: #D36E5A; }\n' +
        '.btn-idioma:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; }\n' +
        '.btn-idioma.activo { background: #005A8C; border-color: #fff; cursor: default; }\n' +
        '.footer-copy { font-size: 0.78rem; color: rgba(255,255,255,0.55); }\n' +
        /* Toast */
        '.toast-idioma {\n' +
        '  position: fixed; bottom: 72px; left: 50%;\n' +
        '  transform: translateX(-50%) translateY(10px);\n' +
        '  background: rgba(20,20,20,0.93); color: #fff;\n' +
        '  padding: 10px 22px; border-radius: 8px;\n' +
        '  font-size: 0.93rem; opacity: 0; pointer-events: none;\n' +
        '  transition: opacity 0.28s, transform 0.28s;\n' +
        '  z-index: 9999; max-width: 90vw; text-align: center;\n' +
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.3);\n' +
        '  font-family: "Segoe UI", Arial, sans-serif;\n' +
        '}\n' +
        '.toast-idioma.visible { opacity: 1; transform: translateX(-50%) translateY(0); }\n' +
        /* Ocultar barra de Google Translate */
        '.goog-te-banner-frame.skiptranslate, .goog-te-gadget { display: none !important; }\n' +
        'body { top: 0 !important; }\n' +
        /* Botón volver arriba */
        '.btn-top {\n' +
        '  position: fixed; bottom: 22px; right: 22px;\n' +
        '  background: #005A8C; color: #fff;\n' +
        '  border: none; border-radius: 50%;\n' +
        '  width: 44px; height: 44px;\n' +
        '  font-size: 1.2rem; cursor: pointer;\n' +
        '  opacity: 0; pointer-events: none;\n' +
        '  transition: opacity 0.28s, background 0.18s, transform 0.18s;\n' +
        '  z-index: 9998;\n' +
        '  box-shadow: 0 3px 10px rgba(0,0,0,0.28);\n' +
        '  display: flex; align-items: center; justify-content: center;\n' +
        '}\n' +
        '.btn-top.visible { opacity: 1; pointer-events: auto; }\n' +
        '.btn-top:hover { background: #003F63; transform: translateY(-2px); }\n' +
        '.btn-top:focus { outline: 2px solid #F4EBD0; outline-offset: 3px; }\n' +
        /* Responsive footer */
        '@media (max-width: 640px) {\n' +
        '  .footer-contenido { flex-direction: column; align-items: center; text-align: center; padding: 0 16px; }\n' +
        '  .footer-idiomas { justify-content: center; }\n' +
        '  .footer-copy { text-align: center; }\n' +
        '}\n';

    /* ----------------------------------------------------------------
       4. MENSAJES DEL SELECTOR DE IDIOMA (Google Translate)
    ---------------------------------------------------------------- */
    var LANG_LABELS = {
        es: '🇪🇸 ES', en: '🇬🇧 EN', ar: '🇸🇦 AR',
        pl: '🇵🇱 PL', ru: '🇷🇺 RU', nl: '🇳🇱 NL', de: '🇩🇪 DE'
    };

    /* ----------------------------------------------------------------
       5. CARGAR UN ARCHIVO HTML EXTERNO
    ---------------------------------------------------------------- */
    function fetchHTML(url, cb) {
        fetch(url)
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(cb)
            .catch(function (e) { console.warn('[Almeria] No se pudo cargar ' + url, e); });
    }

    /* ----------------------------------------------------------------
       6. HEADER
    ---------------------------------------------------------------- */
    function cargarHeader() {
        var placeholder = document.getElementById('site-header');
        if (!placeholder) return;
        var raiz = getRaiz();
        fetchHTML(raiz + 'header.html', function (html) {
            // Sustituir el marcador {RAIZ} por la ruta relativa correcta
            placeholder.innerHTML = html.replace(/\{RAIZ\}/g, raiz);
            activarMenuMovil();
            marcarNavActiva();
        });
    }

    function activarMenuMovil() {
        var btn = document.getElementById('hamburger-btn');
        var nav = document.getElementById('main-nav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
            var abierto = nav.classList.toggle('abierto');
            btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
        // Cerrar al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (!btn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('abierto');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function marcarNavActiva() {
        var path = window.location.pathname;
        document.querySelectorAll('.header-link').forEach(function (a) {
            try {
                var resolved = new URL(a.getAttribute('href'), window.location.href).pathname;
                if (resolved === path) a.setAttribute('aria-current', 'page');
            } catch (e) {}
        });
    }

    /* ----------------------------------------------------------------
       7. FOOTER
    ---------------------------------------------------------------- */
    function cargarFooter() {
        var placeholder = document.getElementById('site-footer');
        if (!placeholder) return;
        fetchHTML(getRaiz() + 'footer.html', function (html) {
            placeholder.innerHTML = html;
            activarFooter();
            activarBotonTop();
            inyectarGoogleTranslate();
        });
    }

    function activarFooter() {
        var spanAno = document.getElementById('footer-año');
        if (spanAno) spanAno.textContent = new Date().getFullYear();

        var toast = document.getElementById('toast-idioma');
        document.querySelectorAll('.btn-idioma').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.dataset.lang;
                // Cambio de idioma via Google Translate
                var select = document.querySelector('.goog-te-combo');
                if (select) {
                    select.value = lang;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    document.querySelectorAll('.btn-idioma').forEach(function (b) { b.classList.remove('activo'); });
                    this.classList.add('activo');
                } else if (toast) {
                    // Google Translate no disponible: aviso
                    var msgs = {
                        en: '🇬🇧 Activando inglés…', ar: '🇸🇦 تفعيل اللغة العربية…',
                        pl: '🇵🇱 Aktywowanie polskiego…', ru: '🇷🇺 Активация русского…',
                        nl: '🇳🇱 Nederlands activeren…', de: '🇩🇪 Deutsch wird aktiviert…'
                    };
                    mostrarToast(toast, msgs[lang] || 'Cargando traductor…');
                }
            });
        });
    }

    function inyectarGoogleTranslate() {
        if (document.getElementById('gt-script')) return;
        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'es',
                includedLanguages: 'en,ar,pl,ru,nl,de',
                autoDisplay: false
            }, 'google_translate_element');
        };
        var s = document.createElement('script');
        s.id = 'gt-script';
        s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(s);
    }

    /* ----------------------------------------------------------------
       8. BOTÓN VOLVER ARRIBA
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
       9. TOAST
    ---------------------------------------------------------------- */
    var _toastTimer = null;
    function mostrarToast(el, msg) {
        el.textContent = msg;
        el.classList.add('visible');
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(function () { el.classList.remove('visible'); }, 3000);
    }

    /* ----------------------------------------------------------------
       INIT
    ---------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Inyectar estilos (orden importa)
        inyectarEstilo('almeria-layout-css', CSS_LAYOUT);
        inyectarEstilo('almeria-header-css', CSS_HEADER);
        inyectarEstilo('almeria-footer-css', CSS_FOOTER);

        // 2. Smooth scroll
        document.documentElement.style.scrollBehavior = 'smooth';

        // 3. Cargar componentes compartidos
        cargarHeader();
        cargarFooter();
    });

})();
