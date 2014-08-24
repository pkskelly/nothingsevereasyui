'use strict';

module.exports = function(grunt){

    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),

        typescript:{
            options: {
                module: 'commonjs'
            },
            all: {
                src: ['js/*.ts'],
                dest: './js/_output'
            }
        },

        jshint : {
            options: {
                reporterOutput: './jshint.txt'
            },
            files: ['js/_output/js/*.js']
        },

        uglify: {
            development: {
              files: [{
                  expand: true,
                  cwd: './js/_output/js/',
                  src: '**/*.js',
                  dest: './js/_output/'
              }],
            },
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                },
                beautify: true
            }
        },

        clean: {
            options: {

            },
            folders: ['js/_output']
        },

        htmlhint : {
            templates: {
                options: {
                    'tag-pair': true,
                    'tag-self-close': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-not-empty': true
                },
                src: ['./templates/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-htmlhint");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");



    grunt.registerTask("default", ['clean','htmlhint', 'typescript','jshint','uglify', ]);

};