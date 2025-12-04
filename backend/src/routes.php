<?php

use App\GraphQL\Schema as AppSchema;
use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return static function (App $app): void {
    $app->get("/api/health", function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            "status" => "ok",
            "time"   => date("c"),
        ], JSON_UNESCAPED_UNICODE));

        return $response->withHeader("Content-Type", "application/json");
    });

        // GraphQL 엔드포인트
    $app->post("/api/graphql", function (Request $request, Response $response) use ($app) {
        // Slim 컨테이너나 설정에서 appConfig 뽑는 로직이 있으면 여기서 가져오고,
        // 당장은 env 기반으로 디버그만 간단히 처리하자.
        $debug = filter_var(
            $_ENV["APP_DEBUG"] ?? $_SERVER["APP_DEBUG"] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        $schema = AppSchema::build();

        // 요청 body 파싱 (JSON 기준)
        $parsedBody = $request->getParsedBody() ?? [];

        // 혹시 getParsedBody가 비어있으면 raw body 직접 파싱
        if (empty($parsedBody)) {
            $rawBody = (string) $request->getBody();
            if ($rawBody !== "") {
                $parsedBody = json_decode($rawBody, true) ?? [];
            }
        }

        $query         = $parsedBody["query"] ?? null;
        $variables     = $parsedBody["variables"] ?? null;
        $operationName = $parsedBody["operationName"] ?? null;

        if ($query === null) {
            $response->getBody()->write(json_encode([
                "errors" => [
                    ["message" => "Missing 'query' in request body"],
                ],
            ], JSON_UNESCAPED_UNICODE));

            return $response
                ->withStatus(400)
                ->withHeader("Content-Type", "application/json");
        }

        try {
            $result = GraphQL::executeQuery(
                $schema,
                $query,
                null,
                null,
                is_array($variables) ? $variables : null,
                $operationName
            );

            $debugFlags = $debug
                ? DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE
                : 0;

            $output = $result->toArray($debugFlags);
        } catch (\Throwable $e) {
            if ($debug) {
                // 개발 모드에서는 에러 그대로 노출
                $output = [
                    "errors" => [[
                        "message" => $e->getMessage(),
                        "trace"   => $e->getTraceAsString(),
                    ]],
                ];
            } else {
                // 운영 모드에서는 내부 에러 숨김
                $output = [
                    "errors" => [[
                        "message" => "Internal server error",
                    ]],
                ];
            }
        }

        $response->getBody()->write(json_encode($output, JSON_UNESCAPED_UNICODE));

        return $response->withHeader("Content-Type", "application/json");
    });
};
