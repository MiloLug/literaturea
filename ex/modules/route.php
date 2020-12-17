<?php
	if(count($URLPath) === 0)
		$URLPath[0]=$configs->defaultPage;

	switch($URLPath[0]){
		case "api":
			include ROUTERS."apiRouter.php";
			break;
		default:
			include ROUTERS."mainRouter.php";
	}
?>