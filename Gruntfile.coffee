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
                    '<%= dirs.css %>modules/score.css'
                ]
                dest: '<%= dirs.dist %>app.concat.css'

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

        watch:
            sass:
                files: '<%= dirs.scss %>**/*.scss'
                tasks: 'sass'
            styles:
                files: '<%= concat.css.src %>'
                tasks: 'css'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-compass'

    grunt.registerTask 'dev', ['sass']
    grunt.registerTask 'css', ['concat:css', 'cssmin']
    grunt.registerTask 'sass', ['compass', 'css']
