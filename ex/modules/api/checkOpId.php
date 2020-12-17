<?php
	API_add_method("checkOpId","all",function($select = array("id" => -1)){
		$id = $select["id"];
		if($id < 0)
			return array(
				"ok" => false
			);
		global $configs;
		$author = array();
		$req = R::getCell("SELECT EXISTS(SELECT * FROM ops WHERE id = :id)", array(
			":id" => $id
		));
		return array(
			"ok" => true,
			"data" => $req
		);
	});
?>