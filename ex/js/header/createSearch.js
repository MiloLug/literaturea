function Searcher(param){
	var curOut = [],
		curOutElems = [],
		curChange = -1,
		check = function(){
			curChange = -1;
			param.getVariants(param.input.value,function(out){
				param.output.innerHTML = "";
				curOut = out;
				curOutElems = [];
				out.forEach(function(o, i){
					var el = common.createElement("<button class='variant-btn'>"+o.text+"</button>");
					param.output.appendChild(el);
					curOutElems.push(el);
					el.setAttribute("data-index", i);
				});
			});
		},
		outHover = function(e){
			var index = curOutElems.indexOf(EventMod.utils.getElement(e));
			if(index !== -1){
				deselect();
				curChange = -1;
			}
		},
		getPosInParent = function(el){
			return el.getBoundingClientRect().y - el.parentNode.getBoundingClientRect().y;
		},
		deselect = function(){
			curOutElems.forEach(function(el){
				el.removeAttribute("hoverBySelect");
			});
		},
		outClick = function(e){
			e = EventMod.utils.getElement(e);
			if(e.classList.contains('variant-btn')){
				var tmp = curOut[e.getAttribute("data-index")];
				param.onClickVariant && param.onClickVariant(tmp.text, tmp.data);
			}
		},
		searchClick = function(e){
			param.onSearch && param.onSearch(input.val());
		},
		inputBlur = function(e){
			if(e.relatedTarget && (e.relatedTarget === param.output || EventMod.utils.elementIsParentOf(param.output, e.relatedTarget))){
				return;
			}
			param.output.innerHTML = "";
		},
		scrollTo = function(el){
			var pos = getPosInParent(el),
				elBounds = el.getBoundingClientRect(),
				pBounds = el.parentNode.getBoundingClientRect();
			if(pos > (pBounds.height - elBounds.height) || pos < 0)
				el.parentNode.scrollTop = pos + el.parentNode.scrollTop;
			
		},
		enterPress = function(e){
			EventMod.utils.stopEvent(e);
			if(curChange === -1){
				searchClick();
			}else{
				outClick({target:curOutElems[curChange]});
			}
			return false;
		},
		move = function(add){
			curChange+=add;
			if(curChange > (curOut.length - 1))
				curChange = 0;
			else if(curChange < 0)
				curChange = curOut.length - 1;
			deselect();
			var el = curOutElems[curChange];
			el.setAttribute("hoverBySelect",".");
			param.input.value = curOut[el.getAttribute("data-index")].text;
			scrollTo(el);
		},
		upPress = function(e){
			move(-1);
			EventMod.utils.stopEvent(e);
			return false;
		},
		downPress = function(e){
			move(1);
			EventMod.utils.stopEvent(e);
			return false;
		};

	EventMod.onClick(param.output, outClick);
	EventMod.onHover(param.output, outHover);

	EventMod.onClick(param.searchBtn, searchClick);

	param.input.addEventListener("focus", check);
	param.input.addEventListener("blur", inputBlur);
	EventMod.onInput(param.input, check);

	EventMod.onCombination(param.input, "enter", enterPress);
	EventMod.onCombination(param.input, "down", downPress);
	EventMod.onCombination(param.input, "up", upPress);

	this.parameters = param;
	this.clearOut = function(){
		param.output.innerHTML = "";
	};
	this.clearIn = function(){
		param.input.value = "";
	};
	this.terminate = function(){
		EventMod.offClick(param.output, outClick);
		EventMod.offHover(param.output, outHover);

		EventMod.offClick(param.searchBtn, searchClick);

		param.input.removeEventListener("focus", check);
		param.input.removeEventListener("blur", inputBlur);
		EventMod.offInput(param.input, check);

		EventMod.offCombination(param.input, "enter", enterPress);
		EventMod.offCombination(param.input, "down", downPress);
		EventMod.offCombination(param.input, "up", upPress);
	};
	
}