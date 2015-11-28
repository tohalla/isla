'use strict';
/*globals filepath */
var fs = require('fs');

// Returns the first occurence of the version number
var parseVersionFromBuildGradle = function() {
  var versionRegex = /^version\s*=\s*[',"]([^',"]*)[',"]/gm; // Match and group the version number
  var buildGradle = fs.readFileSync('build.gradle', 'utf8');
  return versionRegex.exec(buildGradle)[1];
};

// usemin custom step
var useminAutoprefixer = {
  name: 'autoprefixer',
  createConfig: function(context, block) {
    if(block.src.length === 0) {
      return {};
    } else {
      return require('grunt-usemin/lib/config/cssmin').createConfig(context, block); // Reuse cssmins createConfig
    }
  }
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.initConfig({
    app: {
      // Application variables
      scripts: [
           // JS files to be included by includeSource task into index.html
           'scripts/app/app.js',
           'scripts/app/app.constants.js',
           'scripts/components/**/*.js',
           'scripts/app/**/*.js'
         ]
    },
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'src/main/webapp/dist'
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      ngconstant: {
        files: ['Gruntfile.js', 'build.gradle'],
        tasks: ['ngconstant:dev']
      },
      styles: {
        files: ['src/main/webapp/assets/styles/**/*.css']
      },
      includeSource: {
        // Watch for added and deleted scripts to update index.html
        files: 'src/main/webapp/scripts/**/*.js',
        tasks: ['includeSource'],
        options: {
          event: ['added', 'deleted']
        }
      }
    },
    autoprefixer: {
    // not used since Uglify task does autoprefixer,
    //  options: ['last 1 version'],
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '.tmp/styles/',
    //      src: '**/*.css',
    //      dest: '.tmp/styles/'
    //    }]
    //  }
    },
    wiredep: {
      app: {
        src: ['src/main/webapp/index.html'],
        exclude: [
          /angular-i18n/,  // localizations are loaded dynamically
          /swagger-ui/
        ]
      },
      test: {
        src: 'src/test/javascript/karma.conf.js',
        exclude: [/angular-i18n/, /swagger-ui/, /angular-scenario/],
        ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected javascripts
        devDependencies: true,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },
    includeSource: {
      // Task to include files into index.html
      options: {
        basePath: 'src/main/webapp',
        baseUrl: '',
        ordering: 'top-down'
      },
      app: {
        files: {
          'src/main/webapp/index.html': 'src/main/webapp/index.html'
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'src/main/webapp/**/*.html',
            'src/main/webapp/**/*.json',
            'src/main/webapp/assets/styles/**/*.css',
            'src/main/webapp/scripts/**/*.js',
            'src/main/webapp/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            'tmp/**/*.{css,js}'
          ]
        }
      },
      options: {
        watchTask: true,
        proxy: 'localhost:8080'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/main/webapp/scripts/app.js',
        'src/main/webapp/scripts/app/**/*.js',
        'src/main/webapp/scripts/components/**/*.js'
      ]
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/webapp/scripts',
          src: ['scripts/app/**/*.coffee', 'scripts/components/**/*.coffee'],
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    concat: {
    // not used since Uglify task does concat,
    // but still available if needed
    //  dist: {}
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/assets/styles/**/*.css',
            '<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/assets/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'src/main/webapp/**/*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
            },
              post: {}
            }
          }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/styles/**/*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/assets/styles', '<%= yeoman.dist %>/assets/images', '<%= yeoman.dist %>/assets/fonts'],
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        },
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/webapp/assets/images',
        src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/webapp/assets/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/**/*.css',
      //       'styles/**/*.css'
      //     ]
      //   }
      // }
      options: {
        root: 'src/main/webapp' // Replace relative paths for static resources with absolute path
      }
    },
    ngtemplates:  {
      dist: {
        cwd: 'src/main/webapp',
        src: ['scripts/app/**/*.html', 'scripts/components/**/*.html',],
        dest: '.tmp/templates/templates.js',
        options: {
          module: 'jhipsterApp',
          usemin: 'scripts/app.js',
          htmlmin:  {
            removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true
          }
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/main/webapp',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.html',
            'scripts/**/*.html',
            'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/images',
          dest: '<%= yeoman.dist %>/assets/images',
          src: [
            'generated/*'
          ]
        }]
      },
      generateOpenshiftDirectory: {
          expand: true,
          dest: 'deploy/openshift',
          src: [
            'pom.xml',
            'src/main/**'
          ]
      }
    },
    concurrent: {
      server: [
      ],
      test: [
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'src/test/javascript/karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    buildcontrol: {
      options: {
        commit: true,
        push: false,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      openshift: {
        options: {
          dir: 'deploy/openshift',
          remote: 'openshift',
          branch: 'master'
        }
      }
    },
    ngconstant: {
      options: {
        name: 'islaApp',
        deps: false,
        wrap: true
      },
      dev: {
        options: {
          dest: 'src/main/webapp/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'dev',
          VERSION: parseVersionFromBuildGradle()
        }
      },
      prod: {
        options: {
          dest: '.tmp/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'prod',
          VERSION: parseVersionFromBuildGradle()
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'wiredep',
    'includeSource',
    'ngconstant:dev',
    'concurrent:server',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep:test',
    'ngconstant:dev',
    'concurrent:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep:app',
    'includeSource',
    'ngconstant:prod',
    'useminPrepare',
    'ngtemplates',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'ngAnnotate',
    'cssmin',
    'autoprefixer',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('appendSkipBower', 'Force skip of bower for Gradle', function () {

    if (!grunt.file.exists(filepath)) {
      // Assume this is a maven project
      return true;
    }

    var fileContent = grunt.file.read(filepath);
    var skipBowerIndex = fileContent.indexOf('skipBower=true');

    if (skipBowerIndex != -1) {
      return true;
    }

    grunt.file.write(filepath, fileContent + '\nskipBower=true\n');
  });

  grunt.registerTask('buildOpenshift', [
    'test',
    'build',
    'copy:generateOpenshiftDirectory',
  ]);

  grunt.registerTask('deployOpenshift', [
    'test',
    'build',
    'copy:generateOpenshiftDirectory',
    'buildcontrol:openshift'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);


  grunt.registerTask('cl', 'created changelog file for liquibase', function(name){
    var time = new Date();
    var timePrefix =  ''+
                      time.getFullYear()+
                      time.getMonth()+
                      time.getDate()+
                      time.getHours()+
                      time.getMinutes()+
                      time.getSeconds();
    var open = require('open');
    var filel = 'src/main/resources/config/liquibase/changelog/'+timePrefix+'_'+name+'.xml';
    grunt.file.write(filel,
        '<?xml version="1.0" encoding="utf-8"?>\n'+
        '<databaseChangeLog\n'+
        '\txmlns="http://www.liquibase.org/xml/ns/dbchangelog"\n'+
        '\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'+
        '\txsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.4.xsd">\n\n'+
        '\t<changeSet id="'+timePrefix+'" author="">\n'+
        '\t</changeSet>\n'+
        '</databaseChangeLog>\n'
      );
    open(filel);
  });
};
