/*jslint white: true, devel: true, onevar: false, undef: true, nomen: false,
  regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50,
  indent: 4 */
/*global window: false, document: false */

(function () {

    var log = function () {
        if (window.console && console.log && console.log.apply) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('perkele:');
            console.log.apply(console, args);
        }
    };

    var perkele = {
        currentIndex: null,
        slides: []
    };

    // Show slide with the given index
    perkele.show = function (index) {
        if (index < 0 || index >= perkele.slides.length) {
            return;
        }
        var current = document.querySelector('article.current');
        if (current) {
            current.className = '';
        }
        perkele.slides[index].className = 'current';
        perkele.currentIndex = index;
    };

    // Show previous slide
    perkele.prev = function () {
        if (perkele.currentIndex !== null) {
            log('prev');
            perkele.show(perkele.currentIndex - 1);
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

    window.addEventListener('DOMContentLoaded', perkele.start, false);

}());
