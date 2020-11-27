/**
 * Components.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

App.define('Components');

App.Components = (function() {
    function _init() {
        console.log('Site Components Init');
        _initDropdown();
        _initAccordeon();
        _initCheckbox();
        _initPushUp();
        _btnAnimate();
        App.Components.Input.init();
    }

    function _initDropdown() {
        Dropdown.init();
    }

    function _initAccordeon() {
        new Accordeon({ selector: '.js-c-accordeon' }).init();
    }

    function _initCheckbox() {
        new CheckBox({ selector: '.js-c-checkbox' });
        new Radio({ selector: '.js-c-radio' });
    }

    function _initPushUp() {
        $(document).on('click', '[data-push]', function() {
            let messageSuccess = $(this).attr('data-push-message-success');
            let messageError = $(this).attr('data-push-message-error');
            let delay = $(this).attr('data-push-delay') || 300;
            let timeOut = $(this).attr('data-push-timeout') || 1500;
            let status;

            setTimeout(() => {
                status = $(this).attr('data-push-status') || 'success';
            }, 100);

            setTimeout(() => {
                if (status === 'error') {
                    PushUp({
                        text: messageError,
                        status: status,
                        timeOut: timeOut,
                    });
                } else {
                    PushUp({
                        text: messageSuccess,
                        status: status,
                        timeOut: timeOut,
                    });
                }
            }, delay);
        });
    }

    function _btnAnimate() {
        let run = true;
        $(document).on('click', '.btn-animate', function(e) {
            if (run) {
                run = false;
                $(this).addClass('is-animate is-ready');

                setTimeout(() => {
                    $(this).removeClass('is-animate is-ready');
                    run = true;
                }, 2500);
                setTimeout(() => {
                    $(this).addClass('is-ready');
                }, 5000);
            }

            e.preventDefault();
        });
    }

    return {
        init: _init,
        initDropdown: _initDropdown,
        initAccordeon: _initAccordeon,
        initCheckbox: _initCheckbox,
        initPushUp: _initPushUp,
        btnAnimate: _btnAnimate,
    };
})();

App.define('Components.Input');

App.Components.Input = (function() {
    function _init() {
        console.log('Site Components Input Init');
        _initMask();
        _initFocusEvent();
        _initPasswordToggle();
    }

    function _initMask() {
        //Masked inputmask https://github.com/RobinHerbots/Inputmask
        let phoneMask = new Inputmask('+7 (999) 999-99-99');
        let inputPhone = document.querySelector('.js-phone-mask');
        if (inputPhone) {
            phoneMask.mask(inputPhone);
        }
    }

    function _initFocusEvent() {
        let $input = $document.find('.js-c-input');
        if ($input.length) {
            $input.each(function() {
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
    }

    function _initPasswordToggle() {
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

    return {
        init: _init,
        initMask: _initMask,
        initFocusEvent: _initFocusEvent,
        initPasswordToggle: _initPasswordToggle,
    };
})();

//=include ../components/Accordeon.js
//=include ../components/CheckBox.js
//=include ../components/Dropdown.js
//=include ../components/PushUp.js
