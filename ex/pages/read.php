<?php
	$id = @$URLPath[0];
	$URLNamedParams["read_opId"] = $id;
	echo_AddNamedParam("read_opId", $id);
	$author;
	$op;
	if($id!==NULL){
		array_shift($URLPath);
		include_once API . "getAuthorByOp.php";
		include_once API . "getOp.php";
		$author = API_call_method("getAuthorByOp", array(
			"id"=>$id
		));
		$op = API_call_method("getOp", array(
			"id"=>$id
		));
		if($op["ok"] && $author["ok"]){
?>
			
<div id="read">
	<link rel="stylesheet" href="<?=CLIENT_STYLE?>read.css">
	<div class="title">
		<h1><?=$op["data"]["name"]?></h1>
		<h2><a class="underline" href="/author/<?=$author["data"]["id"]."/".$URLNamedParams["lang"]?>"><?=$author["data"]["name"]?></a></h2>
	</div>
	<div class="pages">
		<table class="ctable">
			<td class="left NOSELECT"><button class="left" funcs="reader.prev">
				<div>
					<i class="icon ion-md-arrow-dropleft"></i><text class="prevPageNum"></text>
				</div>
			</button></td>
			<td class="center">
				<input type="text" class="curPageNum"><br>
				<hr class="aline"><br>
				<?=translate("total", $dictionary)?> <text class="allPagesCount"></text> <?=translate("pag.", $dictionary)?>
			</td>
			<td class="right NOSELECT"><button class="right" funcs="reader.next">
				<div>
					<text class="nextPageNum"></text><i class="icon ion-md-arrow-dropright"></i>
				</div>
			</button></td>
		</table>
	</div>
	<div class="resizeMenu">
		<button class="add" funcs="reader.addFontSize">
			<i class="icon ion-md-arrow-dropup"></i>
			<text class="introFont">A</text>
		</button>
		<button class="remove" funcs="reader.remFontSize">
			<i class="icon ion-md-arrow-dropdown"></i>
			<text class="introFont">A</text>
		</button>
		<button class="fullscreen" funcs="reader.switchFullscreen">
			<i class="icon ion-md-expand"></i>
		</button>
	</div>
	<div class="source" hidden>
		<?=$op["data"]["text"]?>
	</div>
	<div class="cont">
	</div>
	<div class="pages">
		<table class="ctable">
			<td class="left NOSELECT"><button class="left" funcs="reader.prev">
				<div>
					<i class="icon ion-md-arrow-dropleft"></i><text class="prevPageNum"></text>
				</div>
			</button></td>
			<td class="center">
				<input type="text" class="curPageNum"><br>
				<hr class="aline"><br>
				усього <text class="allPagesCount"></text> стр.
			</td>
			<td class="right NOSELECT"><button class="right" funcs="reader.next">
				<div>
					<text class="nextPageNum"></text><i class="icon ion-md-arrow-dropright"></i>
				</div>
			</button></td>
		</table>
	<script src="<?=CLIENT_JS?>read/UI.js"></script>
	<script src="<?=CLIENT_JS?>read/UI.interactive.js"></script>
</div>

<?php	
		}else{ //no data
			include PAGES . $configs->errorPage . ".php";
		}
	}else{ //no id
		include PAGES . $configs->errorPage . ".php";
	}
?>