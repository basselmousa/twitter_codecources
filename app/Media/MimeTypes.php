<?php


namespace App\Media;


class MimeTypes
{
    public static $image = [
        'image/jpg',
        'image/png',
        'image/jpeg',
    ];

    public static $video = [
        'video/mp4',
    ];

    public static function all()
    {
        return array_merge(self::$image, self::$video);
    }

}
