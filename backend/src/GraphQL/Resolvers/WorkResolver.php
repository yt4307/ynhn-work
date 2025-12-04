<?php

namespace App\GraphQL\Resolvers;

use App\Models\Work;
use GraphQL\Type\Definition\ResolveInfo;

class WorkResolver
{
    /**
     * 작업물 목록
     *
     * args:
     *  - category: 카테고리 문자열 (옵션)
     *  - limit: 개수 제한 (옵션)
     */
    public static function works($root, array $args, $context = null, ResolveInfo $info = null)
    {
        $query = Work::with("links")->ordered();

        if (!empty($args["category"])) {
            $query->where("category", $args["category"]);
        }

        if (!empty($args["limit"])) {
            $query->limit((int) $args["limit"]);
        }

        return $query->get();
    }

    /**
     * 단일 작업물 조회
     *
     * args:
     *  - id: 작업물 ID (필수)
     */
    public static function work($root, array $args, $context = null, ResolveInfo $info = null): ?Work
    {
        return Work::with("links")->find($args["id"]);
    }
}
