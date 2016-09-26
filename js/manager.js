'use strict';


module.exports = function (oAppData) {
	return null;
	
	require('modules/%ModuleName%/js/enums.js');
	require('jquery.cookie');

	var
		_ = require('underscore'),
		
		Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
		
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		
		Settings = require('modules/%ModuleName%/js/Settings.js'),
		oSettings = _.extend({}, oAppData[Settings.ServerModuleName] || {}, oAppData['%ModuleName%'] || {}),
		
		bAnonimUser = App.getUserRole() === Enums.UserRole.Anonymous
	;
	
	Settings.init(oSettings);
	
	if (!App.isPublic() && bAnonimUser)
	{
		return {
			getScreens: function () {
				var oScreens = {};
				oScreens[Settings.HashModuleName] = function () {
					return require('modules/%ModuleName%/js/views/WrapLoginView.js');
				};
				return oScreens;
			},
			beforeAppRunning: function () {
				if (Types.isNonEmptyString(Settings.CustomLoginUrl))
				{
					window.location.href = Settings.CustomLoginUrl;
				}
			}
		};
	}
	
	return null;
};
