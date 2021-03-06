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
            options: {
              livereload: true,
            }
        },
        css: {
            files: ['css/*.css'],
            options: {
              livereload: true,
            }
        },
        scss: {
            files: ['scss/*.scss'],
            tasks: ['sass']                
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
      copy: {
          html: {
              files: [{
                  expand: true,
                  dot: true,
                  cwd: 'preprocess',
                  dest: 'dist/',
                  src: [
                      '*.html'
                  ],
                  filter: 'isFile'
              }]
          },
          img: {
              files: [{
                  expand: true,
                  dot: true,
                  cwd: 'img',
                  dest: 'dist/img/',
                  src: [
                      '*.{png,jpg}'
                  ],
                  filter: 'isFile'
              }]
          },
      },
      useminPrepare: {
        src: 'index.html',
        options: {
          dest: 'dist'
        }
      },
      usemin: {
        html: 'dist/**/*.{html,js,css}',
        options: {
            dirs: ['dist/']
        }
      },
      preprocess : {
        options : {
            context : { ENV : 'production' }
        },
        prod : {
          src : 'index.html',
          dest : 'preprocess/index.html'
        }
      },
      clean: {
        tmp: ['.tmp', 'preprocess'],
        dist: 'dist'
      },
      bower: {
        install: {
          options: {
            targetDir: "components"
          }
        }
      },
      imagemin: {
          png: {
              options: {
                  optimizationLevel: 3
              },
              files: [{
                  expand: true,
                  cwd: 'img',
                  src: ['**/*.png'],
                  dest: 'dist/img/',
                  ext: '.png'
              }]
          },
          jpg: {
              options: {
                  optimizationLevel: 3,
                  progressive: true
              },
              files: [{
                  expand: true,
                  cwd: 'img',
                  src: ['**/*.jpg'],
                  dest: 'dist/img/',
                  ext: '.jpg'
              }]
          }
      },
      rev: {
        options: {
          algorithm: 'md5',
          length: 5
        },
        files: {
          src: ['dist/img/*.png']
        }
      },
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'scss',
            src: ['*.scss'],
            dest: 'css/',
            ext: '.css'
          }]
        }
      }
    });

    grunt.registerTask('dist', ['clean:dist', 'preprocess:prod', 'copy:html', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'copy:img', 'rev', 'usemin', 'autoprefixer', 'clean:tmp']); // 

    grunt.registerTask('check', ['bower', 'jshint', 'csslint']);

    grunt.registerTask('launch', ['connect', 'watch']);

    grunt.registerTask('prod', ['check', 'dist', 'launch']);
    
    grunt.registerTask('default', ['launch']);
}