<?php

namespace App\Http\Controllers\Api\Timeline;

use App\Http\Controllers\Controller;
use App\Http\Resources\TweetCollection;
use App\Models\Tweet;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    public function index(Request $request)
    {
        $tweets =
            $request
                ->user()
                ->tweetsFromFollowing()
                ->latest()
                ->with(['user', 'likes'])
                ->paginate(8);
//        dump($request->user()->likes
//            ->whereIn('tweet_id', Tweet::all()->pluck('id'))
//            ->pluck('tweet_id')
//            ->toArray());
//        dd('ss');
        return new TweetCollection($tweets);
    }
}
