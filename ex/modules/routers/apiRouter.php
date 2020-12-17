<?php
	array_shift($URLPath);
	include_once API . 'getAuthor.php';
	include_once API . 'getAuthorByOp.php';
	include_once API . 'checkOpId.php';
	include_once API . 'response.php';
	include_once API . 'search.php';
	include_once API . 'getOp.php';
	include_once API . 'getAuthors.php';
	include_once API . 'getAuthor.php';
	call_user_func(function(){
		global $API, $URLPath;
		$method = isset($URLPath[0]) ? $URLPath[0] : false;
		$data = json_decode(post('data','{}'),true);
		if(!API_exists_method($method,"all"))
			API_call_method("response",array(
				"ok"=>false,
				"data"=>"no exists method"
			));
		else
			API_call_method("response",API_call_method($method,$data));
	});

?>