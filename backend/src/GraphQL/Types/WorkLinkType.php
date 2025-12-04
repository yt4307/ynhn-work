<?php

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class WorkLinkType extends ObjectType
{
    public function __construct(TypeRegistry $types)
    {
        parent::__construct([
            "name" => "WorkLink",
            "description" => "외부 링크 (GitHub, Demo 등)",
            "fields" => function () {
                return [
                    "id" => [
                        "type" => Type::nonNull(Type::id()),
                        "description" => "링크 ID",
                    ],
                    "label" => [
                        "type" => Type::nonNull(Type::string()),
                        "description" => "버튼에 표시될 이름 (GitHub, Demo 등)",
                    ],
                    "url" => [
                        "type" => Type::nonNull(Type::string()),
                        "description" => "실제 이동할 URL",
                    ],
                    "sortOrder" => [
                        "type" => Type::nonNull(Type::int()),
                        "description" => "버튼 정렬 순서 (낮을수록 먼저)",
                        "resolve" => static fn($value) => $value->sort_order,
                    ],
                ];
            },
        ]);
    }
}
