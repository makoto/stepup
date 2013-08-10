module.exports = (grunt) ->

    grunt.initConfig

        dirs:
            static: './static/'
            dist:   './static/dist/'
            js:     './static/js/'
            jade:   './static/jade/'
            css:    './static/css/'
            scss:   './static/scss/'

        concat:
            css:
                src: [
                    '<%= dirs.css %>base/common.css'
                    '<%= dirs.css %>base/typography.css'
                    '<%= dirs.css %>base/sprites.css'
                    '<%= dirs.css %>modules/demo.css'
                    '<%= dirs.css %>modules/timeline.css'
                ]
                dest: '<%= dirs.dist %>app.concat.css'

        uglify:
            dev:
                options:
                    sourceMap: '<%= dirs.dist %>app.min.js.map'
                    mangle: false
                files:
                    '<%= dirs.dist %>app.min.js': [
                        '<%= dirs.js %>App.js'
                    ]

        cssmin:
            files:
                src: '<%= concat.css.dest %>'
                dest: '<%= dirs.dist %>app.min.css'

        compass:
            dist:
                options:
                    config: './config.rb'
                    sassDir: '<%= dirs.scss %>'
                    cssDir: '<%= dirs.css %>'

        jade:
            compile:
                options:
                    pretty: true
                files:
                    './index.html': '<%= dirs.jade %>index.jade'

        watch:
            scripts:
                files: '<%= dirs.js %>**/*.js'
                tasks: 'js'
            sass:
                files: '<%= dirs.scss %>**/*.scss'
                tasks: 'sass'
            styles:
                files: '<%= concat.css.src %>'
                tasks: 'css'
            jade:
                files: '<%= dirs.jade %>*.jade'
                tasks: 'jade'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-contrib-jade'

    grunt.registerTask 'dev', ['js', 'css']
    grunt.registerTask 'js', ['uglify']
    grunt.registerTask 'css', ['concat:css', 'cssmin']
    grunt.registerTask 'sass', ['compass', 'css']
