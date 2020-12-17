<?php
    include_once API . "getAuthors.php";
	$authors = API_call_method("getAuthors");
	$alpha = @$URLPath[0];
	if($alpha == NULL){
		$alpha = "all";
	}else{
		$alpha = mb_strtolower($alpha);
		array_shift($URLPath);
	}
	$URLNamedParams["authors_alpha"] = $alpha;
	echo_AddNamedParam("authors_alpha", $alpha);
?>
			
<div id="authors">
	<link rel="stylesheet" href="<?=CLIENT_STYLE?>alphaList.css">
	<link rel="stylesheet" href="<?=CLIENT_STYLE?>authors.css">
	<div class="source" hidden>
		<?=json_encode($authors["data"])?>
	</div>
	<div class="cont alphaList">
	</div>
	<script src="<?=CLIENT_JS?>authors/UI.js"></script>
	<script src="<?=CLIENT_JS?>authors/UI.interactive.js"></script>
</div>