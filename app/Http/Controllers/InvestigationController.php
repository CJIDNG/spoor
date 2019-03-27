<?php

namespace App\Http\Controllers;

use App\Investigation;
use App\Http\Requests\Investigation\NewRequest;
use App\Http\Requests\Investigation\UpdateRequest;
use App\Http\Requests\Investigation\DelRequest;
use App\Http\Resources\InvestigationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Auth;

class InvestigationController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $investigations = Investigation::orderBy('created_at', 'desc')->paginate();
        return InvestigationResource::collection($investigations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request)
    {
        $investigation = new Investigation();
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
            'public/investigation/thumbnails', 
            $filenameToStore
        );
        $investigation->title = $request->input('title');
        $investigation->tags = $request->input('tags');
        $investigation->thumbnail = 'investigation/thumbnails/'.$filenameToStore;
        $investigation->user_id = Auth::user()->id;

        if($investigation->save()) {
            $success = 1;
        } else {
            $success = 0;
        }

        return response()->json([
            'success' => $success
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $investigation = Investigation::findOrFail($id);

        return new InvestigationResource($investigation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $investigation = Investigation::findOrFail($request->input('id'));

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
                'public/investigation/thumbnails', 
                $filenameToStore
            );

            //delete the previous file
            if($investigation->thumbnail != null) {
                Storage::delete('public/'.$investigation->thumbnail);
            }

            $investigation->thumbnail = 'investigation/thumbnails/'.$filenameToStore;
        }
        
        $investigation->title = $request->input('title');
        $investigation->tags = $request->input('tags');

        if($investigation->save()) {
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
     * @param  \App\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request)
    {
        $investigation = Investigation::findOrFail($request->input('id'));
        //delete thumbnail
        if($investigation->thumbnail != null) {
            Storage::delete('public/'.$investigation->thumbnail);
        }
        
        if($investigation->delete()) {
            $success = 1;
        } else {
            $success = 0;
        }
        return response()->json([
            'success' => $success
        ]);
    }
}
