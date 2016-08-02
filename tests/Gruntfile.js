module.exports = function ( grunt ) {
  'use strict';

  require( 'jit-grunt' )( grunt , {
    'start-selenium-server': 'grunt-selenium-server'
  });


  var seleniumFileName = 'selenium-server-standalone-2.48.2.jar';
  var seleniumURL      = 'http://selenium-release.storage.googleapis.com/2.48/' + seleniumFileName  
  var isWindows     = /^win/.test( process.platform );
  var chromedriver  = false;

  grunt.initConfig({
  
      selenium: {
        options: {
          stdout: true
        },
        command: 'java -jar node_modules/selenium-server/' + seleniumFileName +' -Dwebdriver.chrome.driver=node_modules/selenium-server/chromedriver.exe' 

      },

    intern : {
      'unit': {
        options: {
          config: 'support/intern-unit',
          runType: 'client'
        }
      },
      'func': {
        options: {
          config: 'support/intern-func',
          runType: 'runner'
        }
      }
    },
    curl: {
      selenium : {
        src: {
            url: seleniumURL,
            proxy: '' /* http://user:password@proxyHostName:proxyPort' */
          },
        dest: 'node_modules/selenium-server/' + seleniumFileName
      }
    },
    'start-selenium-server': {
      dev: {
        options: {
          autostop: true,
          downloadUrl: seleniumURL,
          downloadLocation: 'node_modules/selenium-server',
          serverOptions: {},
          systemProperties: {}
        }
      }
    },
    'stop-selenium-server': {
      dev: {}
    },
        // make a zipfile
    'compress': {
      main: {
        options: {
          archive: '../extensions/chrome.zip'
        },
        files: [
          {src: ['../extensions/chrome/**']}, // includes files in path and its subdirs
        ]
      }
    }
  } );

  grunt.registerTask( 'dist' , 'Generating Dist for Chrome DEV', [
    'compress:main'
  ] );
  grunt.registerTask( 'test' , 'Running Tests.', [
    'selenium-run',
    
    'intern:func'
  ] );
  grunt.registerTask( 'test-func' , 'Running Functional Tests.', [
    'selenium-run',
    'intern:func'
  ] );
  grunt.registerTask( 'test-unit' , 'Running Unit Tests.', [
    'intern:unit'
  ] );

  grunt.registerTask( 'selenium-run' , 'Running selenium in background (while Grunt is running).', function() {
    var tasks = [];
    if ( ! grunt.file.exists( 'node_modules/selenium-server/' + seleniumFileName ) ){
      tasks.push('curl:selenium');
    }
    tasks.push('start-selenium-server:dev');
    grunt.task.run( tasks );
  });

  //grunt --help to list grunt tasks

};
