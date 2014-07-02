module.exports = function(grunt) {

    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    port: 8001,
                    open: true,
                    keepalive: true,
                    middleware: function (connect, options, middlewares) {
                        // inject a custom middleware 
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            //a console.log('foo') here is helpful to see if it runs
                            return next();
                        });

                        return middlewares;
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/voice-elements'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/voice-elements/**/*',
                'demo/*', 'src/*', 'index.html'
            ]
        },
        'replace': {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);

};
