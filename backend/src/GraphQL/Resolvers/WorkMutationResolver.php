<?php

namespace App\GraphQL\Resolvers;

use App\Models\Work;
use App\Models\WorkLink;

class WorkMutationResolver
{
    /**
     * 작업물 생성
     *
     * args:
     *  - input: {
     *      title, summary, description,
     *      thumbnail, images, category, tags, techs,
     *      startedAt, endedAt, isOngoing, sortOrder
     *    }
     */
    public static function createWork($root, array $args): Work
    {
        $input = $args["input"] ?? [];

        self::assertRequired($input, ["title", "summary", "description"]);

        $work = new Work();

        self::fillWorkFromInput($work, $input);

        $work->save();

        return $work->refresh();
    }

    /**
     * 작업물 수정
     *
     * args:
     *  - id: ID!
     *  - input: (부분 업데이트 허용)
     */
    public static function updateWork($root, array $args): ?Work
    {
        $id    = $args["id"];
        $input = $args["input"] ?? [];

        $work = Work::find($id);
        if (!$work) {
            return null; // GraphQL에서 data.work = null
        }

        self::fillWorkFromInput($work, $input, partial: true);

        $work->save();

        return $work->refresh();
    }

    /**
     * 작업물 삭제
     *
     * args:
     *  - id: ID!
     *
     * return: true if deleted, false otherwise
     */
    public static function deleteWork($root, array $args): bool
    {
        $id = $args["id"];

        $work = Work::find($id);
        if (!$work) {
            return false;
        }

        return (bool) $work->delete();
    }

    /**
     * 작업물에 링크 추가
     *
     * args:
     *  - input: { workId, label, url, sortOrder? }
     */
    public static function createWorkLink($root, array $args): WorkLink
    {
        $input = $args["input"] ?? [];

        self::assertRequired($input, ["workId", "label", "url"]);

        $work = Work::find($input["workId"]);
        if (!$work) {
            throw new \RuntimeException("Work not found: {$input["workId"]}");
        }

        $link = new WorkLink([
            "label"      => $input["label"],
            "url"        => $input["url"],
            "sort_order" => $input["sortOrder"] ?? 0,
        ]);

        $work->links()->save($link);

        return $link->refresh();
    }

    /**
     * 링크 수정
     *
     * args:
     *  - id: ID!
     *  - input: { label?, url?, sortOrder? }
     */
    public static function updateWorkLink($root, array $args): ?WorkLink
    {
        $id    = $args["id"];
        $input = $args["input"] ?? [];

        $link = WorkLink::find($id);
        if (!$link) {
            return null;
        }

        if (array_key_exists("label", $input)) {
            $link->label = $input["label"];
        }
        if (array_key_exists("url", $input)) {
            $link->url = $input["url"];
        }
        if (array_key_exists("sortOrder", $input)) {
            $link->sort_order = (int) $input["sortOrder"];
        }

        $link->save();

        return $link->refresh();
    }

    /**
     * 링크 삭제
     *
     * args:
     *  - id: ID!
     */
    public static function deleteWorkLink($root, array $args): bool
    {
        $id = $args["id"];

        $link = WorkLink::find($id);
        if (!$link) {
            return false;
        }

        return (bool) $link->delete();
    }

    /**
     * Work 모델에 input 값 매핑
     *
     * @param Work $work
     * @param array $input
     * @param bool $partial true면 제공된 필드만 업데이트
     */
    private static function fillWorkFromInput(Work $work, array $input, bool $partial = false): void
    {
        $map = [
            "title"       => "title",
            "summary"     => "summary",
            "description" => "description",
            "thumbnail"   => "thumbnail",
            "category"    => "category",
            "sortOrder"   => "sort_order",
            "isOngoing"   => "is_ongoing",
            "startedAt"   => "started_at",
            "endedAt"     => "ended_at",
        ];

        foreach ($map as $inputKey => $attr) {
            if ($partial && !array_key_exists($inputKey, $input)) {
                continue;
            }

            if (!array_key_exists($inputKey, $input)) {
                continue;
            }

            $value = $input[$inputKey];

            if ($inputKey === "sortOrder" && $value !== null) {
                $value = (int) $value;
            }

            if ($inputKey === "isOngoing" && $value !== null) {
                $value = (bool) $value;
            }

            $work->{$attr} = $value;
        }

        // 배열 타입들
        if (!$partial || array_key_exists("images", $input)) {
            if (array_key_exists("images", $input)) {
                $work->images = $input["images"] ?? null;
            }
        }

        if (!$partial || array_key_exists("tags", $input)) {
            if (array_key_exists("tags", $input)) {
                $work->tags = $input["tags"] ?? null;
            }
        }

        if (!$partial || array_key_exists("techs", $input)) {
            if (array_key_exists("techs", $input)) {
                $work->techs = $input["techs"] ?? null;
            }
        }
    }

    /**
     * 필수 필드 체크 (간단한 수동 validation)
     */
    private static function assertRequired(array $input, array $requiredKeys): void
    {
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $input) || $input[$key] === null || $input[$key] === "") {
                throw new \InvalidArgumentException("Field '{$key}' is required.");
            }
        }
    }
}
