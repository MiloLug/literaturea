<?php
	API_add_method("getAuthorByOp","all",function($select = array("id" => -1)){
		$id = $select["id"];
		if($id < 0)
			return array(
				"ok" => false
			);
		global $configs;
		$req = R::getRow("SELECT * FROM authors WHERE id = (SELECT authorid FROM ops WHERE ops.id = :id)", array(
			":id" => $id
		));
		return array(
			"ok" => true,
			"data" => $req
		);
	});
?>