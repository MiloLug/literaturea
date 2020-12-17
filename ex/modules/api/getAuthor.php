<?php
	API_add_method("getAuthor","all",function($select = array("id" => -1)){
		$id = $select["id"];
		if($id < 0)
			return array(
				"ok" => false
			);
		$req = R::getRow("SELECT * FROM authors WHERE id = :id", array(
			":id" => $id
		));
		$ops = R::getAll("SELECT id,name,LEFT(name, 1) AS letter FROM ops WHERE authorid = :id ORDER BY name ASC", array(
			":id" => $id
		));
		$req["ops"] = $ops;
		return array(
			"ok" => true,
			"data" => $req
		);
	});
?>