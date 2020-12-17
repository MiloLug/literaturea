var EventMod = {utils:{}};


EventMod.utils.compatES6_spread = (function(){
	"use strict";
    try {
        eval("[...[]];");
    } catch (e) { return false; }
    return true;
})();

EventMod.utils.getElement = function(e){
	return e.srcElement || e.target || e.toElement || e.fromElement || e.relatedTarget || undefined;
};

EventMod.utils.getCoords = function(e){
	e = e || window.event;
	var scope = 'client',
	type = !(e.changedTouches && e.changedTouches.length) && !(e.targetTouches && e.targetTouches.length) ? e : e.changedTouches[0] || e.targetTouches[0],
	r = {
		y: type[scope + 'Y'],
		x: type[scope + 'X']
	};
	return {
		y: r.y !== undefined ? r.y : 0,
		x: r.x !== undefined ? r.x : 0
	};
};

EventMod.utils.getElementPath = function(el){
	var p = [el],
	tempP = el;
	while (tempP = tempP.parentNode) {
		p.push(tempP);
	}
	if (p[p.length - 1] !== window)
		p.push(window);
	return p;
};

EventMod.utils.elementIsParentOf = function(el, child){
	tempP = child;
	while (tempP = tempP.parentNode) {
		if(tmpP === el)
			return true;
	}
	return false;
};

EventMod.utils.stopEvent = function(e){
	e.cancelable && e.preventDefault && e.preventDefault(),
	e.stopPropagation && e.stopPropagation(),
	e.cancelBubble = true,
	e.returnValue = false,
	e.stopImmediatePropagation && e.stopImmediatePropagation();
};

EventMod.__listenerStorage = {};

EventMod.__executeListener = function (storage, el, data){
	storage = storage || [];
	var path = EventMod.utils.getElementPath(el);
	storage.forEach(function(row){
		if (path.indexOf(row.element) !== -1) {
			row.fn(data);
		}
	});    
}
EventMod.__addListenerRow = function(storage, el, fn){
	storage.push({
		element:el,
		fn:fn
	});
}
EventMod.__removeListenerRow = function(storage, el, fn){
	for(var i = 0, len = storage.length; i < len; i++)
		if(row.element === el && row.fn === fn){
			storage.splice(i, 1);
		}
}

EventMod.emod_params = {
	timeTouchToContext: 400,
	moveDistanceForNotClick: 3,
	timeClickToClick: 100
};

EventMod.onClick = EventMod.onTouch = function (el, fn){
	if(!EventMod.clickLisSet){
		EventMod.clickLisSet = true;
		EventMod.__listenerStorage.click = [];

		var down = false,
		move = 0,
		time = {},
		event = 0,
		rep = function () {
			var tmp;
			return (tmp = event === 1 && move < EventMod.emod_params.moveDistanceForNotClick && down, down = false, move = 0, event = 0, tmp);
		},
		fun = function (e) {
			var elem;	
			(elem = EventMod.utils.getElement(e))
				&& EventMod.__executeListener(EventMod.__listenerStorage.click, elem, e);
		};

		EventMod.onMousedown(window, function(e){
			event = 1;
			down = true;
			var flagTime = true;
			setTimeout(function () {
				flagTime = false;
			}, EventMod.emod_params.timeTouchToContext);
			time = function () {
				return flagTime;
			};
		});

		window.addEventListener("touchend", function (e) {
			if (rep() && time())
				fun(e);
		}, true);
		window.addEventListener("mouseup", function (e) {
			if (rep() && time())
				fun(e);
		}, true);

		window.addEventListener("mousemove", function (e) {
			move <= (EventMod.emod_params.moveDistanceForNotClick + 1) && down && move++;
		}),
		window.addEventListener("contextmenu", rep, false),
		window.addEventListener("dragend", rep, false),
		window.addEventListener("dragstart", rep, false);
		window.addEventListener("scroll", rep, false);
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.click,
		el,
		fn
	);
};
EventMod.offClick = EventMod.offTouch = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.click,
		el,
		fn
	);
};

EventMod.onMousedown = EventMod.onTouchstart = function (el, fn){
	if(!EventMod.mousedownLisSet){
		EventMod.mousedownLisSet = true;
		EventMod.__listenerStorage.mousedown = [];

		var touch = mouse = tend = mv = false,
		fun = function (e) {
			var elem = EventMod.utils.getElement(e);
			EventMod.__executeListener(EventMod.__listenerStorage.mousedown, elem, e);
		};
		window.addEventListener("touchstart", function (e) {
			if (mouse)
				return;
			touch = true;
			fun(e);
		},{
			passive:false,
			capture:true
		});
		window.addEventListener("mousedown", function (e) {
			if (touch || tend)
				return (tend = false);
			mouse = true;
			fun(e);
		},{
			passive:false,
			capture:true
		});
		window.addEventListener("mouseup", function (e) {
			touch = mouse = false;
		},false);
		window.addEventListener("touchend", function (e) {
			tend = !mv;
			mouse = touch = mv = false;
		},false);
		window.addEventListener("dragend", function () {
			touch = mouse = false;
		}, false);
		window.addEventListener("touchmove", function () {
			mv = true;
		},false);
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.mousedown,
		el,
		fn
	);
};
EventMod.offMousedown = EventMod.offTouchstart = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.mousedown,
		el,
		fn
	);
};

EventMod.onMousemove = EventMod.onTouchmove = function (el, fn){
	if(!EventMod.mousemoveLisSet){
		EventMod.mousemoveLisSet = true;
		EventMod.__listenerStorage.mousemove = [];

		var touch = alw = up = false,
		fun = function (e) {
			var elem = EventMod.utils.getElement(e);
			EventMod.__executeListener(EventMod.__listenerStorage.mousemove, elem, e);
		};
		window.addEventListener("touchstart", function (e) {
			touch = alw = true;
		}),
		window.addEventListener("touchmove", function (e) {
			if (!touch || !alw)
				return;
			fun(e);
		}),
		window.addEventListener("mousemove", function (e) {
			if (touch || up)
				return (up = false);
			fun(e);
		}, false),
		EventMod.onTouchend(window, function () {
			alw = false,
			touch = false,
			up = true;
		});
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.mousemove,
		el,
		fn
	);
};
EventMod.offMousemove = EventMod.offTouchmove = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.mousemove,
		el,
		fn
	);
};


EventMod.onMouseup = EventMod.onTouchend = function (el, fn){
	if(!EventMod.mouseupLisSet){
		EventMod.mouseupLisSet = true;
		EventMod.__listenerStorage.mouseup = [];
		var event = 0,
		fun = function (e) {
			if (event !== 0){
				event = 0;
				var elem = EventMod.utils.getElement(e);
				EventMod.__executeListener(EventMod.__listenerStorage.mouseup, elem, e);
			}
			return 0;
		};
		EventMod.onMousedown(window, function(e){
			event = 1;
		});
		window.addEventListener("mouseup", fun, false);
		window.addEventListener("touchend", fun, false);

		window.addEventListener("dragend", fun, false);
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.mouseup,
		el,
		fn
	);
};
EventMod.offMouseup = EventMod.offTouchend = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.mouseup,
		el,
		fn
	);
};


EventMod.onHover = function (el, fn){
	if(!EventMod.hoverLisSet){
		EventMod.hoverLisSet = true;
		EventMod.__listenerStorage.hover = [];
		
		window.addEventListener("hover", function(e){
			var elem = EventMod.utils.getElement(e);
			EventMod.__executeListener(EventMod.__listenerStorage.hover, elem, e);
		});
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.hover,
		el,
		fn
	);
};
EventMod.offHover = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.hover,
		el,
		fn
	);
};


EventMod.onInput = function (el, fn){
	if(!EventMod.inputLisSet){
		EventMod.inputLisSet = true;
		EventMod.__listenerStorage.input = [];
		
		window.addEventListener("input", function(e){
			var elem = EventMod.utils.getElement(e);
			EventMod.__executeListener(EventMod.__listenerStorage.input, elem, e);
		});
	}
	EventMod.__addListenerRow(
		EventMod.__listenerStorage.input,
		el,
		fn
	);
};
EventMod.offInput = function(el, fn){
	EventMod.__removeListenerRow(
		EventMod.__listenerStorage.input,
		el,
		fn
	);
};



EventMod.enableCssSelectors = function(){
	var RAF = window.requestAnimationFrame,
		curRAF,
		elem,
		alw = true,
		delstat = function (s) {
			curRAF = RAF(function () {
				document.querySelectorAll("[" + s + "]").forEach(function (l) {
					l.hoverIsSetted = false;
					l.removeAttribute(s);
				});
			});
		},
		wElem = function (e) {
			var coords = EventMod.utils.getCoords(e);
			var evElement = document.elementFromPoint(coords.x, coords.y),
				path = EventMod.utils.getElementPath(evElement);
			RAF(function () {
				if (elem === evElement || !alw)
					return;
				elem = evElement;
				path.forEach(function (el, ind) {
					if (ind === 0)
						document.querySelectorAll("[hover]").forEach(function (elem) {
							if (path.indexOf(elem) < 0)
								elem.removeAttribute("hover");
						});
					el.hoverIsSetted = false;
					el !== window && el !== document && el.setAttribute("hover", ".") 
						&& EventMod.__executeListener(EventMod.__listenerStorage.hover, el, {target:el});
				});
			});
		};
	window.addEventListener("mousemove", wElem);
	document.addEventListener("mouseleave", function (e) {
		delstat("hover"),
			elem = alw = false;
	});
	document.addEventListener("mouseenter", function (e) {
		alw = true;
	});

	window.addEventListener("touchend", function () {
		delstat("hover"),
			delstat("press");
		elem = false;
	});
	EventMod.onMousedown(window, function (e) {
		var evElement = EventMod.utils.getElement(e),
				path = EventMod.utils.getElementPath(evElement);
		RAF(function () {
			path.forEach(function (el) {
				el !== window && el !== document 
					&& (el.setAttribute("hover","."), el.setAttribute("press","."), true)
					&& !el.hoverIsSetted 
					&& EventMod.__executeListener(EventMod.__listenerStorage.hover, el, {target:el});
			});
		});
	});
	EventMod.onMouseup(window, function (e) {
		delstat("press");
		elem = false;
	}),
	window.addEventListener("mouseup", function (e) {
		var evElement = EventMod.utils.getElement(e),
			path = EventMod.utils.getElementPath(evElement);
		RAF(function () {
			path.forEach(function (el) {
				el !== window && el !== document 
					&& (el.setAttribute("hover","."), true)
					&& !el.hoverIsSetted
					&& EventMod.__executeListener(EventMod.__listenerStorage.hover, el, {target:el});
			});
		});
	}, true);
	window.addEventListener("blur", function (e) {
		delstat("hover"),
		delstat("press"),
		delstat("focus");
		elem = false;
	});
	window.addEventListener("focusin", function(e){
		var evElement = EventMod.utils.getElement(e),
			path = EventMod.utils.getElementPath(evElement);
		RAF(function () {
			path.forEach(function (el) {
				el !== window && el !== document
					&& (el.setAttribute("focus","."), true)
					&& !el.hoverIsSetted;
			});
		});
	});
	window.addEventListener("focusout", function(e){
		delstat("focus");
	});
}



//KEY COMBINATION ===================================================================
//KEY COMBINATION ===================================================================

EventMod.utils.keyCodes_spec = {
	backspace: 8,
	tab: 9,
	clear: 12,
	enter: 13,
	'return': 13,
	esc: 27,
	escape: 27,
	space: 32,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	del: 46,
	'delete': 46,
	home: 36,
	end: 35,
	pageup: 33,
	pagedown: 34,
	shift: 16,
	alt: 18,
	option: 18,
	ctrl: 17,
	control: 17,
	command: 91,
	',': 188,
	'.': 190,
	'/': 191,
	'`': 192,
	'-': 189,
	'=': 187,
	';': 186,
	'\'': 222,
	'[': 219,
	']': 221,
	'\\': 220
};
for (var k = 1; k < 20; k++)
	EventMod.utils.keyCodes_spec['f' + k] = 111 + k;

EventMod.utils.getKeyCode = function(x){
	return EventMod.utils.keyCodes_spec[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
};

EventMod.utils.approximateFindArray = function(searchIn, searchFor){
	root: for(var i = 0, len = searchIn.length, sflen = searchFor.length; i < len; i++){
		var current = searchIn[i];
		if(current.length === sflen){
			for(var j = 0; j < sflen; j++){
				if(current.indexOf(searchFor[j]) === -1)
					continue root;
			}
			return i;
		}else{
			continue;
		}
	}
	return -1;
}

if(EventMod.utils.compatES6_spread){
	EventMod.utils.uniqueArray = function(arr){
		return [...(new Set(arr))];
	}
}else{
	EventMod.utils.uniqueArray = function(arr){
		var current;
		var blockedIndexes = {};
		var newArr = [];
		for(var i = 0, len = arr.length; i < len; i++){
			if(blockedIndexes[i]) continue;
			current = arr[i];
			for(var j = i+1; j < len; j++){
				if(arr[j] === current){
					blockedIndexes[j] = true;
				}
			}
			newArr.push(current);
		}
		return newArr;
	}
}

EventMod.onCombination = function(el, combination, fn){
	var tmp, keys = [], tmpFunc;

	combination.split("+").forEach(function(k){
		keys.push(EventMod.utils.getKeyCode(k));
	});
	keys = EventMod.utils.uniqueArray(keys);

	if(!EventMod.combinationsLisSet){
		EventMod.combinationsLisSet = true;
		EventMod.__listenerStorage.comb = {
			combins: [],
			funcs: [],
			pressed: [],
			listener: false
		};
	}
	var storage = EventMod.__listenerStorage.comb;

	tmpFunc = (tmp = [el], tmp.keyListenerFunction = fn, tmp);

	if((tmp = EventMod.utils.approximateFindArray(
		storage.combins,
		keys
	)) === -1){
		storage.funcs.push([tmpFunc]),
		storage.combins.push(keys);
	}else{
		storage.funcs[tmp].push(tmpFunc);
	}

	if (storage.listener)
		return;
	storage.listener = true;

	window.addEventListener("keydown", function (e, fin) {
		var evElement = EventMod.utils.getElement(e),
			path = EventMod.utils.getElementPath(evElement);
		if (storage.pressed.indexOf(e.keyCode) === -1)
			storage.pressed.push(e.keyCode);
		
		storage.pressed = EventMod.utils.uniqueArray(storage.pressed);

		if ((fin = EventMod.utils.approximateFindArray(storage.combins, storage.pressed)) === -1)
			return;
		e.combination = storage.combins[fin];

		storage.funcs[fin].forEach(function (fn) {
			if (path.indexOf(fn[0]) === -1)
				return;
			fn.keyListenerFunction(e);
		});
	}, true);
	window.addEventListener("keyup", function (e, fin) {
		if ((fin = storage.pressed.indexOf(e.keyCode)) !== -1)
			storage.pressed.splice(fin, 1);
	}, true);
	window.addEventListener("focus", function () {
		storage.pressed = [];
	}, true);
};

EventMod.offCombination = function(el, combination, fn){
	var tmp, keys = [], tmpFunc;

	combination.split("+").forEach(function(k){
		keys.push(EventMod.utils.getKeyCode(k));
	});
	keys = EventMod.utils.uniqueArray(keys);
	var storage = EventMod.__listenerStorage.comb;
	

	if ((keys = EventMod.utils.approximateFindArray(storage.combins,keys)) === -1)
		return;

	for(var i = 0, len = storage.funcs[keys].length; i < len; i++){
		tmpFunc = storage.funcs[keys][i];
		if(tmpFunc[0] === el && tmpFunc.keyListenerFunction === fn){
			storage.funcs[keys].splice(i, 1);
			i--;
			len--;
		}
	}
	if (storage.funcs[keys].length < 1)
		storage.funcs.splice(keys, 1),
		storage.combins.splice(keys, 1);
};



EventMod.enableCssSelectors();