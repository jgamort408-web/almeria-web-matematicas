/* ================================================================
   script.js — Funcionalidad compartida
   "Almería en cifras y formas" · Matemáticas 1.º ESO
   ================================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------------
       1. ESTILOS DEL FOOTER Y REPARACIÓN DEL LAYOUT
    ---------------------------------------------------------------- */
  /* ----------------------------------------------------------------
       1. ESTILOS DEL FOOTER Y REPARACIÓN DEL LAYOUT
    ---------------------------------------------------------------- */
    var CSS_FOOTER = [
        /* Forzar Sticky Footer y arreglar el body */
        'html { height: 100%; }',
        'body {',
        '    display: flex !important;',
        '    flex-direction: column !important;',
        '    min-height: 100vh !important;',
        '    margin: 0;',
        /* ESTA LÍNEA ES LA CLAVE: Evita que el body centre los elementos aplastándolos */
        '    align-items: stretch !important;', 
        '}',
        
        /* El contenedor principal crece para empujar el footer */
        '.contenedor {',
        '    flex: 1 0 auto !important;',
        '    width: 100%;',
        '    max-width: 1150px;',
        '    margin: 0 auto;', /* Centra el contenedor horizontalmente */
        '}',
        
        /* El contenedor del footer DEBE ocupar todo el ancho */
        '#site-footer {',
        '    flex-shrink: 0;',
        '    width: 100% !important;', /* Fuerza el 100% del ancho */
        '}',

        /* Estilos visuales del footer */
        '.footer-sitio { margin-top: 50px; background: #5A6B7C; color: #fff; border-top: 4px solid #D36E5A; padding: 25px 0; font-family: sans-serif; width: 100%; }',
        '.footer-contenido { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; flex-wrap: wrap; gap: 15px; }',
        '.footer-autor { display: flex; flex-direction: column; }',
        '.footer-nombre { font-weight: bold; }',
        '.footer-centro { color: #F4EBD0; text-decoration: none; font-size: 0.9rem; transition: 0.2s; }',
        '.footer-centro:hover { opacity: 0.8; }',
        '.footer-idiomas { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }',
        '.btn-idioma { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 6px 12px; border-radius: 20px; cursor: pointer; transition: 0.2s; }',
        '.btn-idioma:hover { background: #D36E5A; border-color: #D36E5A; }',
        '.btn-idioma.activo { background: #005A8C; border-color: #fff; font-weight: bold; }',
        '.footer-copy { font-size: 0.85rem; color: rgba(255,255,255,0.7); }',

        /* Ocultar interfaz de Google */
        '#google_translate_element { display: none !important; }',
        '.goog-te-banner-frame.skiptranslate { display: none !important; }',
        'body { top: 0px !important; }',
        
        /* Ajuste para móviles */
        '@media (max-width: 768px) { .footer-contenido { flex-direction: column; text-align: center; } }'
    ].join('\n');

    /* ----------------------------------------------------------------
       2. CONFIGURACIÓN DE GOOGLE TRANSLATE
    ---------------------------------------------------------------- */
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'es',
            includedLanguages: 'en,fr,de,ar,nl,es,ru,uk,pl',
            autoDisplay: false
        }, 'google_translate_element');
    };

    /* ----------------------------------------------------------------
       3. FUNCIONES DE APOYO
    ---------------------------------------------------------------- */
    function inyectarCSS() {
        if (document.getElementById('almeria-footer-css')) return;
        var style = document.createElement('style');
        style.id = 'almeria-footer-css';
        style.textContent = CSS_FOOTER;
        document.head.appendChild(style);
    }

    function getRutaRaiz() {
        return (/\/bloque[1-4]\//i.test(window.location.pathname)) ? '../' : '';
    }

    /* ----------------------------------------------------------------
       4. CARGAR FOOTER E INYECTAR SCRIPT
    ---------------------------------------------------------------- */
    function cargarFooter() {
        const placeholder = document.getElementById('site-footer');
        if (!placeholder) return;

        fetch(getRutaRaiz() + 'footer.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;
                activarFooter();

                // CARGAR SCRIPT DE GOOGLE TRAS INYECTAR HTML
                const script = document.createElement('script');
                script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                document.body.appendChild(script);
            })
            .catch(err => console.error("Error cargando footer:", err));
    }

    /* ----------------------------------------------------------------
       5. LÓGICA DE BOTONES (TRADUCCIÓN)
    ---------------------------------------------------------------- */
    function activarFooter() {
        var spanAno = document.getElementById('footer-año');
        if (spanAno) spanAno.textContent = new Date().getFullYear();

        document.querySelectorAll('.btn-idioma').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.getAttribute('data-lang');
                if (!lang) return;

                var selectGoogle = document.querySelector('.goog-te-combo');
                
                if (selectGoogle) {
                    selectGoogle.value = lang;
                    // El bubbles: true asegura que Google escuche el cambio
                    selectGoogle.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    document.querySelectorAll('.btn-idioma').forEach(b => b.classList.remove('activo'));
                    this.classList.add('activo');
                } else {
                    alert("El traductor está cargando. ¡Dale un segundo!");
                }
            });
        });
    }

    /* ----------------------------------------------------------------
       INIT
    ---------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        inyectarCSS();
        document.documentElement.style.scrollBehavior = 'smooth';
        cargarFooter();
        
        // Resaltar navegación
        var path = window.location.pathname;
        document.querySelectorAll('a[href]').forEach(function (a) {
            try {
                if (new URL(a.href, window.location.href).pathname === path) {
                    a.style.fontWeight = 'bold';
                    a.style.textDecoration = 'underline';
                }
            } catch (e) {}
        });
    });

})();
