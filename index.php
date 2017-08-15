<?php

define('PROJ_PATH',dirname(dirname(__FILE__)).'/');
define('TSF_PATH',PROJ_PATH.'TSF/');
define('APP_PATH',PROJ_PATH.'LlkServer/');
//define('BOOST_PATH',dirname(__FILE__).'/');
define('TPL_PATH',APP_PATH.'Tpl');
define('COMMON_PATH',PROJ_PATH.'Common/');
define('UPLOAD_PATH',PROJ_PATH.'Uploads/');
define('VENDOR_PATH',PROJ_PATH.'Vendor/');
define('PUB_PATH', PROJ_PATH.'Public/');

define( 'DEBUG', true);
define( 'DBG_TRACE', true);

require_once TSF_PATH . 'TSF.php';
TSF::initTSF();
TSF::import(VENDOR_PATH.'Weixin/');

$app_config = include (APP_PATH.'Config/Config.php');
TSF::initApp($app_config);

S::setTsfDb('lianliankan', S::config('db.lianliankan'));
S::setRedis('data_cache',S::config('redis.data_cache'));
Dispatch::runHttp($app_config['driver_mode']);