<?php
	$URLNamedParams = call_user_func(function(){
		global $URLPath, $configs;
		$len = count($URLPath);
		$r = array(
			"page" => false,
			"lang" => false
		);
		switch($len){
			case 0:
				$r["page"]=$configs->defaultPage;
			break;
			case 1:
				if(array_search($URLPath[0],$configs->pagesList) === false)
					if(array_search($URLPath[0],$configs->langsList) !== false){
						$r["page"]=$configs->defaultPage;
						$r["lang"]=$URLPath[0];
					}else{
						$r["lang"]=$configs->defaultLanguage;
						$r["page"]=$configs->errorPage;
					}
				else{
					$r["lang"]=$configs->defaultLanguage;
					$r["page"]=$URLPath[0];
				}
				array_shift($URLPath);
				$len--;
			break;
			default:
				if(array_search($URLPath[0],$configs->pagesList) === false)
					$r["page"]=$configs->errorPage;
				else{
					$r["page"]=$URLPath[0];
					array_shift($URLPath);
					$len--;
				}
				if(array_search($URLPath[$len-1],$configs->langsList) === false)
					$r["lang"]=$configs->defaultLanguage;
				else{
					$r["lang"]=$URLPath[$len-1];
					array_pop($URLPath);
					$len--;
				}
		}
		return $r;
	});
	$dictionary=json_decode(file_get_contents(LANGS . $URLNamedParams["lang"] . ".json"), true);
	$dictionary["preview image url"] = CLIENT_STYLE . "img/previewImage.png";
	function echo_AddNamedParam($name, $value){
		echo "<script>URLNamedParams['".$name."'] = ".json_encode($value)."</script>";
	}
	//*****
?>

<div id="resolutionDiv"></div>
<html>
	<!-- <script>var VERSION=0;</script>
	<script src="/version.js"></script>
	<script src="/precache.js"></script>
	<script>
		precache("/precache.json","literaturea_cache_temp");
	</script> -->
	<head>
		<?php include PAGES_PARTS."stdhead.php";?>
	</head>
	<body inPreloading sidebar-hidden=".">
		<div class="body-bg h_center NOSELECT"><img src="<?=CLIENT_STYLE?>img/tree.png"/></div>
		
		<?php 
			if(!get("nostdincludes",false))
				include PAGES_PARTS."stdincludes.php";?>

		<div id="h-c-f">

			<?php 
				if(!get("noheader",false))
				include PAGES_PARTS."header.php";?>	
			
			<div id="content" class="HCFBlock">
				<?php call_user_func(function(){
					global $configs;
					global $URLNamedParams;
					global $URLPath;
					global $dictionary;
					include PAGES . $URLNamedParams["page"].".php";});?>	
			</div>
			
			<?php 
				if(!get("nofooter",false))
				include PAGES_PARTS."footer.php";?>
			<script>
				// "body *".all((item)=>{
				// 	item.css({
				// 		"animation": "0."+ Math.floor((5 + Math.random() * (100 + 1 - 5)))+"s linear 0s infinite alternate move_eye"
				// 	});
				// });
			</script>
		</div>
	</body>
</html>