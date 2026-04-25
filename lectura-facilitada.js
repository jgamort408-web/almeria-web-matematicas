(function () {
    'use strict';

    var STORAGE_KEY = 'almeria_lectura_facilitada_v1';
    var AUTOOPEN_KEY = 'almeria_lectura_facilitada_open';
    var LANGUAGE_OPTIONS = [
        { code: 'es', label: 'Español', voicePrefix: 'es', locale: 'es-ES' },
        { code: 'en', label: 'English', voicePrefix: 'en', locale: 'en-US' },
        { code: 'ar', label: 'العربية', voicePrefix: 'ar', locale: 'ar-SA' },
        { code: 'pl', label: 'Polski', voicePrefix: 'pl', locale: 'pl-PL' },
        { code: 'ru', label: 'Русский', voicePrefix: 'ru', locale: 'ru-RU' },
        { code: 'nl', label: 'Nederlands', voicePrefix: 'nl', locale: 'nl-NL' },
        { code: 'de', label: 'Deutsch', voicePrefix: 'de', locale: 'de-DE' }
    ];
    var state = {
        overlay: null,
        content: null,
        langSelect: null,
        voiceSelect: null,
        speedRange: null,
        speedOutput: null,
        currentUtterance: null,
        voices: [],
        settings: {
            size: 'normal',
            contrast: 'suave',
            rate: 0.95,
            voiceURI: ''
        }
    };

    function readActiveLanguage() {
        var match = document.cookie.match(/(?:^|;)\s*googtrans=\/es\/([a-z]{2})/);
        return match ? match[1] : 'es';
    }

    function setGoogleTranslateCookie(value) {
        var paths = ['/', location.pathname];
        var domains = [location.hostname, '.' + location.hostname];

        paths.forEach(function (path) {
            document.cookie = 'googtrans=' + value + '; path=' + path + ';';
            domains.forEach(function (domain) {
                if (domain && domain !== '.') {
                    document.cookie = 'googtrans=' + value + '; path=' + path + '; domain=' + domain + ';';
                }
            });
        });
    }

    function clearGoogleTranslateCookie() {
        var expiry = '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        var paths = ['/', location.pathname];
        var domains = [location.hostname, '.' + location.hostname];

        paths.forEach(function (path) {
            document.cookie = 'googtrans=' + expiry + '; path=' + path + ';';
            domains.forEach(function (domain) {
                if (domain && domain !== '.') {
                    document.cookie = 'googtrans=' + expiry + '; path=' + path + '; domain=' + domain + ';';
                }
            });
        });
    }

    function applyLanguage(lang) {
        try {
            localStorage.setItem(AUTOOPEN_KEY, '1');
        } catch (e) {}

        var pageButton = document.querySelector('.btn-idioma[data-lang="' + lang + '"]');
        if (pageButton) {
            pageButton.click();
            return;
        }

        if (lang === 'es') {
            clearGoogleTranslateCookie();
        } else {
            setGoogleTranslateCookie('/es/' + lang);
        }

        window.location.reload();
    }

    function safeText(text) {
        return (text || '')
            .replace(/\s+/g, ' ')
            .replace(/\u00a0/g, ' ')
            .trim();
    }

    function splitIntoFriendlyParagraphs(text) {
        var clean = safeText(text);
        if (!clean) return [];

        var sentences = clean
            .replace(/([.!?])\s+/g, '$1|')
            .split('|')
            .map(function (part) { return part.trim(); })
            .filter(Boolean);

        if (!sentences.length) return [clean];

        var groups = [];
        for (var i = 0; i < sentences.length; i += 2) {
            groups.push(sentences.slice(i, i + 2).join(' '));
        }
        return groups;
    }

    function loadSettings() {
        try {
            var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            state.settings = Object.assign({}, state.settings, saved);
        } catch (e) {}
    }

    function saveSettings() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
        } catch (e) {}
    }

    function getLanguageOption() {
        var current = readActiveLanguage();
        return LANGUAGE_OPTIONS.find(function (item) {
            return item.code === current;
        }) || LANGUAGE_OPTIONS[0];
    }

    function getVoiceLangPrefix() {
        return getLanguageOption().voicePrefix;
    }

    function getSpeechLocale() {
        return getLanguageOption().locale;
    }

    function getPageTitle() {
        var h1 = document.querySelector('h1');
        return safeText(h1 ? h1.textContent : document.title);
    }

    function getPageSummary() {
        var candidates = [
            document.querySelector('.intro p'),
            document.querySelector('header p'),
            document.querySelector('.hero p'),
            document.querySelector('.procesos-dim')
        ];
        for (var i = 0; i < candidates.length; i += 1) {
            if (candidates[i] && safeText(candidates[i].textContent)) {
                return safeText(candidates[i].textContent);
            }
        }
        return 'Esta vista organiza la página en bloques claros, con texto grande y apoyo de lectura en voz.';
    }

    function inferTone(titleText, textBlob) {
        var text = (titleText + ' ' + textBlob).toLowerCase();
        if (/objetivo|aprender|meta/.test(text)) return 'objetivo';
        if (/ejercicio|tarea|practica|actividad|bloom|recordar|comprender|aplicar|analizar|evaluar|crear/.test(text)) return 'ejercicio';
        if (/paso|como|qué hacer|que hacer|instrucci|ruta/.test(text)) return 'pasos';
        if (/pdf|ficha|descarga|recurso|enlace/.test(text)) return 'recurso';
        return 'clave';
    }

    function buildCardData(title, textNodes, listItems, tone) {
        var paragraphs = [];
        textNodes.forEach(function (text) {
            splitIntoFriendlyParagraphs(text).forEach(function (p) {
                paragraphs.push(p);
            });
        });

        return {
            title: title || 'Bloque de lectura',
            paragraphs: paragraphs.filter(Boolean),
            listItems: listItems.filter(Boolean),
            tone: tone || inferTone(title || '', paragraphs.join(' ') + ' ' + listItems.join(' '))
        };
    }

    function extractRegularSections(container) {
        var cards = [];
        var sections = container.querySelectorAll(':scope > section');

        sections.forEach(function (section) {
            if (section.classList.contains('procesos-section') || section.classList.contains('seccion-presentacion')) {
                return;
            }

            var heading = section.querySelector('h2, h3');
            var title = heading ? safeText(heading.textContent) : '';
            var paragraphs = [];
            var listItems = [];

            section.querySelectorAll('p').forEach(function (p) {
                var text = safeText(p.textContent);
                if (text) paragraphs.push(text);
            });

            section.querySelectorAll('li').forEach(function (li) {
                var text = safeText(li.textContent);
                if (text) listItems.push(text);
            });

            if (!title && !paragraphs.length && !listItems.length) return;
            cards.push(buildCardData(title, paragraphs, listItems, inferTone(title, paragraphs.join(' '))));
        });

        return cards;
    }

    function extractProcessCards() {
        var cards = [];
        document.querySelectorAll('.proceso-tarjeta').forEach(function (tarjeta) {
            var title = safeText((tarjeta.querySelector('h3') || {}).textContent);
            var paragraphs = [];
            var listItems = [];

            tarjeta.querySelectorAll('.proceso-bloque, .proceso-ejercicio').forEach(function (block) {
                var text = safeText(block.textContent);
                if (text) paragraphs.push(text);
            });

            cards.push(buildCardData(
                title ? 'Proceso: ' + title : 'Proceso cognitivo',
                paragraphs,
                listItems,
                'ejercicio'
            ));
        });
        return cards;
    }

    function extractResourceCard() {
        var section = document.querySelector('.seccion-presentacion');
        if (!section) return null;

        var title = safeText((section.querySelector('h2') || {}).textContent) || 'Ficha de trabajo';
        var paragraphs = [];
        var desc = section.querySelector('.pres-info p');
        if (desc) paragraphs.push(safeText(desc.textContent));

        var link = section.querySelector('a[href$=".pdf"]');
        if (link) {
            paragraphs.push('Puedes descargar la ficha en PDF para trabajarla en papel o leerla con calma después.');
        }

        return buildCardData(title, paragraphs, [], 'recurso');
    }

    function extractContent() {
        var cards = [];
        var title = getPageTitle();
        var summary = getPageSummary();

        var hero = document.querySelector('body > header.hero-pagina, .hero');
        if (hero) {
            var heroTexts = [];
            hero.querySelectorAll('p').forEach(function (p) {
                var text = safeText(p.textContent);
                if (text) heroTexts.push(text);
            });

            if (heroTexts.length) {
                cards.push(buildCardData('Qué vas a aprender', heroTexts, [], 'objetivo'));
            }
        }

        var container = document.querySelector('.contenedor');
        if (container) {
            cards = cards.concat(extractRegularSections(container));
        }

        cards = cards.concat(extractProcessCards());

        var resource = extractResourceCard();
        if (resource) cards.push(resource);

        return {
            title: title,
            summary: summary,
            cards: cards
        };
    }

    function createElement(tag, className, text) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (typeof text === 'string') el.textContent = text;
        return el;
    }

    function getSpeakableTextFromElement(element) {
        if (!element) return '';

        var clone = element.cloneNode(true);
        clone.querySelectorAll('button').forEach(function (btn) {
            btn.remove();
        });

        return safeText(clone.innerText || clone.textContent || '');
    }

    function speakText(text, cardEl) {
        if (!('speechSynthesis' in window)) {
            alert('Tu navegador no permite lectura en voz en esta página.');
            return;
        }

        window.speechSynthesis.cancel();
        document.querySelectorAll('.lf-card.en-lectura').forEach(function (el) {
            el.classList.remove('en-lectura');
        });
        if (cardEl) cardEl.classList.add('en-lectura');

        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getSpeechLocale();
        utterance.rate = Number(state.settings.rate || 0.95);

        if (state.settings.voiceURI) {
            var selectedVoice = state.voices.find(function (voice) {
                return voice.voiceURI === state.settings.voiceURI;
            });
            if (selectedVoice) utterance.voice = selectedVoice;
        }

        utterance.onend = function () {
            if (cardEl) cardEl.classList.remove('en-lectura');
        };

        state.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    function populateVoices() {
        if (!state.voiceSelect) return;

        var langPrefix = getVoiceLangPrefix();
        state.voices = window.speechSynthesis.getVoices()
            .filter(function (voice) {
                return new RegExp('^' + langPrefix + '(-|_)', 'i').test(voice.lang);
            });

        state.voiceSelect.innerHTML = '';

        if (!state.voices.length) {
            var option = document.createElement('option');
            option.value = '';
            option.textContent = 'Voz por defecto del navegador';
            state.voiceSelect.appendChild(option);
            return;
        }

        state.voices.forEach(function (voice) {
            var option = document.createElement('option');
            option.value = voice.voiceURI;
            option.textContent = voice.name + ' (' + voice.lang + ')';
            state.voiceSelect.appendChild(option);
        });

        if (state.settings.voiceURI) {
            state.voiceSelect.value = state.settings.voiceURI;
        } else {
            state.settings.voiceURI = state.voiceSelect.value || '';
            saveSettings();
        }
    }

    function renderOverlay() {
        if (state.overlay && state.overlay.parentNode) {
            state.overlay.parentNode.removeChild(state.overlay);
            state.overlay = null;
        }

        var data = extractContent();
        var overlay = createElement('div', 'lf-overlay');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('data-size', state.settings.size);
        overlay.setAttribute('data-contrast', state.settings.contrast);

        var shell = createElement('div', 'lf-shell');
        var panel = createElement('aside', 'lf-panel');
        var main = createElement('section', 'lf-main');
        var inner = createElement('div', 'lf-main-inner');
        var cardsWrap = createElement('div', 'lf-cards');

        panel.innerHTML = ''
            + '<div class="lf-brand">'
            + '<h2>Lectura facilitada</h2>'
            + '<p>Texto grande, bloques claros y lectura en voz gratuita.</p>'
            + '</div>'
            + '<div class="lf-controls">'
            + '  <div class="lf-control-group">'
            + '    <h3>Lectura en voz</h3>'
            + '    <div class="lf-button-row">'
            + '      <button type="button" class="lf-btn" data-action="read-all">Leer todo</button>'
            + '      <button type="button" class="lf-btn secundario" data-action="pause">Pausa</button>'
            + '      <button type="button" class="lf-btn secundario" data-action="resume">Continuar</button>'
            + '      <button type="button" class="lf-btn secundario" data-action="stop">Detener</button>'
            + '    </div>'
            + '  </div>'
            + '  <div class="lf-control-group">'
            + '    <h3>Ajustes visuales</h3>'
            + '    <div class="lf-toggle-row">'
            + '      <button type="button" class="lf-chip" data-size="normal">Normal</button>'
            + '      <button type="button" class="lf-chip" data-size="grande">Grande</button>'
            + '      <button type="button" class="lf-chip" data-size="muy-grande">Muy grande</button>'
            + '    </div>'
            + '    <div class="lf-toggle-row" style="margin-top:10px;">'
            + '      <button type="button" class="lf-chip" data-contrast="suave">Contraste suave</button>'
            + '      <button type="button" class="lf-chip" data-contrast="alto">Contraste alto</button>'
            + '    </div>'
            + '  </div>'
            + '  <div class="lf-control-group">'
            + '    <label class="lf-label" for="lf-language">Idioma de la página</label>'
            + '    <select class="lf-select" id="lf-language"></select>'
            + '    <p class="lf-note">Cambia el idioma de la web completa. La página se recargará y esta vista se abrirá de nuevo.</p>'
            + '  </div>'
            + '  <div class="lf-control-group">'
            + '    <label class="lf-label" for="lf-voice">Voz</label>'
            + '    <select class="lf-select" id="lf-voice"></select>'
            + '    <label class="lf-label" for="lf-rate" style="margin-top:12px;">Velocidad</label>'
            + '    <input class="lf-range" id="lf-rate" type="range" min="0.7" max="1.2" step="0.05" value="' + String(state.settings.rate) + '">'
            + '    <span class="lf-range-output" id="lf-rate-output"></span>'
            + '  </div>'
            + '  <button type="button" class="lf-btn cerrar" data-action="close">Volver a la página</button>'
            + '</div>';

        var meta = createElement('div', 'lf-meta');
        meta.appendChild(createElement('span', 'lf-badge', 'Vista de apoyo'));
        meta.appendChild(createElement('span', 'lf-badge', document.title.replace(/\s*-\s*.*$/, '')));

        inner.appendChild(meta);
        inner.appendChild(createElement('h1', 'lf-title', data.title));
        inner.appendChild(createElement('p', 'lf-summary', data.summary));

        data.cards.forEach(function (card) {
            var article = createElement('article', 'lf-card');
            article.setAttribute('data-tone', card.tone);

            article.appendChild(createElement('h3', '', card.title));

            card.paragraphs.forEach(function (paragraph) {
                article.appendChild(createElement('p', '', paragraph));
            });

            if (card.listItems.length) {
                var ul = createElement('ul');
                card.listItems.forEach(function (item) {
                    ul.appendChild(createElement('li', '', item));
                });
                article.appendChild(ul);
            }

            var actions = createElement('div', 'lf-card-actions');
            var readBtn = createElement('button', 'lf-inline-btn', 'Escuchar este bloque');
            readBtn.type = 'button';
            readBtn.addEventListener('click', function () {
                var combined = getSpeakableTextFromElement(article);
                speakText(combined, article);
            });
            actions.appendChild(readBtn);
            article.appendChild(actions);
            cardsWrap.appendChild(article);
        });

        var help = createElement('div', 'lf-help');
        help.innerHTML = '<h3>Cómo usar esta vista</h3><p>Lee bloque a bloque. Si un texto es largo, usa el botón de escuchar. Puedes subir el tamaño del texto y bajar la velocidad de lectura para seguirlo con más calma.</p>';
        inner.appendChild(cardsWrap);
        inner.appendChild(help);
        main.appendChild(inner);
        shell.appendChild(panel);
        shell.appendChild(main);
        overlay.appendChild(shell);
        document.body.appendChild(overlay);

        state.overlay = overlay;
        state.content = data;
        state.langSelect = overlay.querySelector('#lf-language');
        state.voiceSelect = overlay.querySelector('#lf-voice');
        state.speedRange = overlay.querySelector('#lf-rate');
        state.speedOutput = overlay.querySelector('#lf-rate-output');

        state.speedOutput.textContent = Number(state.settings.rate).toFixed(2) + 'x';

        LANGUAGE_OPTIONS.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.code;
            option.textContent = item.label;
            state.langSelect.appendChild(option);
        });
        state.langSelect.value = readActiveLanguage();

        populateVoices();

        overlay.querySelectorAll('[data-size]').forEach(function (btn) {
            btn.classList.toggle('activo', btn.getAttribute('data-size') === state.settings.size);
            btn.addEventListener('click', function () {
                state.settings.size = btn.getAttribute('data-size');
                overlay.setAttribute('data-size', state.settings.size);
                overlay.querySelectorAll('[data-size]').forEach(function (chip) {
                    chip.classList.toggle('activo', chip.getAttribute('data-size') === state.settings.size);
                });
                saveSettings();
            });
        });

        overlay.querySelectorAll('[data-contrast]').forEach(function (btn) {
            btn.classList.toggle('activo', btn.getAttribute('data-contrast') === state.settings.contrast);
            btn.addEventListener('click', function () {
                state.settings.contrast = btn.getAttribute('data-contrast');
                overlay.setAttribute('data-contrast', state.settings.contrast);
                overlay.querySelectorAll('[data-contrast]').forEach(function (chip) {
                    chip.classList.toggle('activo', chip.getAttribute('data-contrast') === state.settings.contrast);
                });
                saveSettings();
            });
        });

        state.voiceSelect.addEventListener('change', function () {
            state.settings.voiceURI = state.voiceSelect.value;
            saveSettings();
        });

        state.langSelect.addEventListener('change', function () {
            applyLanguage(state.langSelect.value);
        });

        state.speedRange.addEventListener('input', function () {
            state.settings.rate = Number(state.speedRange.value);
            state.speedOutput.textContent = state.settings.rate.toFixed(2) + 'x';
            saveSettings();
        });

        overlay.querySelector('[data-action="read-all"]').addEventListener('click', function () {
            var parts = [];
            var titleEl = overlay.querySelector('.lf-title');
            var summaryEl = overlay.querySelector('.lf-summary');
            if (titleEl) parts.push(getSpeakableTextFromElement(titleEl));
            if (summaryEl) parts.push(getSpeakableTextFromElement(summaryEl));
            overlay.querySelectorAll('.lf-card').forEach(function (cardEl) {
                var text = getSpeakableTextFromElement(cardEl);
                if (text) parts.push(text);
            });
            var text = parts.join('. ');
            speakText(text, null);
        });

        overlay.querySelector('[data-action="pause"]').addEventListener('click', function () {
            window.speechSynthesis.pause();
        });

        overlay.querySelector('[data-action="resume"]').addEventListener('click', function () {
            window.speechSynthesis.resume();
        });

        overlay.querySelector('[data-action="stop"]').addEventListener('click', function () {
            window.speechSynthesis.cancel();
            document.querySelectorAll('.lf-card.en-lectura').forEach(function (el) {
                el.classList.remove('en-lectura');
            });
        });

        overlay.querySelector('[data-action="close"]').addEventListener('click', closeOverlay);
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) closeOverlay();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && overlay.classList.contains('abierto')) {
                closeOverlay();
            }
        });
    }

    function openOverlay() {
        renderOverlay();
        state.overlay.classList.add('abierto');
        state.overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeOverlay() {
        if (!state.overlay) return;
        state.overlay.classList.remove('abierto');
        state.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        window.speechSynthesis.cancel();
        document.querySelectorAll('.lf-card.en-lectura').forEach(function (el) {
            el.classList.remove('en-lectura');
        });
    }

    function createTrigger() {
        var trigger = createElement('button', 'lf-trigger', 'Lectura facilitada');
        trigger.type = 'button';
        trigger.setAttribute('aria-label', 'Abrir vista de lectura facilitada');
        trigger.addEventListener('click', openOverlay);
        document.body.appendChild(trigger);
    }

    function init() {
        loadSettings();
        createTrigger();
        try {
            if (localStorage.getItem(AUTOOPEN_KEY) === '1') {
                localStorage.removeItem(AUTOOPEN_KEY);
                window.addEventListener('load', function () {
                    window.setTimeout(openOverlay, 1400);
                });
            }
        } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', init);
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
    }
})();
