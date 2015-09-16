(function() {
  var battle_for_the_tank_settings = {
    tank_light_laser_is: {
      title: 'Basic Tank Is',
      type: 'select',
      options: ['Default', 'Ant', 'Bolo'],
      default: 'Default',
    },
  }

  _.extend(api.settings.definitions.ui.settings, battle_for_the_tank_settings)

  // force model.settingsLists to update
  model.settingDefinitions(api.settings.definitions)

  var $group = $('<div class="sub-group"></div>').appendTo('.option-list.ui .form-group')
  $group.append('<div class="sub-group-title">Battle for the Tank</div>')

  var $template = $('script#setting-template')
  $group.append($template[0].outerHTML.replace('setting-template', 'battle-for-the-tank-setting-template').replace('hide', 'show'))

  Object.keys(battle_for_the_tank_settings).forEach(function(setting) {
    $group.append('<div class="option" data-bind="template: { name: \'battle-for-the-tank-setting-template\', data: $root.settingsItemMap()[\'ui.' + setting + '\'] }"></div>')
  })
})()
