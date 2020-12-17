common.setLocationPath([
	URLNamedParams.page,
	URLNamedParams.lang
]);

(function(){
	EventMod.onClick(window, function (e) {
		var path = EventMod.utils.getElementPath(EventMod.utils.getElement(e));
		var TH;
		for(var i = 0, len = path.length; i < len; i++){
			TH = path[i];
			if(TH === document || TH === window)
				break;
			
			var FN = TH.getAttribute("funcs");
			if(!FN)
				continue;

			FN = FN.split(",");
			FN.forEach(function (fun) {
				tmp = common.objWalk(UI,fun.trim().split("."));
				if(!tmp){
					UI._error("fn not found", [fun]);
					return undefined;
				}
				tmp(TH);
			});
		}
	});

	document.addEventListener("fullscreenchange", ()=>{
		document.fullscreenElement
			? document.body.setAttribute("fullscreen", ".")
			: document.body.removeAttribute("fullscreen");
	});
	
	/*
	UI.currentResolution.set({
			width:window.innerWidth,
			height:window.innerHeight
		});
	"body".on("resize", function(e){
		UI.currentResolution.set({
			width:window.innerWidth,
			height:window.innerHeight
		});
	});
	*/
})();