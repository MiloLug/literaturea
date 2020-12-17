<?php
	$API = array();
	function API_add_method($name,$scope,$fn){
		global $API;
		if(is_callable($API[$name]))
			return false;

		$API[$name] = array(
			"scope" => $scope,
			"fn" => $fn
		);
		return true;
	}
	function API_call_method($name,$args = array()){
		global $API;
		return call_user_func($API[$name]["fn"],$args);
	}
	function API_exists_method($name,$scope = false){
		global $API;
		if(!is_string($name)
			|| !is_callable($API[$name]["fn"])
			|| ($scope !== false ? $API[$name]["scope"] !== $scope : false))
			return false;
		return true;
	}
?>