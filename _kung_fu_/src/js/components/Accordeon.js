/* html example Accordeon
<div class="c-accordeon js-c-accordeon">
	<div class="c-accordeon__item">
		<div class="c-accordeon__title"></div>
		<div class="c-accordeon__content"></div>
    </div>
</div>
*/

class Accordeon {
    constructor(args) {
        this.selector = args.selector;
        this.title = $(this.selector).find('[data-accordeon-title]');
        this.content = $(this.selector).find('[data-accordeon-content]');
        this.item = $(this.selector).find('.c-accordeon__item');
    }

    init() {
        if (typeof this.selector !== 'undefined') {
            this.item.each(function() {
                let $content = $(this).find('.c-accordeon__content');

                if ($(this).hasClass('is-open')) {
                    $content.slideDown();
                } else {
                    $content.slideUp();
                }
            });

            this._addIventListener();

            if ($(window).width() <= 480) {
                this._initDataAccordeon();
            }
        }
    }

    //Render arrow icon in accordeon title
    _renderIcon(insertInto) {
        let icon =
            '<svg class="icon icon-angle--bold " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.082 792.082"><path d="M317.896 396.024l304.749-276.467c27.36-27.36 27.36-71.677 0-99.037s-71.677-27.36-99.036 0L169.11 342.161c-14.783 14.783-21.302 34.538-20.084 53.897-1.218 19.359 5.301 39.114 20.084 53.897l354.531 321.606c27.36 27.36 71.677 27.36 99.037 0s27.36-71.677 0-99.036L317.896 396.024z"></path></svg>';

        $(icon).appendTo(insertInto);
    }

    //Инициализация аккордеона по дата атрибутам на разрешении < 480
    _initDataAccordeon() {
        let mainScope = this;
        let $item = $(document).find('[data-accordeon-item]');

        $('[data-accordeon]').addClass('c-accordeon js-c-accordeon');

        $('[data-accordeon]').each(function() {
            let customClass = $(this).data('accordeon-class');
            $(this).addClass(customClass);
        });

        $('[data-accordeon-title]').addClass('c-accordeon__title');

        $('[data-accordeon-title]').each(function() {
            mainScope._renderIcon($(this));
        });

        $('[data-accordeon-content]')
            .addClass('c-accordeon__content')
            .hide();

        $item.addClass('c-accordeon__item');

        $item.each(function() {
            if ($(this).attr('data-accordeon-item') === 'open') {
                $(this)
                    .addClass('is-open')
                    .find('[data-accordeon-content]')
                    .show();
            }
        });
    }

    _addIventListener() {
        $(document).on('click', '.js-c-accordeon .c-accordeon__title', e => {
            this._toggle(e);
        });
    }

    _toggle(e) {
        let $target = $(e.target);
        let $parent = $target.closest('.js-c-accordeon');
        let $item = $target.parent('.c-accordeon__item');
        let OPEN_CLASS = 'is-open';

        if ($parent.data('accordeon') === 'collapse') {
            if ($item.hasClass(OPEN_CLASS)) {
                $item
                    .removeClass(OPEN_CLASS)
                    .find('.c-accordeon__content')
                    .slideUp();
            } else {
                $parent
                    .find('.c-accordeon__item')
                    .removeClass(OPEN_CLASS)
                    .find('.c-accordeon__content')
                    .slideUp();
                $item
                    .addClass(OPEN_CLASS)
                    .find('.c-accordeon__content')
                    .slideDown();
            }
        } else {
            if ($item.hasClass(OPEN_CLASS)) {
                $item
                    .removeClass(OPEN_CLASS)
                    .find('.c-accordeon__content')
                    .slideUp();
            } else {
                $item
                    .addClass(OPEN_CLASS)
                    .find('.c-accordeon__content')
                    .slideDown();
            }
        }

        e.stopPropagation();
        e.preventDefault();
    }
}
