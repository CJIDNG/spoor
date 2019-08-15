<?php

namespace App\Http\Controllers;

use App\Incident;
use App\State;
use App\LocalGovernment;
use Illuminate\Http\Request;

use App\Http\Resources\IncidentResource;
use App\Http\Requests\Incident\NewRequest;
use App\Http\Requests\Incident\UpdateRequest;
use App\Http\Requests\Incident\DeleteRequest;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($limit) {
        $incidents = Incident::paginate($limit);
        return IncidentResource::collection($incidents);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stateIncidents($stateId, $limit) {
        $state = State::findOrFail($stateId);
        $incidents = $state->incidents()->paginate($limit);
        return IncidentResource::collection($incidents);
    }

    public function localGovernmentIncidents($localGovernmentId, $limit) {
        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);
        $incidents = $localGovernment->incidents()->paginate($limit);
        return IncidentResource::collection($incidents);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request) {
        $incident = new Incident();

        $incident->title = $request->input('title');
        $incident->description = $request->input('description');
        $incident->death_count = $request->input('death_count');
        $incident->injured_count = $request->input('injured_count');
        $incident->incident_type_id = $request->input('incident_type_id');
        $incident->location_id = $request->input('location_id');
        $incident->location_type = $request->input('location_type');
        $incident->incident_date = $request->input('incident_date');

        if($incident->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $incident = Incident::findOrFail($id);
        return new IncidentResource($incident);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request) {
        $incident = Incident::findOrFail($request->input('id'));

        $incident->title = $request->input('title');
        $incident->description = $request->input('description');
        $incident->death_count = $request->input('death_count');
        $incident->injured_count = $request->input('injured_count');
        $incident->incident_type_id = $request->input('incident_type_id');
        $incident->location_id = $request->input('location_id');
        $incident->location_type = $request->input('location_type');
        $incident->incident_date = $request->input('incident_date');

        if($incident->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident updated successfully'
            ]);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteRequest $request) {
        $incident = Incident::findOrFail($request->input('id'));

        if($incident->delete()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident deleted successfully'
            ]);
        }
    }
}
