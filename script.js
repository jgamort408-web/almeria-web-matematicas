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
        /* Forzar Sticky Footer */
        'html, body { height: 100% !important; margin: 0; }',
        'body { display: flex !important; flex-direction: column !important; min-height: 100vh !important; }',
        '#site-footer { margin-top: auto !important; width: 100%; }',

        /* Estilos visuales */
        '.footer-sitio { background: #5A6B7C; color: #fff; border-top: 4px solid #D36E5A; padding: 20px 0; }',
        '.footer-contenido { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; flex-wrap: wrap; }',
        '.footer-idiomas { display: flex; gap: 8px; align-items: center; }',
        '.btn-idioma { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 5px 10px; border-radius: 4px; cursor: pointer; }',
        '.btn-idioma.activo { background: #005A8C; }',
        
        /* La línea que te daba error, ahora limpia */
        '.footer-copy { font-size: 0.8rem; color: rgba(255, 255, 255, 0.55); }',

        /* Ocultar interfaz de Google */
        '#google_translate_element { display: none !important; }',
        '.goog-te-banner-frame.skiptranslate { display: none !important; }',
        'body { top: 0px !important; }'
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

   /* --- Nueva función para el traductor --- */
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'es',
            includedLanguages: 'en,fr,de,ar,nl,es,ru,uk,pl',
            autoDisplay: false
        }, 'google_translate_element');
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
    const placeholder = document.getElementById('site-footer'); // o 'common-footer-placeholder'
    if (!placeholder) return;

    fetch('footer.html') // Asegúrate de que la ruta sea correcta
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;

            // CARGAR GOOGLE TRANSLATE JUSTO AHORA
            window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                    pageLanguage: 'es',
                    includedLanguages: 'en,fr,de,ar,nl,es,ru,uk,pl',
                    autoDisplay: false
                }, 'google_translate_element');
            };

            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        });
}

    /* ----------------------------------------------------------------
       6. LÓGICA INTERNA DEL FOOTER
    ---------------------------------------------------------------- */
    function activarFooter() {
        // Año del copyright
        var spanAno = document.getElementById('footer-año');
        if (spanAno) spanAno.textContent = new Date().getFullYear();

        // Selector de idioma (TRADUCCIÓN REAL)
        document.querySelectorAll('.btn-idioma').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.dataset.lang;
                
                // Cambiar clase activa visualmente
                document.querySelectorAll('.btn-idioma').forEach(b => b.classList.remove('activo'));
                this.classList.add('activo');

                // Ejecutar traducción de Google
                var selectGoogle = document.querySelector('.goog-te-combo');
                if (selectGoogle) {
                    selectGoogle.value = lang;
                    selectGoogle.dispatchEvent(new Event('change'));
                }
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
