<?php
namespace App\Http\Controllers;

use App\PostStatus;
use App\Http\Resources\PostStatusResource;
use Illuminate\Http\Request;

class PostStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postStatuses = PostStatus::get();

        return PostStatusResource::collection($postStatuses);
    }
}