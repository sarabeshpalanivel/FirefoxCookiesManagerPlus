Components.utils.import("resource://cookiesmanagerplus/coomanPlusCore.jsm");

var coomanPlus = {
	load: function load()
	{
		window.removeEventListener("load", coomanPlus.load, true);
		coomanPlusCore.async(coomanPlus.init, 1000);
	},
	unload: function unload()
	{
		window.removeEventListener("focus", coomanPlus.winFocus, true);
	},
	winFocus: function(e)
	{
		coomanPlusCore.window = window;
	},
	init: function init()
	{

		window.addEventListener("focus", coomanPlus.winFocus, true);
		
coomanPlusCore.log.debug("start load");

/*
//open console window on startup
try
{
 toErrorConsole();
}
catch(e)
{
	try
	{
		HUDService.toggleBrowserConsole();
	}
	catch(e)
	{
		try
		{
			toJavaScriptConsole();
		}
		catch(e){}
	}
}
*/
//	window.inspectDOMNode(window.document);






		if (!coomanPlusCore.updateChecked)
			coomanPlus.update();

coomanPlusCore.log.debug("end load", 1);
	},
	openCookieEditor: function openCookieEditor(args)
	{
		args = typeof(args) == "undefined" ? {} : args
		args.window = window;
		coomanPlusCore.openCMP(args);
	},
	menu: function menu(e)
	{
		let m = document.getElementById("coomanPlus_button_menu"),
				m2 = document.getElementById("coomanPlus_tools_menuitem"),
				m3 = document.getElementById("coomanPlus_appmenu_menuitem"),
				host;
		try
		{
			host = gBrowser.currentURI.host;
		}
		catch(er){};
coomanPlusCore.log.debug(host);
		if (host && ["http","https"].indexOf(gBrowser.currentURI.scheme) != -1)
		{
			if (m)
				m.label = this.strings.site + ": " + host;

			if (m2)
			{
				m2.label = this.strings.site + ": " + host;
				m2.hidden = false;
			}

			if (m3)
				m3.label = this.strings.site + ": " + host;
			
		}
		else
		{
			if (!e)
			{
				this.openCookieEditor();
				return false;
			}
			if (m2)
				m2.hidden = true;
		}
		return true;
	},
}

window.addEventListener("load", coomanPlus.load, true);

