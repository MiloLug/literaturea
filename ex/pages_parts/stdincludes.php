
<script>
	var PATH = {
		style: "<?=CLIENT_STYLE?>",
		js: "<?=CLIENT_JS?>",
		client: "<?=PATH_CLIENT?>"
	};
	var DICTIONARY = <?=json_encode($dictionary)?>;
	var CONFIGS = <?=json_encode($configs)?>;
	var URLPath = <?=json_encode($URLPath)?>;
	var URLNamedParams = <?=json_encode($URLNamedParams)?>;
</script>

<script src="<?=CLIENT_JS?>polyfills/EventMod.js"></script>

<script src="<?=CLIENT_JS?>polyfills/Promise.js"></script>
<script src="<?=CLIENT_JS?>polyfills/EventTarget.js"></script>
<script src="<?=CLIENT_JS?>polyfills/AbortController.js"></script>
<script src="<?=CLIENT_JS?>polyfills/fetch.js"></script>
<script src="<?=CLIENT_JS?>polyfills/heir.js"></script>
<script src="<?=CLIENT_JS?>polyfills/EventEmitter.js"></script>

<script src="<?=CLIENT_JS?>vue.min.js"></script>

<script src="<?=CLIENT_JS?>API.js"></script>
<script src="<?=CLIENT_JS?>common.js"></script>
<script src="<?=CLIENT_JS?>UI.js"></script>
<script src="<?=CLIENT_JS?>UI.interactive.js"></script>

<link href="<?=CLIENT_STYLE?>font/proxima_nova/style.css" rel="stylesheet">
<link href="<?=CLIENT_STYLE?>font/intro/style.css" rel="stylesheet">
<link href="<?=CLIENT_STYLE?>font/buttons2/style.css" rel="stylesheet">
<link href="<?=CLIENT_STYLE?>layers.css" rel="stylesheet">
<link href="<?=CLIENT_STYLE?>common.css" rel="stylesheet">