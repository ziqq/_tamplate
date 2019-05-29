/* html example
<div class="bb-accordeon js-bb-accordeon">
	<div class="bb-accordeon__item">
		<div class="bb-accordeon__title"></div>
		<div class="bb-accordeon__content"></div>
    </div>
</div>
*/

(function() {
    let $accordeon = $('.js-bb-accordeon');
    let $content = $accordeon.find('.bb-accordeon__content');
    let $item = $accordeon.find('.bb-accordeon__item');

    if ($accordeon.length) {
        $content.slideUp();
        $item.each(function() {
            if ($(this).hasClass('is-open')) {
                $(this)
                    .find('.bb-accordeon__content')
                    .slideDown();
            }
        });
    }

    $(document).on(
        'click',
        '.js-bb-accordeon .bb-accordeon__title',
        function() {
            let $parent = $(this).closest('.js-bb-accordeon');
            let $item = $(this).parent('.bb-accordeon__item');

            if ($parent.data('accordeon') === 'collapse') {
                if ($item.hasClass('is-open')) {
                    $item
                        .removeClass('is-open')
                        .find('.bb-accordeon__content')
                        .slideUp();
                } else {
                    $parent
                        .find('.bb-accordeon__item')
                        .removeClass('is-open')
                        .find('.bb-accordeon__content')
                        .slideUp();
                    $item
                        .addClass('is-open')
                        .find('.bb-accordeon__content')
                        .slideDown();
                }
            } else {
                if ($item.hasClass('is-open')) {
                    $item
                        .removeClass('is-open')
                        .find('.bb-accordeon__content')
                        .slideUp();
                } else {
                    $item
                        .addClass('is-open')
                        .find('.bb-accordeon__content')
                        .slideDown();
                }
            }
        }
    );
})();
