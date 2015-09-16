(function() {
  "use strict";

  model.tankLightLaserIs = ko.observable().extend({ setting: { 'group': 'ui', 'key': 'tank_light_laser_is' } });

  model.tankLightLaserMightBe = ko.observableArray(api.settings.definitions.ui.settings.tank_light_laser_is.options)
  model.tankLightLaserDescription = function(x) {return x}

  $('.slot-player-loading').after(
    '<div class="form-control-personality">'+
      '<select data-bind="options: $root.tankLightLaserMightBe, optionsText: $root.tankLightLaserDescription, selectPicker: $root.tankLightLaserIs" data-width="106px">' + 
      '</select>' +
    '</div>')
})()
