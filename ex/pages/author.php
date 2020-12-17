<?php
    $id = get("id",false);
	$id = @$URLPath[0];
	$URLNamedParams["author_id"] = $id;
	echo_AddNamedParam("author_id", $id);
	if($id!==NULL){
		include_once API . "getAuthor.php";
		$author = API_call_method("getAuthor", array("id"=>$id));
		if($author["ok"]){
		//echo json_encode($author);
?>

<div class="author source" hidden>
	<?=json_encode($author["data"])?>
</div>
<link rel="stylesheet" href="<?=CLIENT_STYLE?>alphaList.css">
<link rel="stylesheet" href="<?=CLIENT_STYLE?>author.css">

<div id="author">
	<div class="title lg">
		<a class="underline" href="/author/<?=$id."/".$URLNamedParams["lang"]?>"><?=$author["data"]["name"]?></a>
	</div>
	<div class="cont alphaList">
		<div v-for="(ops, letter) in byLetters" class='alphaBlock'>
			<div class='alpha'>{{letter}}</div>
			<div class='list'>
				<a v-for="op in ops" class='outline-dashed link' v-bind:href='"/read/"+op.id+"/"+URLNamedParams.lang'>
					{{op.name}}
				</a>
			</div>
		</div>
	</div>
</div>

<script>
common.setLocationPath([
	URLNamedParams.page,
	URLNamedParams.author_id,
	URLNamedParams.lang
]);

var appAuthor = new Vue({
	el: '#author',
	data: function(){
		var tmp = JSON.parse(document.querySelector(".author.source").innerHTML);
		var byLetters = {};

		tmp.ops.forEach(function(op){
			if(!byLetters[op.letter])
				byLetters[op.letter] = [];
			byLetters[op.letter].push(op);
		});
		
		return {
			byLetters: byLetters
		};
	}
});

</script>

<?php 
		}else{ //no data
			include PAGES . $configs->errorPage . ".php";
		}
	}else{ //no id
		include PAGES . $configs->errorPage . ".php";
	}
?>