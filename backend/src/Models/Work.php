<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 포트폴리오 작업물 모델
 *
 * @property int $id
 * @property string $title
 * @property string $summary
 * @property string $description
 * @property string|null $thumbnail
 * @property array|null $images
 * @property string|null $category
 * @property array|null $tags
 * @property array|null $techs
 * @property string|null $started_at
 * @property string|null $ended_at
 * @property bool $is_ongoing
 * @property int $sort_order
 */
class Work extends Model
{
    // Eloquent가 기본적으로 복수형을 테이블명으로 사용하지만,
    // 명시적으로 써두는 편이 안전함
    protected $table = 'works';

    // 일괄 할당 허용 필드
    protected $fillable = [
        'title',
        'summary',
        'description',
        'thumbnail',
        'images',
        'category',
        'tags',
        'techs',
        'started_at',
        'ended_at',
        'is_ongoing',
        'sort_order',
    ];

    // 타입 캐스팅
    protected $casts = [
        'images'     => 'array',   // JSON → array
        'tags'       => 'array',
        'techs'      => 'array',
        'is_ongoing' => 'boolean',
        'started_at' => 'date',
        'ended_at'   => 'date',
    ];

    /**
     * 이 작업물에 연결된 외부 링크들 (GitHub, Demo 등)
     */
    public function links(): HasMany
    {
        return $this->hasMany(WorkLink::class, 'work_id')
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    /**
     * 기본 정렬 스코프 (sort_order → id desc)
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')
                     ->orderByDesc('id');
    }
}
