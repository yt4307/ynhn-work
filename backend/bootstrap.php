<?php

use Dotenv\Dotenv;
use Illuminate\Database\Capsule\Manager as Capsule;
use App\App as BackendApp;

require __DIR__ . "/vendor/autoload.php";

// 1. .env 로딩
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// 2. config 로딩
$appConfig = require __DIR__ . "/config/app.php";
$dbConfig  = require __DIR__ . "/config/database.php";

// 3. DB(Eloquent) 설정
$capsule = new Capsule();

$defaultConnection = $dbConfig["default"] ?? "mysql";
$connectionConfig  = $dbConfig["connections"][$defaultConnection] ?? null;

if ($connectionConfig === null) {
    throw new RuntimeException("Database connection [{$defaultConnection}] is not configured.");
}

$capsule->addConnection($connectionConfig);
$capsule->setAsGlobal();
$capsule->bootEloquent();

// 4. Slim App 생성
$app = BackendApp::create($appConfig);
