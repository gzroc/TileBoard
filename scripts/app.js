var CLASS_BIG = "-big-entity";
var CLASS_SMALL = "-small-entity";

var GOOGLE_MAP = "google";
var YANDEX_MAP = "yandex";

var TRANSITIONS = {
   ANIMATED: 'animated',
   ANIMATED_GPU: 'animated_gpu',
   SIMPLE: 'simple' // fastest
};

var ITEM_TRANSPARENT = "transparent";

var CUSTOM_THEMES = {
   TRANSPARENT: "transparent",
   WIN95: "win95",
};

var TYPES = {
   DEVICE_TRACKER: 'device_tracker',
   SCRIPT: 'script',
   SENSOR: 'sensor',
   SENSOR_ICON: 'sensor_icon',
   SWITCH: 'switch',
   GENERIC_ICON: 'generic_icon',
   INPUT_BOOLEAN: 'input_boolean',
   LIGHT: 'light',
   TEXT_LIST: 'text_list',
   INPUT_NUMBER: 'input_number',
   INPUT_SELECT: 'input_select',
   CAMERA: 'camera',
   CAMERA_THUMBNAIL: 'camera_thumbnail',
   SCENE: 'scene',
   SLIDER: 'slider',
   IFRAME: 'iframe',
   DOOR_ENTRY: 'door_entry',
   WEATHER: 'weather',
   CLIMATE: 'climate',
   MEDIA_PLAYER: 'media_player',
};

function mergeObjects (a, b) {
   return angular.merge(a, b);
}

function leadZero (num) {
   if(num >= 0 && num < 10) {
      return "0" + num;
   }

   return num;
}

function numberFilter (precision) {
   return function (value) {
      var num = parseFloat(value);

      return num && !isNaN(num) ? num.toFixed(precision) : value;
   }
}

function switchPercents (field, max, round) {
   round = round || false;
   max = max || 100;

   return function (item, entity) {
      var value = entity.attributes[field] || null;

      value = parseFloat(value);

      if(isNaN(value)) {
         value = entity.state;

         if(item.states && value in item.states) {
            return item.states[value];
         }

         return value;
      }

      value = Math.round((value / max * 100));

      if(round) value = Math.round(value / 10) * 10;

      return value + '%';
   }
}

function debounce(func, wait, immediate) {
   var timeout;
   return function() {
      var context = this, args = arguments;
      var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
   };
}