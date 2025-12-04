<?php

// 작은 env 헬퍼 (config 파일에서만 쓸 용도)
$env = static function (string $key, $default = null) {
    return $_ENV[$key] ?? $_SERVER[$key] ?? $default;
};

return [
    "name" => "ynhn-work-backend",
    "env" => $env("APP_ENV", "production"),
    "debug" => filter_var($env("APP_DEBUG", false), FILTER_VALIDATE_BOOLEAN),

    "http" => [
        "base_path" => "", // 리버스 프록시 뒤에 있을 경우 수정
    ],
];
