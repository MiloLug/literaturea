<?php
define("PATH", dirname(__FILE__) . "/");
define("PATH_CLIENT", substr_replace(PATH, "", strpos(PATH,$_SERVER['DOCUMENT_ROOT']), strlen($_SERVER['DOCUMENT_ROOT'])));
define("CLIENT_STYLE", PATH_CLIENT . "ex/style/");
define("CLIENT_JS", PATH_CLIENT . "ex/js/");
define("LANGS", PATH . "ex/langs/");
define("PAGES", PATH . "ex/pages/");
define("PAGES_PARTS", PATH . "ex/pages_parts/");
define("LANGS", PATH . "ex/langs/");
define("MODULES", PATH . "ex/modules/");
define("ROUTERS", MODULES . "routers/");
define("API", MODULES . "api/");
define("BOOKS", PATH . "ex/books/");
?>