/* html example
<div class="bb-dropdown bb-dropdown--small bb-dropdown--transform bb-dropdown--hover js-bb-dropdown" data-dropdown-position="right">
	<div class="bb-dropdown__list">
	</div>
</div>
*/

const Dropdown = (function() {
    let $overlay = $('.js-overlay');

    let dropdown = {};
    let $dropdown = $(document).find('.js-bb-dropdown');
    let $btnDropdownClose = $(
        '<i class="fal fa-times js-bb-dropdown--close"></i>'
    );
    let $btnFloating = $(document).find('.js-btn-floating');
    let ACTIVE_CLASS = 'is-active';
    let VISIBLE_CLASS = 'is-visible';
    let DROPDOWN_OWERLAY_CLASS = 'overlay--dropdown';
    let _this, $list;
    let open = false;

    let styleTransform = {
        position: 'fixed',
        top: 'auto',
        bottom: 10,
        left: 10,
        right: 10,
        zIndex: 9999
    };

    let style = {
        position: 'fixed',
        top: 60,
        left: 10,
        right: 10,
        zIndex: 9999
    };

    dropdown.init = function() {
        if ($dropdown.length) {
            if ($(window).width() <= 768) {
                $dropdown.removeClass('bb-dropdown--hover');
            }
            dropdown.render();
            dropdown.events();
        }
    };

    //Добавляем и отрисовываем мобильный дропдаун
    dropdown.render = function() {
        if ($(window).width() <= 768) {
            let $dropdown = $(document).find(
                '.js-bb-dropdown.bb-dropdown--transform'
            );
            $dropdown.each(function() {
                let $btnClose = $(
                    '<button class="bb-dropdown__close js-bb-dropdown--close">Закрыть</button>'
                );
                let $dropdownOverlay = $('<div class="bb-dropdown__overlay">');

                let $dropdownList = $(this).find('.bb-dropdown__list');

                $btnClose.appendTo($dropdownList);
                $dropdownOverlay.insertAfter($dropdownList);
                $dropdownList.find('.info-block__icon').remove();
            });
        }
    };

    //Эвенты кликов по основным элементам
    dropdown.events = function() {
        $(document).on('click', '.js-bb-dropdown', function(e) {
            _this = $(this);
            $list = $(this).find('.bb-dropdown__list');

            //Активируем оверлей, если клик не поклассу bb-dropdown--another
            if (!$(this).hasClass('bb-dropdown--another')) {
                $overlay.addClass(DROPDOWN_OWERLAY_CLASS);
            }

            if ($(window).width() > 768) {
                dropdown._toggle($(this));
            } else {
                if (!$(this).hasClass('bb-dropdown--another')) {
                    $btnFloating.fadeOut();
                    open = true;

                    //Анимация выпадающего списка
                    $list.insertAfter('.wrapper');
                    setTimeout(() => {
                        $list.addClass(VISIBLE_CLASS);
                    }, 200);

                    if ($(this).hasClass('bb-dropdown--transform')) {
                        $list.css(styleTransform).addClass('_transform');
                    } else {
                        $btnDropdownClose.prependTo($list);
                        $list.css(style).addClass('_transform_info');
                    }
                } else {
                    dropdown._toggle($(this));
                }
            }

            e.stopPropagation();
        });

        //Toggle fixed class from body
        $(document).on('click', '.js-bb-dropdown.request-info', function(e) {
            if ($(window).width() <= 480) {
                if (!open) {
                    $('html').addClass('is-fixed');
                    open = true;
                } else {
                    $('html').removeClass('is-fixed');
                    open = false;
                }
            }
        });

        //Скрываем дропдаун по клику в не блока
        // $(document).on('click', function(e) {
        //     if ($(e.target).closest('.js-bb-dropdown').length) return;
        //     $dropdown.removeClass(ACTIVE_CLASS);
        //     open = false;
        // });

        //По клику на оверлей скрываем дропдаун
        $(document).on('click', '.overlay--dropdown', function() {
            open = false;
            $dropdown.removeClass(ACTIVE_CLASS);
            dropdown._close();
            $btnFloating.fadeIn();
        });

        $(document).on(
            'click',
            '.bb-dropdown__list .info-block__item',
            function() {
                $dropdown.removeClass(ACTIVE_CLASS);
                dropdown._close();
                $btnFloating.fadeIn();
            }
        );

        //По клику на кнопку закрыть скрываем дропдаун
        $(document).on('click', '.js-bb-dropdown--close', function(e) {
            $btnFloating.fadeIn();
            dropdown._close();
            e.stopPropagation();
        });
    };

    dropdown._toggle = function(el) {
        if (!open) {
            el.addClass(ACTIVE_CLASS);
            $btnFloating.fadeIn();
            open = true;
        } else {
            $dropdown.removeClass(ACTIVE_CLASS);
            el.removeClass(ACTIVE_CLASS);
            open = false;

            if (
                el.hasClass('bb-dropdown--transform') &&
                $(window).width() <= 480
            ) {
                $btnFloating.fadeOut();
            }
        }
    };

    dropdown._close = function() {
        setTimeout(() => {
            $list.removeClass(VISIBLE_CLASS);
            _this.removeClass(ACTIVE_CLASS);
            $btnFloating.fadeIn();
        }, 100);

        setTimeout(() => {
            $list
                .removeAttr('style')
                .removeClass('_transform')
                .removeClass('_transform_info')
                .appendTo(_this);
            $overlay.removeClass('overlay--dropdown');
        }, 300);
    };

    open = false;

    return dropdown;
})();
