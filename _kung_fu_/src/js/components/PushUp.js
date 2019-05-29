//PushUp
function pushUp(options) {
    var text = options.text || 'Вам новая заявка';
    var status = options.status || 'success';
    var timeOut = options.timeOut || 3000;

    var $pushContainer = $('<div>').addClass('push-up push-up--center');
    var $pushIconSuccess = $(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="611.994px" height="611.994px" viewBox="0 0 611.994 611.994"
        xml:space="preserve" class="push-up__icon">
            <path d="M248.172,423.918l-89.545-89.534c-5.637-5.637-5.637-14.778,0-20.416c5.643-5.644,14.78-5.644,20.417,0l69.128,69.122
                l184.796-184.802c5.644-5.643,14.78-5.643,20.417,0c5.644,5.637,5.644,14.78,0,20.417L248.172,423.918z"/>
                <path d="M306.031,611.994v-14.438l-0.022,14.438C137.286,611.994,0.012,474.726,0,306.003C0,137.274,137.274,0,305.997,0
                    c168.729,0,305.997,137.274,305.997,305.997C612,474.726,474.743,611.994,306.031,611.994z M305.997,28.878
                    c-152.805,0-277.119,124.314-277.119,277.119C28.89,458.796,153.209,583.11,306.009,583.11h0.022
                    c152.788,0,277.091-124.314,277.091-277.113C583.122,153.192,458.802,28.878,305.997,28.878z"/>
        </svg>`
    );

    var $pushIconError = $(
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 78.561 78.561" xml:space="preserve" class="push-up__icon">
            <circle cx="39.28" cy="57.772" r="3.632"/>
            <path d="M38.792,48.347c1.104,0,2-0.896,2-2v-19c0-1.104-0.896-2-2-2s-2,0.896-2,2v19C36.792,47.451,37.688,48.347,38.792,48.347z
                "/>
            <path d="M46.57,11.542l-0.091-0.141c-1.852-2.854-3.766-5.806-7.199-5.806c-3.578,0-5.45,2.994-7.26,5.891
                c-0.009,0.014-0.065,0.104-0.074,0.119L0.278,65.266C0.096,65.574,0,65.735,0,66.092c0,3.896,3.135,6.874,6.988,6.874h64.585
                c3.854,0,6.988-2.979,6.988-6.874c0-0.357-0.096-0.614-0.277-0.921L46.57,11.542z M71.573,68.966H6.988
                c-1.461,0-2.717-0.951-2.95-2.394l31.374-53.061c1.554-2.487,2.572-3.963,3.868-3.963c1.261,0,2.457,1.87,3.843,4.006
                l31.399,53.007C74.29,68.003,73.034,68.966,71.573,68.966z"/>
        </svg>
`
    );

    $pushContainer.appendTo($('body'));
    $pushContainer.text(text);

    if (status === 'error') {
        $pushContainer.addClass('is-error');
        $pushIconError.prependTo($pushContainer);
    } else {
        $pushContainer.addClass('is-success');
        $pushIconSuccess.prependTo($pushContainer);
    }

    poshPos();

    window.requestAnimationFrame(function() {
        $pushContainer.addClass('is-active');
    });

    setTimeout(function() {
        $pushContainer.removeClass('is-active');
        poshPos();
    }, 3000);

    setTimeout(function() {
        $pushContainer.remove();
        poshPos();
    }, 3500);

    $(document).on('click', '.js-push-up--close', function() {
        let $parent = $(this).closest('.push-up');
        $parent.removeClass('is-active');
        setTimeout(function() {
            $parent.remove();
        }, 300);
        poshPos();
    });

    function poshPos() {
        $('.push-up').each(function(e) {
            let height = $('.push-up').outerHeight(true);
            $(this).css('top', height * e + 10 + e);
        });
    }
}
