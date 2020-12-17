var common = {
	// pendTo: function (condFn) {
	// 	return A.start(function(obj){
	// 		(function fn(){
	// 			setTimeout(function(){
	// 				if(condFn())
	// 					obj.value = true;
	// 				else
	// 					fn();
	// 			},10);
	// 		})();
	// 	},true);
	// },
	createElement: function(elem){
		if(elem.match("<.*?>")){
			var tmp = document.createElement("div");
			tmp.innerHTML = elem;
			var elems=tmp.children;
			
			return elems.length===1?elems[0]:elems;
		}
		return document.createElement(elem);
	},
	isNumeric: function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	css: function (element, prop, val) {
		var req,
		tmp,
		pf;
		val = val || "";
		
		if (typeof prop === "object") {
			for (var key in prop) {
				element.style[key] = prop[key];
			}
			return;
		}
		if (arguments.length > 2) {
			element.style[prop] = val;
			return;
		}
		if (typeof prop === "string")
			tmp = element.currentStyle ? element.currentStyle[prop] : window.getComputedStyle(element).getPropertyValue(prop),
			pf = tmp.match(/[,  %]/) ? NaN : parseFloat(tmp),
			req = common.isNumeric(pf) ? pf : tmp;
		else
			req = element.currentStyle ? element.currentStyle() : window.getComputedStyle(element);
		return req;
	},
	objWalk: function (obj,path,interPath,noInterInTheEnd){
		var cur = obj;
		for(var i = 0, len = path.length, p; i < len; i ++){
			p = path[i];
			if(cur===undefined||!(p in cur)){
				cur = undefined;
				break;
			}
			cur=cur[p];
			if(interPath&&(noInterInTheEnd?i!==(path.length-1):true))
				cur=objWalk(cur,interPath);
		}
		return cur;
	},
	translate: function(key){
		var tmp = key.toLowerCase();
		var txt=window.DICTIONARY[tmp]||tmp;
		if(tmp.charAt(0)!=key.charAt(0))
			txt=txt.charAt(0).toUpperCase()+txt.slice(1);
		else
			txt=txt.charAt(0).toLowerCase()+txt.slice(1);
		return txt;
	},
	getLocationSearch: function(){
		var search = window.location.search;
		if(!search)
			return {};
		search = search.split("?")[1].split("&");
		var r = {};
		search.forEach(function(item){
			item = item.split("=");
			r[item[0]] = decodeURIComponent(item[1]);
		});
		return r;
	},
	setLocationSearch: function(obj){
		var str = "?";
		Object.getOwnPropertyNames(obj).forEach(function(key){
			key = encodeURIComponent(key)+"="+encodeURIComponent(obj[key]);
			if(str === "?")
				str += key;
			else
				str += "&"+key;
		});
		window.history.replaceState(null, null, str);
	},
	updateLocationSearch: function(obj){
		var search = common.getLocationSearch();
		Object.getOwnPropertyNames(obj).forEach(function(key){
			search[key] = obj[key];
		});
		common.setLocationSearch(search);
	},
	reloadWithSearch: function(obj){
		common.updateLocationSearch(obj);
		window.location.reload();
	},
	processAPIRequest:function(d,methodName){
		try{
			d = JSON.parse(d);
		}catch(e){
			UI._error("json parsing",[d]);
			return;
		}
		if(d.ok)
			return d.data;
		else{
			UI._error(d.data,[methodName]);
			throw new Error(d.data);
		}
	},
	replacer:function(str,obj){
		Object.getOwnPropertyNames(obj).forEach(function(key){
			str = str.replace(new RegExp("{{"+key+"}}","gm"),obj[key]);
		});
		return str;
	},
	getLocationPath:function(){
		var t = decodeURIComponent(window.location.pathname).split("/");
		if(t[0]=="")
			t.splice(0,1);
		return t;
	},
	setLocationPath:function(path){
		var encPath = [];
		path.forEach(function(item){
			encPath.push(encodeURIComponent(item));
		});
		encPath = encPath.join("/");
		window.history.replaceState(null,null,"/" + encPath + window.location.search);
	},
	updateLocationPath:function(obj){
		var target = common.getLocationPath(),
			keys = [],
			len,
			tmp,
			i;
		Object.getOwnPropertyNames(obj).forEach(function(item){
			keys.push(+item);
		});
		
		for(i = 1, len = keys.length; i !== len; i++)
			if(i>0 && keys[i] < keys[i-1])
				tmp = keys[i],
				keys[i] = keys[i-1],
				keys[i-1] = tmp,
				i-=2;
		
		keys.forEach(function(key){
			if(key>target.length)
				target.push(obj[key]);
			else
				target[key]=obj[key];
		});
		i=0;
		while(i<target.length)
			if(!target[i])
				target.splice(i,1);
			else
				i++;
		common.setLocationPath(target);
	},
	reloadWithLocationPath:function(obj){
		common.updateLocationPath(obj);
		window.location.reload();
	},
	
	debounce: function(f, ms) {
		var isCooldown = false;
		return function() {
			if (isCooldown) return;
			f.apply(this, arguments);
			isCooldown = true;
			setTimeout(() => isCooldown = false, ms);
		};
	}
}

Object.defineProperty(String.prototype, "tr", {
	get: function(){
		return common.translate(this);
	}
})
