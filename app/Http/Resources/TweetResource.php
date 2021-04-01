<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TweetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'type'=>$this->type,
            'original_tweet' => new TweetResource($this->originalTweet),
            'user' => new UserResource($this->user),
            'likes_count'=> $this->likes->count(),
            'retweets_count'=> $this->retweets->count(),
            'media' => new MediaCollection($this->media),
            'created_at' => $this->created_at->timestamp
        ];
    }
}
