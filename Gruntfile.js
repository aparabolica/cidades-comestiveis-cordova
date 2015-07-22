module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			all: {
				options: {
					transform: ['browserify-shim']
				},
				files: {
					'www/js/app.js': 'src/js/index.js'
				}
			}
		},
		less: {
			all: {
				options: {
					compress: true
				},
				files: {
					'www/css/app.css': 'src/css/main.less'
				}
			}
		},
		jade: {
			all: {
				options: {
					doctype: 'html',
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['**/*.jade', '!src/views/index.jade'],
						dest: 'www',
						ext: '.html'
					},
					{
						src: 'src/views/index.jade',
						dest: 'www/index.html',
						ext: '.html'
					}
				],
			}
		},
		copy: {
			all: {
				files: [
					{
						cwd: 'src',
						src: ['**', '!js/**', '!**/*.less', '!**/*.jade', '!**/*.js'],
						dest: 'www',
						expand: true
					}
				]
			},
			datetimepicker: {
				files: [
					{
						src: 'node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
						dest: 'src/css/datetimepicker.css'
					}
				]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: 'src/css/**/*',
				tasks: ['less']
			},
			jade: {
				files: 'src/views/**/*.jade',
				tasks: ['jade']
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['browserify']
			},
			copy: {
				files: ['src/**', '!src/css/**/*', '!src/**/*.jade', '!src/**/*.js'],
				tasks: ['copy']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask(
		'javascript',
		'Compile scripts.',
		['browserify']
	);

	grunt.registerTask(
		'views',
		'Compile views.',
		['jade', 'less', 'copy']
	);

	grunt.registerTask(
		'files',
		'Copy files.',
		['copy']
	);

	grunt.registerTask(
		'build',
		'Compiles everything.',
		['javascript', 'views']
	);

	grunt.registerTask(
		'default',
		'Build, start server and watch.',
		['build', 'watch']
	);

}
