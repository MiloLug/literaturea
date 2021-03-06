// CodeMirror, copyright (c) by Marijn Haverbeke and others,
// Initial htmlmixed-lint.js from István Király, https://github.com/LaKing
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Depends on htmlhint jshint and csshint

// Mod by MiloLug

(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"), require("htmlhint"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror", "htmlhint"], mod);
	else // Plain browser env
		mod(CodeMirror, window.HTMLHint);
})(function (CodeMirror, HTMLHint) {
	"use strict";

	var defaultRules = {
		"tagname-lowercase": true,
		"attr-lowercase": true,
		"attr-value-double-quotes": true,
		"doctype-first": false,
		"tag-pair": true,
		"spec-char-escape": true,
		"id-unique": true,
		"src-not-empty": true,
		"attr-no-duplication": true
	};

	// dependency verification
	// htmllint
	var found = [];
	if (HTMLHint && !HTMLHint.verify)
		HTMLHint = HTMLHint.HTMLHint;
	if (!HTMLHint)
		HTMLHint = window.HTMLHint;
	if (!HTMLHint) {
		if (window.console) {
			window.console.error("Error: window.HTMLHint not found, CodeMirror HTML mixed linting cannot run.");
		}
		return found;
	}
	//  csslint
	if (!window.CSSLint) {
		if (window.console) {
			window.console.error("Error: window.CSSLint not defined, CodeMirror HTML mixed linting cannot run.");
		}
		return found;
	}

	function newlines(str) {
		return str.split('\n').length;
	}

	function processHTML(nophp, options, found) {
		var text = nophp.t;
		var messages = HTMLHint.verify(text, options && options.rules || defaultRules),
		curOffset = 0;
		for (var i = 0; i < messages.length; i++) {
			var message = messages[i];
			curOffset = nophp.o[message.line] || curOffset;
			var startLine = curOffset + message.line - 1,
			endLine = curOffset + message.line - 1,
			startCol = message.col - 1,
			endCol = message.col;
			found.push({
				from: CodeMirror.Pos(startLine, startCol),
				to: CodeMirror.Pos(endLine, endCol),
				message: message.message,
				severity: message.type
			});
		}
	}

	function processCSS(nophp, options, found) {
		var text = nophp.t;
		var blocks = text.split(/<style[\s\S]*?>|<\/style>/gi),
		curOffset = 0;
		for (var j = 1; j < blocks.length; j += 2) {
			var offset = newlines(blocks.slice(0, j).join());
			var results = CSSLint.verify(blocks[j], options);
			var messages = results.messages;
			var message = null;
			curOffset = nophp.o[offset] || curOffset;
			for (var i = 0; i < messages.length; i++) {
				message = messages[i];
				var startLine = curOffset + offset - 1 + message.line - 1,
				endLine = curOffset + offset - 1 + message.line - 1,
				startCol = message.col - 1,
				endCol = message.col;
				found.push({
					from: CodeMirror.Pos(startLine, startCol),
					to: CodeMirror.Pos(endLine, endCol),
					message: message.message,
					severity: message.type
				});
			}
		}
	}

	CodeMirror.registerHelper("lint", "html", function (text, options) {
		var found = [],
		noPhp = {
			t: text,
			o: 0
		};

		if (!options.indent)
			options.indent = 1;

		var CSSoptions = options.css || JSON.parse(JSON.stringify(options));
		var HTMLoptions = options.html || JSON.parse(JSON.stringify(options));

		processHTML(noPhp, HTMLoptions, found);

		processCSS(noPhp, CSSoptions, found);

		return found;
	});
});
