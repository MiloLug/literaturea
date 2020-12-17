(function(){

common.setLocationPath([
	URLNamedParams.page,
	URLNamedParams.authors_alpha,
	URLNamedParams.lang
]);

UI.authors = {
	data:{
		alphaList:[],
		byAlpha:{},
		cur:0
	},
	content: document.querySelector("#authors .cont"),
	el: document.querySelector("#authors"),
	source: document.querySelector("#authors .source"),
	show:function(alpha){
		if(alpha === UI.authors.data.cur)
			return false;
		
		UI.authors.content.indexHTML = "";
		
		var container = common.createElement("<div class='alphabet'></div>");
		UI.authors.data.alphaList.forEach(function(alp){
			container.appendChild(common.createElement(`<a class='link underline' href='/authors/${alp}/${URLNamedParams.lang}'>${alp}</a>`));
		});
		UI.authors.content.appendChild(container);
		
		if(alpha === false)
			UI.authors.data.alphaList.forEach(function(alp){
				UI.authors.print(alp);
			});
		else{
			alpha = alpha.toUpperCase();
			UI.authors.print(alpha),
			UI.authors.data.cur = alpha;
		}
		return true;
	},
	print:function(alpha){
		var container = common.createElement("<div class='alphaBlock'><div class='alpha'>"+alpha+"</div><div class='list'></div></div>"),
			authorsList = container.querySelector(".list");
		
		if(!UI.authors.data.byAlpha[alpha])
			return;
		
		UI.authors.data.byAlpha[alpha].forEach(function(au){
			authorsList.appendChild(common.createElement(`<a class='outline-dashed link' href='/author/${au.id}/${URLNamedParams.lang}'>${au.name}</a>`));
		});
		
		UI.authors.content.appendChild(container);
	}
};

var tmp = JSON.parse(UI.authors.source.innerHTML);
tmp.forEach(function(au){
	if(UI.authors.data.alphaList.indexOf(au.name[0]) === -1)
		UI.authors.data.alphaList.push(au.name[0]),
		UI.authors.data.byAlpha[au.name[0]] = [];
	
	UI.authors.data.byAlpha[au.name[0]].push(au);
});
	
UI.authors.data.alphaList.forEach(function(alpha){
	UI.authors.data.byAlpha[alpha].sort(function(a, b){
		return a.name.localeCompare(b.name);
	});
});

UI.authors.data.alphaList.sort(function(a, b){
	return a.localeCompare(b);
});
	
})();