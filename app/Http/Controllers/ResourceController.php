<?php

namespace App\Http\Controllers;

use App\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use App\Http\Resources\ResourceResource;
use App\Http\Requests\Resource\NewRequest;
use App\Http\Requests\Resource\DeleteRequest;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resources = Resource::paginate();
        return ResourceResource::collection($resources);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request)
    {
        $resource = new Resource();

        $resource->title = $request->input('title');
        
        if($request->hasFile('file')) {
            //Get filename with the extension
            $filenameWithExt = $request->file('file')->getClientOriginalName();
            //get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            //get just ext
            $extension = $request->file('file')->getClientOriginalExtension();
            //filename to store
            $uuid = Str::uuid();
            $filenameToStore = $uuid.'.'.$extension;
            // upload image
            $path = $request->file('file')->storeAs('public/resources', $filenameToStore);
        } else {
            return response()->json([
                'success' => 0,
                'message' => 'no file was detected'
            ]);
        }

        $resource->url = "resources/".$filenameToStore;
        $resource->extension = $extension;

        if($resource->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'resource added successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteRequest $request)
    {
        $resource = Resource::findOrFail($request->input('id'));

        Storage::delete('public/'.$resource->url);

        if($resource->delete()) {
            return response()->json([
                'success'=>1,
                'message'=>'resource deleted successfully'
            ]);
        }
    }
}
