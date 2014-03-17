module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 7000
                  }
            }
        },
        jshint: {
            all: ['js/*.js'],
            options: {
              "curly": true,
              "eqnull": true,
              "eqeqeq": true,
              "undef": true,
              "browser": true,
              "globals": {
                "jQuery": true,
                "alert": true
              }
            }
        },
        csslint: {
            all: ['css/*.css'],
            options: {
                "box-sizing": false
            }
        },
        watch: {
            js: {
                files: ['js/*.js'],
                tasks: ['jshint'],
                options: {
                  livereload: true,
                }
            },
            css: {
                files: ['css/*.css'],
                tasks: ['csslint'],
                options: {
                  livereload: true,
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: 'dist/',
                    src: [
                        'temp/*.html'
                    ],
                    filter: 'isFile'
                }]
            }
        },
        useminPrepare: {
          src: 'index.html',
          options: {
            dest: 'dist'
          }
        },
        usemin: {
          html: 'dist/*.html',
          options: {
              dirs: ['dist/']
          }
        },
        open: {
          server: {
            path: 'http://127.0.0.1:<%= connect.server.options.port %>',
            app: 'Chrome'
          }
        },
        autoprefixer: {
          options: {
            browsers: ['last 2 versions']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'dist/css/*.css',
            dest: 'dist/css/prefixed/'
          }
        },
        /*preprocess : {
          options : {
              context : { ENV : 'production' }
          },          
          prod : {            
            src : 'index.html',
            dest : 'temp/index.prod.html'
          }
        },*/
        clean: {
          tmp: '.tmp',
          dist: 'dist'
        }
    });

    grunt.registerTask('dist', ['clean:dist', 'copy', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin', ]);
    //grunt.registerTask('dist', ['clean:dist', 'preprocess:prod', 'copy', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin', ]);

    grunt.registerTask('format', ['jshint', 'csslint']);
    
    grunt.registerTask('default', ['format', 'dist', 'autoprefixer', 'connect', 'clean:tmp', 'open', 'watch']);
}