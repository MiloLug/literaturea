<?php
	include_once API."core.php";
	include_once API."searchFilterString.php";
	API_add_method("search","all",function($select = array()){
		global $configs;

		$search = API_call_method("searchFilterString",array(
			"text"=>$select["search"],
			"column"=>"name"
		));

		$queryAu = "SELECT id, name FROM authors WHERE 1 ";
		$queryOp = "SELECT id, name FROM ops WHERE 1 ";
		// $argsArray = array(
		// 	":start" => $start,
		// 	":count" => $count
		// );
		if($search["ok"]){
			$queryAu .= "AND ".$search["data"]["query"]." ";
			$queryOp .= "AND ".$search["data"]["query"]." ";
		}else{
			$queryAu .= "ORDER BY id ASC ";
			$queryOp .= "ORDER BY id ASC ";
		}
		$queryAu .= "LIMIT 10 ";
		$queryOp .= "LIMIT 10 ";
		//$query .= "LIMIT :start, :count";
		return array(
			"ok" => true,
			"data" => [
				"authors" => R::getAll($queryAu),
				"ops" => R::getAll($queryOp),
				"q" => [$queryAu, $queryOp]
			]
		);
	});
?>