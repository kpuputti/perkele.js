/*! perkele.js - v0.1.0 - 2012-05-04
* https://github.com/kpuputti/perkele.js
* Copyright (c) 2012 Kimmo Puputti; Licensed MIT */

/*global window: false, document: false, define: false */

(function () {

    var log = function () {
        if (window.console && console.log && console.log.apply) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('perkele:');
            console.log.apply(console, args);
        }
    };

    var perkele = {
        busy: false,
        currentIndex: null,
        slides: []
    };

    // Show slide with the given index
    perkele.show = function (index, reverse) {
        log('show index:', index, 'with current:', perkele.currentIndex);
        if (perkele.busy || index < 0 || index >= perkele.slides.length) {
            log('cannot show');
            return;
        }
        if (perkele.currentIndex === null) {
            log('no current, show:', index);
            perkele.slides[index].className = 'current';
            perkele.currentIndex = index;
            return;
        }
        perkele.busy = true;

        var width = window.innerWidth;
        var current = perkele.slides[perkele.currentIndex];
        var next = perkele.slides[index];
        var currentStyle = current.style;
        var nextStyle = next.style;

        log('from', perkele.currentIndex, 'to', index);

        currentStyle.width = width + 'px';
        nextStyle.width = width + 'px';

        currentStyle.left = '0';
        nextStyle.left = (reverse ? '-100%' : '100%') + 'px';

        var rev = reverse ? '-reverse' : '';
        current.className = 'animate-from' + rev;
        next.className = 'current animate-to' + rev;

        window.setTimeout(function () {
            current.className = '';
            next.className = 'current';

            currentStyle.left = '0';
            nextStyle.left = '0';

            perkele.currentIndex = index;
            perkele.busy = false;
        }, 500);
    };

    // Show previous slide
    perkele.prev = function () {
        if (perkele.currentIndex !== null) {
            log('prev');
            perkele.show(perkele.currentIndex - 1, true);
        }
    };

    // Show next slide
    perkele.next = function () {
        if (perkele.currentIndex !== null) {
            log('next');
            perkele.show(perkele.currentIndex + 1);
        }
    };

    // Handle keyboard event for arrow navigation
    perkele._onKeyUp = function (event) {
        var key = event.keyCode;
        log('key up:', event, 'with key code:', key);
        if (key === 37) {
            // arrow left
            perkele.prev();
        } else if (key === 39) {
            // arrow right
            perkele.next();
        }
    };

    // Start slide framework
    perkele.start = function () {
        log('start');
        perkele.slides = document.querySelectorAll('article');
        if (perkele.slides.length > 0) {
            perkele.show(0);
        }
        document.body.addEventListener('keyup', perkele._onKeyUp, false);
    };

    // Add AMD support for an AMD environment, or expose as global
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return perkele;
        });
    } else {
        window.perkele = perkele;
    }

    window.addEventListener('DOMContentLoaded', perkele.start, false);

}());
