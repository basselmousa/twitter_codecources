<?php

namespace App\Http\Controllers\Api\Timeline;

use App\Http\Controllers\Controller;
use App\Http\Resources\TweetCollection;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function index(Request  $request)
    {
        $tweets = $request->user()->tweetsFromFollowing()->paginate(8);
        return new TweetCollection($tweets);
    }
}
