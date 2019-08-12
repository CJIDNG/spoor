<?php

namespace App\Http\Controllers;

use App\LocalGovernment;
use App\State;
use Illuminate\Http\Request;
use App\Http\Resources\LocalGovernmentResource;
use App\Http\Requests\LocalGovernment\UpdateRequest;

class LocalGovernmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($stateId)
    {
        $state = State::findOrFail($stateId);
        $localGovernments = $state->localGovernments;
        return LocalGovernmentResource::collection($localGovernments);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $localGovernment = LocalGovernment::findOrFail($id);
        return new LocalGovernmentResource($localGovernment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $localGovernment = LocalGovernment::findOrFail($request->input('id'));
        $localGovernment->latitude = $request->input('latitude');
        $localGovernment->longitude = $request->input('longitude');
        if($localGovernment->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'local government updated successfully'
            ]);
        }
    }
}
