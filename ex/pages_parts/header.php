<div id="header" class="HCFBlock">
	<link href="<?=CLIENT_STYLE?>searcher.css" rel="stylesheet">
	<link href="<?=CLIENT_STYLE?>header.css" rel="stylesheet">
	
	<div class="toprow">
		<div class="sitename elem">
			<img class="l" src="<?=CLIENT_STYLE?>img/logoL.png">
			<text class="notl introFont NOSELECT">LITERATURE</text>
		</div>
		<div class="searcher elem">
			<input class="stdInput" type="text" placeholder="<?=translate("enter request", $dictionary)?>" value="<?=get("s","")?>">
			<button><i class="icon ion-md-search"></i></button>
			<div class="backplate">
				<div class="list"></div>
			</div>
		</div>
		<div class="addIcon elem">
			<img src="<?=CLIENT_STYLE?>img/telegram.svg" style="height: 32px">
		</div>
		<div class="addIcon elem">
			<img src="<?=CLIENT_STYLE?>img/telegram.svg" style="height: 32px">
		</div>
		<div class="addIcon elem">
			<img src="<?=CLIENT_STYLE?>img/telegram.svg" style="height: 32px">
		</div>
		<div class="addIcon elem">
			<img src="<?=CLIENT_STYLE?>img/telegram.svg" style="height: 32px">
		</div>
	</div>
	<div class="downrow">
		<a class="introFont underline" href=''><?=translate("school program", $dictionary)?></a>
		<a class="introFont underline" href=''><?=translate("school program", $dictionary)?></a>
		<a class="introFont underline" href=''><?=translate("school program", $dictionary)?></a>
	</div>
	<script src="<?=CLIENT_JS?>header/createSearch.js"></script>
	<script src="<?=CLIENT_JS?>header/UI.js"></script>
	<script src="<?=CLIENT_JS?>header/UI.interactive.js"></script>
</div>