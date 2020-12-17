(function(){

common.setLocationPath([
	URLNamedParams.page,
	URLNamedParams.read_opId,
	URLNamedParams.lang
]);

UI.reader = {
	pages:{
		lpp:170,
		cur:0,
		lineList:document.querySelectorAll("#read .source>p")
	},
	content: document.querySelector("#read .cont"),
	el: document.querySelector("#read"),
	pageNums: document.querySelectorAll("#read .curPageNum"),
	pagePrevNums: document.querySelectorAll("#read .prevPageNum"),
	pageNextNums: document.querySelectorAll("#read .nextPageNum"),
	pagesCounts: document.querySelectorAll("#read .allPagesCount"),
	defaultFontSize: 17,
	fullscreen: false,
	switchFullscreen:function(){
		if(!UI.reader.fullscreen){
			UI.reader.el.requestFullscreen();
			UI.reader.fullscreen = true;
		}else{
			document.exitFullscreen();
		}
	},
	show:function(page, scroll){
		if(!common.isNumeric(page))
			return;
		page = +page;
		var line = page*UI.reader.pages.lpp,
			len = UI.reader.pages.lineList.length;
		if(line>len || page<0)
			return false;
		UI.reader.content.innerHTML="";
		for(var i = line, j = 0; i < len && j < UI.reader.pages.lpp; i++, j++){
			UI.reader.content.appendChild(UI.reader.pages.lineList[i].cloneNode(true))
		}
		UI.reader.pageNums.forEach(function(item){
			item.value = page+1;
		});
		UI.location.set({p:page});
		UI.reader.pages.cur = page;
		if(!page){
			UI.reader.pagePrevNums.forEach(function(item){
				item.innerHTML = "";
			});
			UI.reader.el.setAttribute("start", ".");
		}else{
			UI.reader.pagePrevNums.forEach(function(item){
				item.innerHTML = page;
			});
			UI.reader.el.removeAttribute("start");
		}
		if(page == (UI.reader.pages.all-1)){
			UI.reader.pageNextNums.forEach(function(item){
				item.innerHTML = "";
			});
			UI.reader.el.setAttribute("end", ".");
		}else{
			UI.reader.pageNextNums.forEach(function(item){
				item.innerHTML = page+2;
			});
			UI.reader.el.removeAttribute("end");
		}
		if(scroll){
			if(!UI.reader.fullscreen){
				document.body.scrollTop = document.body.scrollTop + UI.reader.el.getBoundingClientRect().y;
			}else{
				UI.reader.el.scrollTop = 0;
			}
		}
		return true;
	},
	next:function(){
		if(UI.reader.pages.cur < (UI.reader.pages.all-1))
			UI.reader.show(UI.reader.pages.cur+1, true);
	},
	prev:function(){
		if(UI.reader.pages.cur >0)
			UI.reader.show(UI.reader.pages.cur-1, true);
	},
	addFontSize:function(){
		UI.reader.setFontSize(common.css(UI.reader.content, "font-size")+1);
	},
	remFontSize:function(){
		UI.reader.setFontSize(common.css(UI.reader.content, "font-size")-1);
	},
	setFontSize:function(size){
		if(size<1)
			return;
		common.css(UI.reader.content, {
			"font-size": size+"px",
			"line-height": size/0.7083+"px"
		});
		UI.location.set({rfsize:size});
	}
};

UI.reader.pages.all = Math.ceil(UI.reader.pages.lineList.length/UI.reader.pages.lpp);
UI.reader.pagesCounts.forEach(function(item){
	item.innerHTML = UI.reader.pages.all;
});

})();