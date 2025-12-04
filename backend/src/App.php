<?php

namespace App;

use Slim\Factory\AppFactory;
use Slim\App as SlimApp;

class App
{
    public static function create(array $config = []): SlimApp
    {
        $app = AppFactory::create();

        // --- 에러 미들웨어 ---
        $debug = $config["debug"] ?? true;
        $app->addErrorMiddleware($debug, true, true);

        // --- CORS 미들웨어 ---
        $app->add(function ($request, $handler) {
            $origin = $request->getHeaderLine("Origin");

            $allowedOrigins = [
                "http://localhost:3000",
                "https://ynhn.42web.io",
            ];

            $response = $handler->handle($request);

            // Origin 확인 후 허용
            if (in_array($origin, $allowedOrigins, true)) {
                $response = $response
                    ->withHeader("Access-Control-Allow-Origin", $origin)
                    ->withHeader("Access-Control-Allow-Credentials", "true")
                    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
                    ->withHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                    ->withHeader("Vary", "Origin");
            }

            return $response;
        });

        // --- OPTIONS 프리플라이트 처리 ---
        $app->options("/{routes:.+}", function ($request, $response) {
            return $response;
        });

        // --- routes.php 등록 ---
        $routes = require __DIR__ . "/routes.php";
        $routes($app);

        return $app;
    }
}
