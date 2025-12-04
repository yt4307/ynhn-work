<?php

// 작은 env 헬퍼 (이 파일 안에서만 사용)
$env = static function (string $key, $default = null) {
    return $_ENV[$key] ?? $_SERVER[$key] ?? $default;
};

return [
    "default" => $env("DB_CONNECTION", "mysql"),

    "connections" => [
        "mysql" => [
            "driver"    => "mysql",
            "host"      => $env("DB_HOST", "127.0.0.1"),
            "port"      => (int) $env("DB_PORT", 3306),
            "database"  => $env("DB_DATABASE", "ynhn_work"),
            "username"  => $env("DB_USERNAME", "root"),
            "password"  => $env("DB_PASSWORD", ""),
            "charset"   => "utf8mb4",
            "collation" => "utf8mb4_unicode_ci",
            "prefix"    => "",
        ],
    ],
];
