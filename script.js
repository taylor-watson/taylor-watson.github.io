// Taylor Watson — personal site

(function () {
    'use strict';

    // --- Abstract disclosures -------------------------------------------

    document.querySelectorAll('.abstract-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var panel = document.getElementById(btn.dataset.abstract);
            if (!panel) return;
            var shown = panel.classList.toggle('show');
            btn.classList.toggle('active', shown);
            btn.setAttribute('aria-expanded', String(shown));
        });
    });

    // --- Tabs ------------------------------------------------------------

    var tabs = Array.prototype.slice.call(document.querySelectorAll('.nav-btn'));

    function showTab(name) {
        document.querySelectorAll('.tab-content').forEach(function (panel) {
            var on = panel.id === name + '-tab';
            panel.classList.toggle('active', on);
            panel.hidden = !on;
        });

        tabs.forEach(function (btn) {
            var on = btn.dataset.tab === name;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-selected', String(on));
            btn.tabIndex = on ? 0 : -1;
        });
    }

    tabs.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
            showTab(btn.dataset.tab);
        });

        // Left/right arrows move between tabs, per the ARIA tabs pattern.
        btn.addEventListener('keydown', function (e) {
            var step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            var next = tabs[(i + step + tabs.length) % tabs.length];
            showTab(next.dataset.tab);
            next.focus();
        });
    });
})();
