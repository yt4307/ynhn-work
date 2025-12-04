<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use InvalidArgumentException;

class TypeRegistry
{
    /**
     * 생성된 타입 캐시
     *
     * @var array<string, Type>
     */
    private array $types = [];

    /**
     * 타입 이름으로 GraphQL 타입 조회
     */
    public function get(string $name): Type
    {
        if (!isset($this->types[$name])) {
            $this->types[$name] = $this->resolve($name);
        }

        return $this->types[$name];
    }

    /**
     * 실제 타입 생성 로직
     */
    protected function resolve(string $name): Type
    {
        return match ($name) {
            "Work" => new \App\GraphQL\Types\WorkType($this),
            "WorkLink" => new \App\GraphQL\Types\WorkLinkType($this),
            default => throw new InvalidArgumentException("Unknown GraphQL type: {$name}"),
        };
    }
}
