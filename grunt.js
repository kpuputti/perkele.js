/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: '0.1.0',
            banner: '/*! perkele.js - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* https://github.com/kpuputti/perkele.js\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'Kimmo Puputti; Licensed MIT */'
        },
        lint: {
            all: ['grunt.js', 'src/js/perkele.js']
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/js/perkele.js>'],
                dest: 'dist/perkele.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/perkele.min.js'
            }
        },
        exec: {
            sass: {
                command: 'compass compile',
                stdout: true
            }
        },
        watch: {
            scripts: {
                files: '<config:lint.all>',
                tasks: 'lint concat min'
            },
            sass: {
                files: 'src/sass/perkele.scss',
                tasks: 'exec'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {}
        },
        uglify: {}
    });

    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', 'lint concat min exec');

};
