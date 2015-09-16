var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.battle_for_the_tank/'
var stream = 'stable'
var media = require('./lib/path').media(stream)

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
      build: {
        files: [
          {
            src: [ 'ui/main/shared/js/build.js' ],
            expand: true,
            cwd: media,
            dest: './',
          },
        ],
      },
      icons: {
        files: [
          {
            src: 'pa/units/land/tank_light_laser/tank_light_laser_icon_buildbar.png' ,
            expand: true,
            cwd: media,
            dest: 'pa/units/land/tank_light_laser/tank_ant_icon_buildbar.png' ,
            rename: function(dest, src) {
              return dest
            }
          },
          {
            src: 'pa/units/land/tank_light_laser/tank_light_laser_icon_buildbar.png' ,
            expand: true,
            cwd: media,
            dest: 'pa/units/land/tank_light_laser/tank_bolo_icon_buildbar.png' ,
            rename: function(dest, src) {
              return dest
            }
          },
        ],
      },
    },
    clean: ['pa', modPath],
    // copy files from PA, transform, and put into mod
    proc: {
      ant: {
        src: [
          'pa/units/land/tank_light_laser/tank_light_laser.json',
        ],
        cwd: media,
        dest: 'pa/units/land/tank_light_laser/tank_ant.json',
        process: function(spec) {
          spec.display_name = "!LOC:Ant"
          spec.si_name = 'tank_light_laser'
          return spec
        }
      },
      bolo: {
        src: [
          'pa/units/land/tank_light_laser/tank_light_laser.json',
        ],
        cwd: media,
        dest: 'pa/units/land/tank_light_laser/tank_bolo.json',
        process: function(spec) {
          spec.display_name = "!LOC:Bolo"
          spec.si_name = 'tank_light_laser'
          return spec
        }
      },
      unit_list: {
        src: [
          'pa_ex1/units/unit_list.json',
        ],
        cwd: media,
        dest: 'pa/units/unit_list.json',
        process: function(spec) {
          spec.units.push('/pa/units/land/tank_light_laser/tank_ant.json')
          spec.units.push('/pa/units/land/tank_light_laser/tank_bolo.json')
          return spec
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('proc', 'Process unit files into the mod', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['proc', 'copy:icons', 'copy:mod']);

};

