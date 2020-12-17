<?php
	$URLRequest = trim(urldecode($_SERVER['REQUEST_URI']));
	$URLPath = call_user_func(function(){
		global $URLRequest;
		$r = array();
		$tmp=explode("?", $URLRequest);
		$tmp=explode("/", $tmp[0]);
		for($i = 0; $i < count($tmp); $i++)
			if($tmp[$i] != "")
				array_push($r,$tmp[$i]);
		return $r;
	});
?>