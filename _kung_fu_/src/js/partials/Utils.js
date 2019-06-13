/**
 * Utils.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

App.define('Utils');

App.Utils = (function() {
    function _init() {
        console.log('Site Utils Init');
        _lazyLoadImage();
        _removeLoader();

        //Stop drag Img
        $('img').on('dragstart', function(e) {
            e.preventDefault();
        });
    }

    function _removeLoader() {
        setTimeout(() => {
            $('body').removeClass('loading');
            $('._loading').removeClass('_loading');
        }, 1000);
    }

    function _lazyLoadImage() {
        new LazyLoad({
            elements_selector: '.lazy-img',
        });
    }

    function _slideUp() {
        $(this)
            .closest('[data-container]')
            .slideUp();
    }

    function _slideToggle() {
        let OPEN_CLASS = 'is-open';
        let $container = $(this).closest('[data-container]');
        let $content = $container.find('[data-content]');

        if (!$container.hasClass(OPEN_CLASS)) {
            $content.slideDown();
            $container.addClass(OPEN_CLASS);
        } else {
            $content.slideUp();
            $container.removeClass(OPEN_CLASS);
        }
    }

    /**
     * Smooth scroll to element
     * @param el
     */
    function _scrollTo(el) {
        let element = $(el);
        if (element == null) {
            console.error('[srollTop] Element ' + el + 'not found');
            return;
        }
        $('html, body').animate(
            {
                scrollTop: element.offset().top - 90,
            },
            500
        );
    }

    return {
        init: _init,
        lazyLoadImage: _lazyLoadImage,
        removeLoader: _removeLoader,
        slideUp: _slideUp,
        slideToggle: _slideToggle,
        scrollTo: _scrollTo,
    };
})();
