<?php

namespace App\Http\Controllers;

use App\Member;
use App\Http\Requests\Member\NewRequest;
use App\Http\Requests\Member\UpdateRequest;
use App\Http\Requests\Member\DelRequest;
use App\Http\Resources\MemberResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Auth;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $members = Member::orderBy('created_at', 'desc')->paginate();
        return MemberResource::collection($members);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request)
    {
        $member = new Member();

        //GEt filename with the extension
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
            'public/member/thumbnails', 
            $filenameToStore
        );

        $member->full_name = $request->input('full_name');
        $member->country = $request->input('country');
        $member->designation = $request->input('designation');
        $member->bio = $request->input('bio');
        $member->thumbnail = 'member/thumbnails/'.$filenameToStore;
    
        if($member->save()) {
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
     * @param  \App\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $member = Member::findOrFail($id);

        return new MemberResource($member);
    } 

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $member = Member::findOrFail($request->input('id'));

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
                'public/member/thumbnails', 
                $filenameToStore
            );

            //delete the previous file
            if($member->thumbnail != null) {
                Storage::delete('public/'.$member->thumbnail);
            }

            $investigation->thumbnail = 'member/thumbnails/'.$filenameToStore;
        }
        
        $member->full_name = $request->input('full_name');
        $member->country = $request->input('country');
        $member->designation = $request->input('designation');
        $member->bio = $request->input('bio');

        if($member->save()) {
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
     * @param  \App\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request)
    {
        $member = Member::findOrFail($request->input('id'));
        
        //delete thumbnail
        if($member->thumbnail != null) {
            Storage::delete('public/'.$member->thumbnail);
        }
        
        if($member->delete()) {
            $success = 1;
        } else {
            $success = 0;
        }

        return response()->json([
            'success' => $success
        ]);
    }
}
