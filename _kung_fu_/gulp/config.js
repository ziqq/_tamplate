import util from 'gulp-util';

const production =
    util.env.production ||
    util.env.prod ||
    util.env._.indexOf('build') !== -1 ||
    false;
const destPath = 'build';

const config = {
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

        static: 'src/static',
        img: 'src/static/img',
        iconsPng: 'src/static/icons/png',
        iconsSvg: 'src/static/icons/svg',
        iconsFont: 'src/static/img/icons',
        fonts: 'src/static/fonts',

        images: 'src/images',

        libs: 'src/libs',
    },
    dest: {
        root: destPath,
        html: destPath,
        static: destPath + '/static',
        css: destPath + '/css',
        js: destPath + '/js',
        jsAssets: destPath + '/js/assets',
        jsData: destPath + '/js/data',
        jsTemp: destPath + '/js/temp',
        img: destPath + '/static/img',
        images: destPath + '/images',
        iconsSvg: destPath + '/static/icons/svg',
        iconsPng: destPath + '/static/icons/png',
        sprite: destPath + '/static/sprite',
        fonts: destPath + '/static/fonts',
        libs: destPath + '/libs',
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
    errorHandler: require('./util/handle-errors'),
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
