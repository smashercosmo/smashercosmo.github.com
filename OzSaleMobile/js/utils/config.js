var GlobalSettings = $('#GlobalSettings').data('settings').JsonValue;

/* to remove trailing slash from (http://cdn1.apacsale.com/ => http://cdn1.apacsale.com) */
GlobalSettings.ImageServerURL = GlobalSettings.ImageServerURL.slice(0, -1);