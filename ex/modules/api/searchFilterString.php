<?php
	API_add_method("searchFilterString","all",function($select = array()){
		$text = !isset($select["text"]) || !is_string($select["text"])? false : trim($select["text"]);
		$column = !isset($select["column"]) || !is_string($select["column"])? false : trim($select["column"]);
		$strict = !!$select["strict"];
		if(!$text || !$column)
			return array(
				"ok" => false,
				"data" => array()
			);
		
		$re = '/[^\w\s\pL]+/m';
		$text = mb_ereg_replace($re,"",$text);
		$text = mb_ereg_replace(['/\s{2,}/', '/[\t\n]/']," ",$text);

		$text_arr = explode(" ",$text);
		$len = count($text_arr);
		$text = "";
		$query = "";
		for($i = 0; $i<$len;$i++){
			$text_arr[$i] = trim($text_arr[$i]);
			if($text_arr[$i] != ""){
				if($strict){
					$query .= ($i<1?$column.' LIKE ("':"").$text_arr[$i].($i === ($len-1) ? '") ' : " ");
				}else{
					$query .= ($i<1?"":"OR ").$column.' LIKE "%'.$text_arr[$i].'%" ';
				}
				$text .= ($i<1?"":" ").$text_arr[$i];
			}
		}
		return array(
			"ok" => $text != "",
			"data" => array(
				"text"=>$text,
				"query"=>$query
			)
		);
	});
?>