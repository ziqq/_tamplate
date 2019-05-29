/**
 * Base.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

const Base = {
    init: function() {
        this.removePreloader();
        this.tab();
        this.select.init();
        this.popup.init();

        if ($(window).width() > 768) {
            this.scrollBar();
        }

        //Stop drag Img
        $('img').on('dragstart', function(e) {
            e.preventDefault();
        });
    },
    scrollBar: function() {
        let scrollBar = $('.js-scroll');
        if (scrollBar.length) {
            scrollBar.niceScroll({
                cursorcolor: '#585a59',
                // horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                verge: 500,
                cursorwidth: '2px',
                cursorborder: 'none',
                cursorborderradius: '2'
            });
            scrollBar.on('mouseover mousedown', function() {
                $(this)
                    .getNiceScroll()
                    .resize();
            });
        }
    },
    //Remove preloader
    removePreloader: function() {
        setTimeout(() => {
            $('body').removeClass('loading');
        }, 1000);
    },
    hamburger: function() {
        let $hamburger = $('.js-hamburger');
        $hamburger.on('click', function(e) {
            if ($(this).hasClass('on')) {
                menu._close();
            } else {
                menu._open();
            }
            e.stopPropagation();
            e.preventDefault();
        });
    },
    tab: function() {
        let $tabs = $('.js-tab');
        if ($tabs.length) {
            $('.js-tab').tabs();
        }
    },
    buttons: {
        init: function() {
            this.btnGoTop();
            this.btnGoTo();
        },
        //btn scroll to top
        btnGoTop: function() {
            $('.js-go-top').on('click', function(e) {
                e.preventDefault();
                $('html, body').animate(
                    {
                        scrollTop: 0
                    },
                    800
                );
            });
        },
        //btn scroll to element
        btnGoTo: function() {
            //Click event to scroll to section whith id like href
            $('.js-goto').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var elementClick = $(this).attr('href');
                var destination = $(elementClick).offset().top;
                if ($(window).width() > 480) {
                    $('html, body').animate(
                        {
                            scrollTop: destination - 90 + 'px'
                        },
                        400
                    );
                } else {
                    $('html, body').animate(
                        {
                            scrollTop: destination - 60 + 'px'
                        },
                        400
                    );
                }
            });
        }
    },
    inputs: {
        init: function() {
            this.inputEvents();
            this.inputMask();
        },
        //Masked inputmask https://github.com/RobinHerbots/Inputmask
        inputMask: function() {
            if ($('.js-phone-mask').length) {
                $('.js-phone-mask').inputmask({
                    mask: '+7 (999) 999-99-99'
                });
            }
        },
        inputEvents: function() {
            let $bbInput = $document.find('.js-c-input');
            if ($bbInput.length) {
                $bbInput.each(function() {
                    let $parent = $(this).parent('.c-input');

                    $(this)
                        .on('focus', function() {
                            $parent.addClass('is-focus');
                        })
                        .on('blur', function() {
                            if ($(this).val() === '') {
                                $parent.removeClass('is-focus');
                            }
                        });

                    if ($(this).val() !== '') {
                        $parent.addClass('is-focus');
                    } else {
                        $parent.removeClass('is-focus');
                    }
                });
            }

            //Show Password
            $('.js-c-input-password--show').on('click', function() {
                $(this).css('display', 'none');
                $(this)
                    .next()
                    .css('display', 'block');
                $(this)
                    .parent()
                    .find('input[type="password"]')
                    .attr('type', 'text');
            });

            //Hide Password
            $('.js-c-input-password--hide').on('click', function() {
                $(this).css('display', 'none');
                $(this)
                    .prev()
                    .css('display', 'block');
                $(this)
                    .parent()
                    .find('input[type="text"]')
                    .attr('type', 'password');
            });
        }
    },
    select: {
        //Custom Select https://select2.org/
        init: function() {
            if ($('.js-select').length) {
                $('.js-select').select2();

                $('.js-select.no-search').select2({
                    minimumResultsForSearch: -1
                });
            }

            this.nativeSelect();
        },
        nativeSelect: function() {
            var $selectNative = $document.find('.js-select-native');
            if ($selectNative.length) {
                if ($window.width() > 480) {
                    $selectNative.select2({
                        minimumResultsForSearch: -1
                    });
                } else {
                    $selectNative.each(function() {
                        let _this = $(this);
                        let $parent = _this.closest('.c-input');

                        let $title = $parent.find('.c-input__title');
                        let titleText = $title.text();

                        let placeholder = _this.data('placeholder');
                        let $firstOption = _this.find('option:first-child');
                        let $newOption = $('<option>').attr({
                            disabled: 'disabled',
                            selected: 'selected'
                        });
                        let type = $parent.data('type');

                        let text;
                        if (titleText !== '' || titleText !== 'undefined') {
                            text = titleText;
                        } else if (
                            placeholder !== '' ||
                            placeholder !== 'undefined'
                        ) {
                            text = placeholder;
                        } else {
                            return;
                        }

                        if ($parent.hasClass('c-input--transform')) {
                            if ($firstOption.is(':empty')) {
                                if (type === 'selected') {
                                    $firstOption.remove();
                                    $parent.addClass('is-focus');
                                } else {
                                    $firstOption.remove();

                                    _this
                                        .removeAttr('data-placeholder')
                                        .val(text);
                                }
                                //firstOption not empty
                            } else {
                                if (type === 'selected') {
                                    $parent.addClass('is-focus');
                                } else {
                                    $newOption.prependTo(_this);
                                }
                            }
                        } else {
                            if ($firstOption.is(':empty')) {
                                $firstOption
                                    .val(placeholder)
                                    .text(placeholder)
                                    .attr({
                                        selected: 'selected',
                                        disabled: 'disabled'
                                    });
                                _this
                                    .addClass('has-placeholder')
                                    .removeAttr('data-placeholder')
                                    .val(placeholder);
                            }
                        }

                        $(this).on('change', function() {
                            if ($(this).hasClass('has-placeholder')) {
                                $(this).removeClass('has-placeholder');
                            }

                            let $firstOption = _this.find('option:first-child');
                            if ($(this).val() !== '') {
                                $parent.addClass('is-focus');

                                if ($firstOption.is(':empty')) {
                                    $firstOption.remove();
                                }
                            } else {
                                $parent.removeClass('is-focus');
                            }
                        });

                        $(this).wrap('<label class="c-select">');
                    });
                }
            }
        }
    },
    popup: {
        init: function() {
            this.popupFancyBox();
            this.reinit();
        },
        //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
        popupFancyBox: function() {
            if ($('[data-fancybox]').length) {
                $('[data-fancybox]').fancybox({
                    baseClass: 'bb-window__wrap',
                    closeClickOutside: true,
                    autoFocus: false,
                    image: {
                        preload: true
                    },
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                });
            }

            if ($('[data-fancybox="images"]').length) {
                $('[data-fancybox="image"]').fancybox({
                    baseClass: 'fancybox-container--image',
                    toolbar: true,
                    mobile: {
                        clickContent: 'close',
                        clickSlide: 'close'
                    }
                });
            }

            if ($('[data-fancybox-no-touch]').length) {
                $('[data-fancybox-no-touch]').fancybox({
                    baseClass: 'bb-window__wrap',
                    touch: false,
                    toolbar: false,
                    smallBtn: true,
                    closeClickOutside: true,
                    autoFocus: false,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                });
            }

            if ($('[data-fancybox-no-close]').length) {
                $('[data-fancybox-no-close]').fancybox({
                    baseClass: 'bb-window__wrap',
                    touch: false,
                    closeClickOutside: false,
                    // smallBtn: false,
                    autoFocus: false,
                    // modal: true,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                });
            }
        },
        reinit: function() {
            $document.on('show.bs.modal', '.modal', function(e) {});
        }
    }
};

$(function() {
    $(Base.init());
});
