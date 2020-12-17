<?php
	API_add_method("getAuthors","all",function($select = array("id" => -1)){
		$id = $select["id"];
		if($id < 0)
			return array(
				"ok" => false
			);
		$req = R::getAll("SELECT * FROM authors");
		return array(
			"ok" => true,
			"data" => $req
		);
	});
?>