<?php
namespace App\Http\Controllers;

use App\Post;
use App\Investigation;
use App\Http\Requests\Post\NewRequest;
use App\Http\Requests\Post\UpdateRequest;
use App\Http\Requests\Post\ApproveRequest;
use App\Http\Requests\Post\DelRequest;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($investigationId = NULL)
    {
        if($investigationId == NULL) {
            $posts = Post::orderBy('created_at', 'desc')->paginate();
        } else {
            $posts = Investigation::findOrFail($investigationId)->posts;
        }
        
        return PostResource::collection($posts);
    }

    public function latestPosts($count) {
        $posts = Post::orderBy('created_at', 'desc')->limit($count)->get();
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request)
    {
        $post = new Post();
        //Get filename with the extension
        $filenameWithExt = $request->file('thumbnail')->getClientOriginalName();
        //get just filename
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        //get just ext
        $extension = $request->file('thumbnail')->getClientOriginalExtension();
        //filename to store
        $uuid = Str::uuid();
        $filenameToStore = $uuid.'.'.$extension;
        // upload image
        $path = $request->file('thumbnail')->storeAs(
            'public/post/thumbnails', 
            $filenameToStore
        );
        
        $post->author = $request->input('author');
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->tags = $request->input('tags');
        $post->thumbnail = 'post/thumbnails/'.$filenameToStore;
        $post->user_id = Auth::user()->id;
        $post->post_status_id = 3;

        if($post->save()) {
            //attach investigations if any
            $post->investigations()->attach(explode(',',$request->input('investigations')));
            
            $success = 1;
        } else {
            $success = 0;
        }

        return response()->json([
            'success' => $success,
            'id' => $post->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $post = Post::findOrFail($request->input('id'));
        if($request->hasFile('thumbnail')) {
            //Get filename with the extension
            $filenameWithExt = $request->file('thumbnail')->getClientOriginalName();
            //get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            //get just ext
            $extension = $request->file('thumbnail')->getClientOriginalExtension();
            //filename to store
            $uuid = Str::uuid();
            $filenameToStore = $uuid.'.'.$extension;
            // upload image
            $path = $request->file('thumbnail')->storeAs(
                'public/post/thumbnails', 
                $filenameToStore
            );
            //delete the previous file
            if($post->thumbnail != null) {
                Storage::delete('public/'.$post->thumbnail);
            }
            $post->thumbnail = 'post/thumbnails/'.$filenameToStore;
        }

        $post->author = $request->input('author');
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->tags = $request->input('tags');

        if($post->save()) {
            //update attached investigations
            $post->investigations()->sync(explode(',',$request->input('investigations')));

            $success = 1;
        } else {
            $success = 0;
        }

        return response()->json([
            'success' => $success
        ]);
    }
    public function approve(ApproveRequest $request) {

        $this->authorize('approve', $post);
        $post = Post::findOrFail($request->input('id'));
        $post->post_post_status_id = 3;

        if($post->save()) {
            $success = 1;
        } else {
            $success = 0;
        }

        return response()->json([
            'success' => $success
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request)
    {
        $post = Post::findOrFail($request->input('id'));
        //delete thumbnail
        if($post->thumbnail != null) {
            Storage::delete('public/'.$post->thumbnail);
        }

        //detach attachments
        $post->investigations()->detach();
        
        if($post->delete()) {
            $success = 1;
        } else {
            $success = 0;
        }
        return response()->json([
            'success' => $success
        ]);
    }
}