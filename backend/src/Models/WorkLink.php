<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 작업물 외부 링크 모델
 *
 * @property int $id
 * @property int $work_id
 * @property string $label
 * @property string $url
 * @property int $sort_order
 */
class WorkLink extends Model
{
    protected $table = 'work_links';

    protected $fillable = [
        'work_id',
        'label',
        'url',
        'sort_order',
    ];

    /**
     * 이 링크가 속한 작업물
     */
    public function work(): BelongsTo
    {
        return $this->belongsTo(Work::class, 'work_id');
    }

    /**
     * 기본 정렬 스코프 (sort_order → id)
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')
                     ->orderBy('id');
    }
}
