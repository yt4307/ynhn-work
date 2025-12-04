<?php

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use App\Models\Work;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class WorkType extends ObjectType
{
    public function __construct(TypeRegistry $types)
    {
        parent::__construct([
            "name" => "Work",
            "description" => "포트폴리오 작업물",
            "fields" => function () use ($types) {
                return [
                    "id" => [
                        "type" => Type::nonNull(Type::id()),
                        "description" => "작업물 ID",
                    ],
                    "title" => [
                        "type" => Type::nonNull(Type::string()),
                        "description" => "프로젝트 제목",
                    ],
                    "summary" => [
                        "type" => Type::nonNull(Type::string()),
                        "description" => "짧은 요약",
                    ],
                    "description" => [
                        "type" => Type::nonNull(Type::string()),
                        "description" => "상세 설명 (마크다운)",
                    ],
                    "thumbnail" => [
                        "type" => Type::string(),
                        "description" => "대표 이미지 URL",
                    ],
                    "images" => [
                        "type" => Type::listOf(Type::nonNull(Type::string())),
                        "description" => "이미지 URL 리스트",
                        "resolve" => static fn(Work $work) => $work->images ?? [],
                    ],
                    "category" => [
                        "type" => Type::string(),
                        "description" => "카테고리 문자열",
                    ],
                    "tags" => [
                        "type" => Type::listOf(Type::nonNull(Type::string())),
                        "description" => "태그 리스트",
                        "resolve" => static fn(Work $work) => $work->tags ?? [],
                    ],
                    "techs" => [
                        "type" => Type::listOf(Type::nonNull(Type::string())),
                        "description" => "기술 스택 리스트",
                        "resolve" => static fn(Work $work) => $work->techs ?? [],
                    ],
                    "startedAt" => [
                        "type" => Type::string(),
                        "description" => "시작일 (YYYY-MM-DD)",
                        "resolve" => static fn(Work $work) => $work->started_at?->toDateString(),
                    ],
                    "endedAt" => [
                        "type" => Type::string(),
                        "description" => "종료일 (YYYY-MM-DD)",
                        "resolve" => static fn(Work $work) => $work->ended_at?->toDateString(),
                    ],
                    "isOngoing" => [
                        "type" => Type::nonNull(Type::boolean()),
                        "description" => "진행중 여부",
                        "resolve" => static fn(Work $work) => (bool) $work->is_ongoing,
                    ],
                    "sortOrder" => [
                        "type" => Type::nonNull(Type::int()),
                        "description" => "정렬 우선순위",
                        "resolve" => static fn(Work $work) => $work->sort_order,
                    ],
                    "links" => [
                        "type" => Type::nonNull(Type::listOf(Type::nonNull($types->get("WorkLink")))),
                        "description" => "외부 링크 리스트 (GitHub, Demo 등)",
                        "resolve" => static fn(Work $work) => $work->links()->ordered()->get(),
                    ],
                    "createdAt" => [
                        "type" => Type::string(),
                        "description" => "생성 시각 (ISO8601)",
                        "resolve" => static fn(Work $work) => $work->created_at?->toIso8601String(),
                    ],
                    "updatedAt" => [
                        "type" => Type::string(),
                        "description" => "수정 시각 (ISO8601)",
                        "resolve" => static fn(Work $work) => $work->updated_at?->toIso8601String(),
                    ],
                ];
            },
        ]);
    }
}
