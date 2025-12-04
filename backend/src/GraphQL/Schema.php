<?php

namespace App\GraphQL;

use App\GraphQL\Resolvers\WorkResolver;
use App\GraphQL\Resolvers\WorkMutationResolver;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema as GraphQLSchema;

class Schema
{
    public static function build(): GraphQLSchema
    {
        $types = new TypeRegistry();

        // Query 타입 (기존 그대로)
        $queryType = new ObjectType([
            "name" => "Query",
            "fields" => [
                "works" => [
                    "type" => Type::nonNull(Type::listOf(Type::nonNull($types->get("Work")))),
                    "description" => "작업물 목록",
                    "args" => [
                        "category" => [
                            "type" => Type::string(),
                            "description" => "카테고리 필터",
                        ],
                        "limit" => [
                            "type" => Type::int(),
                            "description" => "가져올 최대 개수",
                        ],
                    ],
                    "resolve" => [WorkResolver::class, "works"],
                ],
                "work" => [
                    "type" => $types->get("Work"),
                    "description" => "ID로 단일 작업물 조회",
                    "args" => [
                        "id" => [
                            "type" => Type::nonNull(Type::id()),
                        ],
                    ],
                    "resolve" => [WorkResolver::class, "work"],
                ],
            ],
        ]);

        // ===== Input 타입들 =====

        $workInput = new InputObjectType([
            "name" => "WorkInput",
            "description" => "작업물 생성용 입력 타입",
            "fields" => [
                "title"       => Type::nonNull(Type::string()),
                "summary"     => Type::nonNull(Type::string()),
                "description" => Type::nonNull(Type::string()),
                "thumbnail"   => Type::string(),
                "images"      => Type::listOf(Type::nonNull(Type::string())),
                "category"    => Type::string(),
                "tags"        => Type::listOf(Type::nonNull(Type::string())),
                "techs"       => Type::listOf(Type::nonNull(Type::string())),
                "startedAt"   => Type::string(), // YYYY-MM-DD
                "endedAt"     => Type::string(),
                "isOngoing"   => Type::boolean(),
                "sortOrder"   => Type::int(),
            ],
        ]);

        $workUpdateInput = new InputObjectType([
            "name" => "WorkUpdateInput",
            "description" => "작업물 수정용 입력 타입 (부분 업데이트)",
            "fields" => [
                "title"       => Type::string(),
                "summary"     => Type::string(),
                "description" => Type::string(),
                "thumbnail"   => Type::string(),
                "images"      => Type::listOf(Type::nonNull(Type::string())),
                "category"    => Type::string(),
                "tags"        => Type::listOf(Type::nonNull(Type::string())),
                "techs"       => Type::listOf(Type::nonNull(Type::string())),
                "startedAt"   => Type::string(),
                "endedAt"     => Type::string(),
                "isOngoing"   => Type::boolean(),
                "sortOrder"   => Type::int(),
            ],
        ]);

        $workLinkInput = new InputObjectType([
            "name" => "WorkLinkInput",
            "description" => "작업물 링크 생성용 입력 타입",
            "fields" => [
                "workId"    => Type::nonNull(Type::id()),
                "label"     => Type::nonNull(Type::string()),
                "url"       => Type::nonNull(Type::string()),
                "sortOrder" => Type::int(),
            ],
        ]);

        $workLinkUpdateInput = new InputObjectType([
            "name" => "WorkLinkUpdateInput",
            "description" => "작업물 링크 수정용 입력 타입",
            "fields" => [
                "label"     => Type::string(),
                "url"       => Type::string(),
                "sortOrder" => Type::int(),
            ],
        ]);

        // ===== Mutation 타입 =====

        $mutationType = new ObjectType([
            "name" => "Mutation",
            "fields" => [
                "createWork" => [
                    "type" => Type::nonNull($types->get("Work")),
                    "description" => "새 작업물 생성",
                    "args" => [
                        "input" => [
                            "type" => Type::nonNull($workInput),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "createWork"],
                ],
                "updateWork" => [
                    "type" => $types->get("Work"),
                    "description" => "기존 작업물 수정 (부분 업데이트)",
                    "args" => [
                        "id" => [
                            "type" => Type::nonNull(Type::id()),
                        ],
                        "input" => [
                            "type" => Type::nonNull($workUpdateInput),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "updateWork"],
                ],
                "deleteWork" => [
                    "type" => Type::nonNull(Type::boolean()),
                    "description" => "작업물 삭제",
                    "args" => [
                        "id" => [
                            "type" => Type::nonNull(Type::id()),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "deleteWork"],
                ],

                // 링크 관련
                "createWorkLink" => [
                    "type" => Type::nonNull($types->get("WorkLink")),
                    "description" => "작업물에 외부 링크 추가",
                    "args" => [
                        "input" => [
                            "type" => Type::nonNull($workLinkInput),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "createWorkLink"],
                ],
                "updateWorkLink" => [
                    "type" => $types->get("WorkLink"),
                    "description" => "작업물 외부 링크 수정",
                    "args" => [
                        "id" => [
                            "type" => Type::nonNull(Type::id()),
                        ],
                        "input" => [
                            "type" => Type::nonNull($workLinkUpdateInput),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "updateWorkLink"],
                ],
                "deleteWorkLink" => [
                    "type" => Type::nonNull(Type::boolean()),
                    "description" => "작업물 외부 링크 삭제",
                    "args" => [
                        "id" => [
                            "type" => Type::nonNull(Type::id()),
                        ],
                    ],
                    "resolve" => [WorkMutationResolver::class, "deleteWorkLink"],
                ],
            ],
        ]);

        return new GraphQLSchema([
            "query" => $queryType,
            "mutation" => $mutationType,
        ]);
    }
}
