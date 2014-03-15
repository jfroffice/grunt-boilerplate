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
                        '*.html'                        
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
          html: 'dist/index.html',
          options: {
              dirs: ['dist/']
          }         
        },
        open: {
          server: {
            path: 'http://localhost:<%= connect.server.options.port %>'
          }
        }
    });

    grunt.registerTask('dist', ['copy', 'useminPrepare', 'usemin', 'concat', 'uglify']);
        
    grunt.registerTask('default', ['jshint', 'csslint', 'dist', 'connect', 'open', 'watch']);
}