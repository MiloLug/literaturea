<?php
	API_add_method("getOp","all",function($select = array("id" => -1)){
		$id = $select["id"];
		if($id < 0)
			return array(
				"ok" => false
			);
		global $configs;
		$req = R::getRow("SELECT * FROM ops WHERE id = :id", array(
			":id" => $id
		));
		$req["text"] = file_get_contents(BOOKS . $id);
		return array(
			"ok" => true,
			"data" => $req
		);
	});
?>