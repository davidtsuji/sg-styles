module.exports = function(grunt) {

	grunt.initConfig({

		ejs: {
			markup: {
				options: {
					colors: require("./src").colors,
					shades: require("./src").shades,
				},
				src: "src/index.ejs",
				dest: "dist/README.html"
			}
		},
		inline: {
			markup: {
				options: {
					tag: "",
					cssmin: true,
					uglify: true
				},
				src: "dist/README.html"
			}
		},
		less: {
			dist: {
				files: {
					".tmp/styles.css": "src/styles/app/main.less"
				}
			}
		},
		shell: {
			test: {
				command: "npm test"
			},
			readme: {
				command: "./node_modules/.bin/mocha -R markdown > README.md"
			}
		},
		watch: {
			options: {
				livereload: true
			},
			src: {
				files: ["*.js*", "src/*.ejs", "src/*.js"],
				tasks: ["build"]
			},
			markup: {
				files: ["./src/*.ejs"],
				tasks: ["markup"]
			},
			styles: {
				files: ["./src/styles/**/*.less"],
				tasks: ["styles", "markup"]
			},
			tests: {
				files: ["./test/**/*"],
				tasks: ["test", "readme"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-ejs");
	grunt.loadNpmTasks("grunt-inline");
	grunt.loadNpmTasks("grunt-shell-spawn");

	grunt.registerTask("default", ["build"]);
	grunt.registerTask("build", ["styles", "markup", "test", "readme"]);
	grunt.registerTask("styles", ["less:dist"]);
	grunt.registerTask("markup", ["ejs:markup", "inline:markup"]);
	grunt.registerTask("test", ["shell:test"]);
	grunt.registerTask("readme", ["shell:readme"]);

};