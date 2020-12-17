(function(){
	new Searcher({
		input: document.querySelector(".searcher .stdInput"),
		output: document.querySelector(".searcher .list"),
		getVariants:function(inp,fn){
			//THIS IS TEST!!!!
			inp = inp.trim();
			if(!inp)
				return;

			API.mainCall("search", {
				search: inp
			})
			.then(function(r){
				console.log(r);
				var all = [];
				if(r.ok){
					for(var key in r.data.authors){
						var au = r.data.authors[key];
						all.push({
							text:"A: " + au.name,
							data:"/author/"+au.id+"/"+URLNamedParams.lang
						});
					}
					for(var key in r.data.ops){
						var op = r.data.ops[key];
						all.push({
							text:"O: " + op.name,
							data:"/read/"+op.id+"/"+URLNamedParams.lang
						});
					}
					fn(all);
				}
			});			
		},
		onClickVariant: function(txt, data){
			window.location.href = data;
		}
		// onSearch:function(inp){
		// 	common.reloadWithSearch({
		// 		s:inp
		// 	});
		// }
	});
})();