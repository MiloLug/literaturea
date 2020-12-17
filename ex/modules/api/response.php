<?php
	API_add_method("response","all",function($data = array("ok"=>false, "data"=>"unknown")){
		echo json_encode($data);
		return array(
			"ok" => true
		);
	});
?>