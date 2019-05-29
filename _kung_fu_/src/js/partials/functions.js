/**
 * functions.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

//Function Add Remove Class from Block
function addRemoveClassBlock(block, cl) {
    $(block + '--open').on('click', function() {
        $(block).addClass(cl);
    });
    $(block + '--close').on('click', function() {
        $(block).removeClass(cl);
    });
}

function addRemoveClass(block, cl) {
    $(block).on('click', function() {
        $(this).toggleClass(cl);
    });

    $(document).on('click touchstart', function(e) {
        if ($(e.target).closest(block).length) return;
        $(block).removeClass(cl);
        e.stopPropagation();
    });
}
