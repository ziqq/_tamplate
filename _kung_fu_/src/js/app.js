/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

//Global Vars
const $window = $(window);
const $document = $(document);
const $html = $('html');
const $wrapper = $('.wrapper');
const $header = $('.header');
const $main = $('.main');
const $overlay = $('.js-overlay');

const App = {
    init() {
        console.log('Site init');
        this.Components.init();
        this.Utils.init();
    },
};

App.define = function(namespace) {
    var parts = namespace.split('.'),
        parent = App,
        i;

    //Убрать  начальный префикс если это являетсся глобальной переменной
    if (parts[0] == 'App') {
        parts = parts.slice(1);
    }

    //Если в глобальном объекте  нет  свойства  - создать  его.
    for (var i = 0; i < parts.length; i++) {
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

//=include partials/Components.js
//=include partials/Utils.js

$(function() {
    App.init();
});
