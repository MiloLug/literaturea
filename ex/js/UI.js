var UI = {
	_showError:function(txt){
		(console.error||console.log)("UI error: "+txt);
		return true;
	},
	_errorsList:{
		"fn not found":function(args){UI._showError("function '"+args[0]+"' not found");},
		"er not found":function(args){UI._showError("error '"+args[0]+"' not found");},
		"no exists method":function(args){UI._showError("API error, method '"+args[0]+"' not found");},
		"json parsing":function(args){UI._showError("JSON parsing error, parse '"+args[0]+"'");}
	},
	_error:function(id, args){
		var tmp = UI._errorsList[id];
		if(!tmp){
			UI._error("er not found",[id]);
			return false;
		}
		tmp(args || []);
		return true;
	},
	location:{
		_temp:common.getLocationSearch(),
		update:function(){
			UI.location._temp = common.getLocationSearch();
		},
		set:function(obj){
			common.updateLocationSearch(obj);
			UI.location.update();
			return UI.location.get();
		},
		get:function(){
			return UI.location._temp;
		}
	},
	redirect:{
		lang:function(TH,lang){
			lang=lang||TH.getAttribute("lang");
			if(URLNamedParams.lang === lang)
				return;
			common.reloadWithLocationPath({
				1:lang
			});
		},
		href:function(TH,href){
			window.open(href||TH.getAttribute("href"),"_blank");
		},
		wadds:function(TH,href){
			window.open("/redir?noheader=1&nosidebar=1&nofuter=1&url="+encodeURIComponent(href||TH.getAttribute("href")),"_blank");
		},
	}
};