<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class TweetMedia extends Model implements HasMedia
{
    use HasFactory, HasMediaTrait;

    public function baseMedia()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }
}
