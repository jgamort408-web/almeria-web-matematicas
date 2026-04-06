/* ================================================================
   script.js — Almería en cifras y formas · Matemáticas 1.º ESO
   Header y footer ya están incrustados en el HTML de cada página.
   Este archivo solo gestiona comportamiento: layout, hamburguesa,
   nav activa, idioma (Google Translate), toast, botón ↑.
   ================================================================ */
(function () {
    'use strict';

    /* ----------------------------------------------------------------
       CSS COMPARTIDO — layout + header + footer + utilidades
       Se inyecta una sola vez en <head> para que las reglas estén
       disponibles independientemente de cómo se sirva la página.
    ---------------------------------------------------------------- */
    var CSS = [
        /* --- Layout global: sticky footer vertical --- */
        'html { height: 100%; }',
        'body {',
        '  display: flex !important;',
        '  flex-direction: column !important;',
        '  align-items: stretch !important;',
        '  justify-content: flex-start !important;',
        '  min-height: 100vh !important;',
        '  margin: 0 !important;',
        '  padding: 0 !important;',
        '}',
        '.contenedor {',
        '  flex: 1 0 auto !important;',
        '  margin-left: auto !important;',
        '  margin-right: auto !important;',
        '  padding: 20px 10px !important;',
        '  box-sizing: border-box !important;',
        '}',
        '.site-header { flex-shrink: 0; width: 100%; }',
        '.footer-sitio { flex-shrink: 0; width: 100%; }',

        /* --- Header --- */
        '.site-header {',
        '  background: linear-gradient(135deg, #002f4b 0%, #005A8C 100%);',
        '  color: #fff;',
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.25);',
        '  position: sticky; top: 0; z-index: 1000;',
        '}',
        '.header-inner {',
        '  max-width: 1150px; margin: 0 auto; padding: 0 20px;',
        '  display: flex; align-items: center; justify-content: space-between;',
        '  height: 58px; gap: 12px;',
        '}',
        '.header-logo {',
        '  display: flex; align-items: center; gap: 8px;',
        '  text-decoration: none; color: #fff; flex-shrink: 0;',
        '}',
        '.header-logo-icon { font-size: 1.5rem; line-height: 1; }',
        '.header-logo-texto { font-size: 1rem; line-height: 1.25; }',
        '.header-logo-sub { font-weight: normal; opacity: 0.85; font-size: 0.85rem; }',
        '.header-logo:hover .header-logo-texto { text-decoration: underline; }',
        '.header-logo:focus { outline: 2px solid #F4EBD0; outline-offset: 3px; border-radius: 3px; }',
        '.header-nav { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }',
        '.header-link {',
        '  color: rgba(255,255,255,0.9); text-decoration: none;',
        '  padding: 6px 11px; border-radius: 6px;',
        '  font-size: 0.88rem; font-weight: 500;',
        '  transition: background 0.18s, color 0.18s; white-space: nowrap;',
        '}',
        '.header-link:hover { background: rgba(255,255,255,0.15); color: #fff; }',
        '.header-link:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; border-radius: 4px; }',
        '.header-link[aria-current="page"] {',
        '  background: rgba(255,255,255,0.18); color: #fff;',
        '  font-weight: bold; text-decoration: underline;',
        '}',
        '.header-hamburger {',
        '  display: none; flex-direction: column; justify-content: center; gap: 5px;',
        '  width: 38px; height: 38px;',
        '  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);',
        '  border-radius: 6px; cursor: pointer; padding: 6px 8px; flex-shrink: 0;',
        '}',
        '.header-hamburger span {',
        '  display: block; height: 2px; background: #fff; border-radius: 2px;',
        '  transition: transform 0.22s, opacity 0.22s;',
        '}',
        '.header-hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }',
        '.header-hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }',
        '.header-hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }',
        '@media (max-width: 680px) {',
        '  .header-hamburger { display: flex; }',
        '  .header-nav {',
        '    display: none; position: absolute;',
        '    top: 58px; left: 0; right: 0;',
        '    background: #002f4b;',
        '    flex-direction: column; align-items: stretch;',
        '    padding: 10px 16px 16px; gap: 4px;',
        '    box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 999;',
        '  }',
        '  .header-nav.abierto { display: flex; }',
        '  .site-header { position: relative; }',
        '  .header-link { padding: 10px 12px; font-size: 0.95rem; }',
        '}',

        /* --- Footer --- */
        '.footer-sitio {',
        '  background: #5A6B7C; color: #fff;',
        '  border-top: 4px solid #D36E5A;',
        '  padding: 32px 0 24px;',
        '  font-family: "Segoe UI", Arial, sans-serif;',
        '}',
        '.footer-contenido {',
        '  max-width: 1150px; margin: 0 auto; padding: 0 24px;',
        '  display: flex; align-items: center; justify-content: space-between;',
        '  flex-wrap: wrap; gap: 18px;',
        '}',
        '.footer-autor { display: flex; flex-direction: column; gap: 4px; }',
        '.footer-nombre { font-weight: bold; font-size: 0.97rem; }',
        '.footer-centro {',
        '  color: #F4EBD0; text-decoration: none; font-size: 0.88rem;',
        '  transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 5px;',
        '}',
        '.footer-centro:hover { opacity: 0.8; text-decoration: underline; }',
        '.footer-centro:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; border-radius: 3px; }',
        '.footer-idiomas { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }',
        '.footer-idiomas-label { font-size: 0.82rem; color: rgba(255,255,255,0.7); margin-right: 2px; }',
        '.btn-idioma {',
        '  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25);',
        '  color: #fff; padding: 5px 11px; border-radius: 20px; cursor: pointer;',
        '  font-size: 0.8rem; font-weight: bold; font-family: inherit;',
        '  transition: background 0.18s, border-color 0.18s;',
        '}',
        '.btn-idioma:hover { background: #D36E5A; border-color: #D36E5A; }',
        '.btn-idioma:focus { outline: 2px solid #F4EBD0; outline-offset: 2px; }',
        '.btn-idioma.activo { background: #005A8C; border-color: #fff; cursor: default; }',
        '.footer-copy { font-size: 0.78rem; color: rgba(255,255,255,0.55); }',
        '@media (max-width: 640px) {',
        '  .footer-contenido { flex-direction: column; align-items: center; text-align: center; padding: 0 16px; }',
        '  .footer-idiomas { justify-content: center; }',
        '}',

        /* --- Toast --- */
        '.toast-idioma {',
        '  position: fixed; bottom: 72px; left: 50%;',
        '  transform: translateX(-50%) translateY(10px);',
        '  background: rgba(20,20,20,0.93); color: #fff;',
        '  padding: 10px 22px; border-radius: 8px;',
        '  font-size: 0.93rem; opacity: 0; pointer-events: none;',
        '  transition: opacity 0.28s, transform 0.28s;',
        '  z-index: 9999; max-width: 90vw; text-align: center;',
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.3);',
        '  font-family: "Segoe UI", Arial, sans-serif;',
        '}',
        '.toast-idioma.visible { opacity: 1; transform: translateX(-50%) translateY(0); }',

        /* --- Botón volver arriba --- */
        '.btn-top {',
        '  position: fixed; bottom: 22px; right: 22px;',
        '  background: #005A8C; color: #fff; border: none; border-radius: 50%;',
        '  width: 44px; height: 44px; font-size: 1.2rem; cursor: pointer;',
        '  opacity: 0; pointer-events: none;',
        '  transition: opacity 0.28s, background 0.18s, transform 0.18s;',
        '  z-index: 9998; box-shadow: 0 3px 10px rgba(0,0,0,0.28);',
        '  display: flex; align-items: center; justify-content: center;',
        '}',
        '.btn-top.visible { opacity: 1; pointer-events: auto; }',
        '.btn-top:hover { background: #003F63; transform: translateY(-2px); }',
        '.btn-top:focus { outline: 2px solid #F4EBD0; outline-offset: 3px; }',

        /* --- Ocultar barra y widget de Google Translate (visualmente, no con display:none) --- */
        /* El div contenedor no puede ser display:none o GT no inyecta el <select> */
        '#google_translate_element {',
        '  position: absolute !important;',
        '  left: -9999px !important;',
        '  width: 1px !important; height: 1px !important;',
        '  overflow: hidden !important;',
        '}',
        '.goog-te-banner-frame { display: none !important; }',
        '.skiptranslate { display: none !important; }',
        'body { top: 0 !important; }'

    ].join('\n');

    /* ----------------------------------------------------------------
       INYECTAR ESTILOS
    ---------------------------------------------------------------- */
    function inyectarCSS() {
        if (document.getElementById('almeria-css')) return;
        var s = document.createElement('style');
        s.id = 'almeria-css';
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    /* ----------------------------------------------------------------
       MENÚ HAMBURGUESA
    ---------------------------------------------------------------- */
    function activarHamburguesa() {
        var btn = document.getElementById('hamburger-btn');
        var nav = document.getElementById('main-nav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
            var abierto = nav.classList.toggle('abierto');
            btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
        document.addEventListener('click', function (e) {
            if (!btn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('abierto');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ----------------------------------------------------------------
       ENLACE ACTIVO EN NAVEGACIÓN
    ---------------------------------------------------------------- */
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
       AÑO EN FOOTER
    ---------------------------------------------------------------- */
    function actualizarAnio() {
        var el = document.getElementById('footer-año');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------
       BOTÓN VOLVER ARRIBA
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
       GOOGLE TRANSLATE + SELECTOR DE IDIOMA
    ---------------------------------------------------------------- */
    var _toastTimer = null;

    function mostrarToast(msg) {
        var el = document.getElementById('toast-idioma');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('visible');
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(function () { el.classList.remove('visible'); }, 3000);
    }

    /* Espera a que GT inyecte .goog-te-combo y ejecuta el callback.
       Polling cada 100 ms, máximo 8 segundos. */
    function esperarGTCombo(cb) {
        var intentos = 0;
        var id = setInterval(function () {
            var sel = document.querySelector('.goog-te-combo');
            if (sel) { clearInterval(id); cb(sel); }
            else if (++intentos > 80) {
                clearInterval(id);
                mostrarToast('\u26a0\ufe0f Traductor no disponible. Comprueba la conexi\u00f3n.');
            }
        }, 100);
    }

    function aplicarIdioma(lang, btnPulsado) {
        esperarGTCombo(function (sel) {
            sel.value = lang;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            document.querySelectorAll('.btn-idioma').forEach(function (b) { b.classList.remove('activo'); });
            btnPulsado.classList.add('activo');
        });
    }

    function activarSelectorIdioma() {
        document.querySelectorAll('.btn-idioma').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.dataset.lang;
                var self = this;
                if (lang === 'es') {
                    /* Restaurar español via GT */
                    var sel = document.querySelector('.goog-te-combo');
                    if (sel) {
                        sel.value = '';
                        sel.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    document.querySelectorAll('.btn-idioma').forEach(function (b) { b.classList.remove('activo'); });
                    self.classList.add('activo');
                } else {
                    aplicarIdioma(lang, self);
                }
            });
        });
    }

    function inyectarGoogleTranslate() {
        if (document.getElementById('gt-script')) return;
        window.googleTranslateElementInit = function () {
            if (typeof google !== 'undefined' && google.translate) {
                new google.translate.TranslateElement({
                    pageLanguage: 'es',
                    includedLanguages: 'en,ar,pl,ru,nl,de',
                    autoDisplay: false
                }, 'google_translate_element');
            }
        };
        var s = document.createElement('script');
        s.id = 'gt-script';
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(s);
    }

    /* ----------------------------------------------------------------
       INIT
    ---------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        inyectarCSS();
        document.documentElement.style.scrollBehavior = 'smooth';
        activarHamburguesa();
        marcarNavActiva();
        actualizarAnio();
        activarBotonTop();
        activarSelectorIdioma();
        inyectarGoogleTranslate();
    });

})();
