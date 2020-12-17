<?php
function isHttps() {
	if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443)
		return true;
	return false;
}
function get($key,$default = NULL){
	if(!isset($_GET[$key]))
		return $default;
	return urldecode($_GET[$key]);
}
function post($key,$default = NULL){
	if(!isset($_POST[$key]))
		return $default;
	return $_POST[$key];
}
function dotListFilter($list){
	$r = array();
	for ($i = 0; $i < count($list); $i++) {
		$au = $list[$i]["name"];
		if ($au !== ".." && $au !== ".") {
			$r[] = $list[$i];
		}
	}
	return $r;
}
function arrUrl($url){
	$tmp = array();
	$arr = explode("/", $url);
	foreach ($arr as $p) {
		if ($p !== "")
			$tmp[] = $p;
	}
	return $tmp;
}
function divNameExt($url){
	$name = array_pop(arrUrl($url));
	$name = explode(".",$name);
	$r="";
	$e="";
	if(count($name)<2)
		return $name;
	while(count($name)>0){
		$n=array_shift($name);
		$c=count($name);
		if($c<1){
			$e=$n;
		}else{
			$r.=$n;
			if($c>1)
				$r.=".";
		}
	}
	return array($r,$e);
}
function getOptionsIn($url){
	global $configs;
	$list = scandir($url);
	$r = array();
	for($i = 0; $i < count($list); $i++){
		$item = arrUrl($list[$i]);
		$item = $item[count($item) - 1];
		if($item == ".."||$item == ".")
			continue;
		$div = divNameExt($item);
		$r[] = array_search($div[1],$configs->notDisplayedExt) !== FALSE ? $div[0] : $item;
	}
	return $r;
}

function mb_substr_replace($original, $replacement, $position, $length)
{
    $startString = mb_substr($original, 0, $position, "UTF-8");
    $endString = mb_substr($original, $position + $length, mb_strlen($original), "UTF-8");

    $out = $startString . $replacement . $endString;

    return $out;
}

function translate($key, $dict){
	$lowKey = mb_strtolower($key);
	$txt=isset($dict[$lowKey]) ? $dict[$lowKey] : $lowKey;
	if($lowKey[0] != $key[0])
		$txt = mb_substr_replace($txt, mb_strtoupper(mb_substr($txt, 0, 1, "UTF-8"), 'UTF-8'), 0, 1);
	return $txt;
}
?>