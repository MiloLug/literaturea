(function(){
	var startPage = (+UI.location.get().p) || 0;
	if(startPage >= UI.reader.pages.all)
		startPage = UI.reader.pages.all-1;
	UI.location.set({p:startPage});
	UI.reader.setFontSize((+UI.location.get().rfsize) || UI.reader.defaultFontSize);
	UI.reader.show(startPage);
	
	var shower = function(e){
		var elem = EventMod.utils.getElement(e);
		var val = elem.value;
		if(UI.reader.pages.cur == val);
			if(!UI.reader.show(elem.value-1, true)){
				elem.value = UI.reader.pages.cur+1;
			};
	};
	UI.reader.pageNums.forEach(function(item){
		EventMod.onCombination(item, "enter", shower);
	});

	document.addEventListener("fullscreenchange", ()=>{
		if(!document.fullscreenElement){
			UI.reader.fullscreen = false;
		};
	});
})();