module.exports = function(grunt) {

  grunt.initConfig({
    config: grunt.file.readJSON('./config.json'),
    uglify: {
      dist: {
        files: {
          'js/app.js': ['js/app.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'index.html'
        }
      }
    },
    cssmin: {
      dist: {
        options: {
          'keepSpecialComments': '0'
        },
        files: {
          'css/main.css': ['css/main.css']
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'css/main.css': ['index.html']
        }
      }
    },
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: [".git*", "node_modules", "gulpfile.js", "Grunfile.js", "README.md", "src", "pacakge.json"],
        recursive: true
      }, 
      dist: {
        options: config.rsync
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('deploy', ['uncss', 'cssmin', 'htmlmin', 'uglify', 'rsync']);
  grunt.registerTask('compress', ['uncss', 'cssmin', 'htmlmin', 'uglify']);


};
