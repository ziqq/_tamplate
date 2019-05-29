var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
    env: 'development',
    production: production,

    src: {
        none: '',
        root: 'src',
        components: 'src/components',
        templates: 'src/templates',
        templatesData: 'src/data',
        pagelist: 'src/index.yaml',

        sass: 'src/sass',
        sassGen: 'src/sass/generated',

        js: 'src/js',
        jsAssets: 'src/js/assets',
        jsData: 'src/js/data',
        jsTemp: 'src/js/temp',

        files: 'src/files',
        img: 'src/files/img',
        iconsPng: 'src/files/icons/png',
        iconsSvg: 'src/files/icons/svg',
        iconsFont: 'src/files/img/icons',
        fonts: 'src/files/fonts',

        images: 'src/images',

        libs: 'src/libs'
    },
    dest: {
        root: destPath,
        html: destPath,
        files: destPath + '/files',
        css: destPath + '/css',
        js: destPath + '/js',
        jsAssets: destPath + '/js/assets',
        jsData: destPath + '/js/data',
        jsTemp: destPath + '/js/temp',
        img: destPath + '/files/img',
        images: destPath + '/images',
        iconsSvg: destPath + '/files/icons/svg',
        iconsPng: destPath + '/files/icons/png',
        sprite: destPath + '/files/sprite',
        fonts: destPath + '/files/fonts',
        libs: destPath + '/libs'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
