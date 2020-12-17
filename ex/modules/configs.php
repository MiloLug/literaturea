<?php
	$configs = json_decode(file_get_contents(PATH . "ex/config.json"));
	$configs->pagesList = getOptionsIn(PAGES);
	$configs->langsList = getOptionsIn(LANGS);
	//DB config
	include_once MODULES . "RB.php";
	R::setup('mysql:host=127.0.0.1;dbname=literaturea','root', '');
	//****

	//Host config
	$siteDomain=$_SERVER['HTTP_HOST'];
	$protSiteDomain=(isHttps() ? "https" : "http")."://".$siteDomain; //domain with https/http prefix
	//****
?>