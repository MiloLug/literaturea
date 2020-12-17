(function(){

common.setLocationPath([
	URLNamedParams.page,
	URLNamedParams.author_id,
	URLNamedParams.lang
]);

UI.author={
	data:{
		alphaList:[],
		byAlpha:{},
		cur:0
	},
	content:document.querySelector("#author .cont"),
	el:document.querySelector("#author"),
	source: document.querySelector("#author .source"),
	show:function(){
		UI.author.content.innerHTML = "";

		UI.author.data.alphaList.forEach(function(alp){
			UI.author.print(alp);
		});
		return true;
	},
	print:function(alpha){
		var container = common.createElement("<div class='alphaBlock'><div class='alpha'>"+alpha+"</div><div class='list'></div></div>"),
			authorsList = container.querySelector(".list");
		
		if(!UI.author.data.byAlpha[alpha])
			return;
		
		UI.author.data.byAlpha[alpha].forEach(function(op){
			authorsList.appendChild(common.createElement(`<a class='outline-dashed link' href='/read/${op.id}/${URLNamedParams.lang}'>${op.name}</a>`));
		});
		
		UI.author.content.appendChild(container);
	}
};

var tmp = JSON.parse(UI.author.source.innerHTML);

tmp.ops.forEach(function(op){
	if(UI.author.data.alphaList.indexOf(op.name[0]) === -1)
		UI.author.data.alphaList.push(op.name[0]),
		UI.author.data.byAlpha[op.name[0]] = [];
	
	UI.author.data.byAlpha[op.name[0]].push(op);
});
	
UI.author.data.alphaList.forEach(function(alpha){
	UI.author.data.byAlpha[alpha].sort(function(a, b){
		return a.name.localeCompare(b.name);
	});
});

UI.author.data.alphaList.sort(function(a, b){
	return a.localeCompare(b);
});

})();