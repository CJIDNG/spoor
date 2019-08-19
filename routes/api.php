<?php

use Illuminate\Http\Request;
use App\Mail\ContactMail;
use App\Mail\ApplyForMembershipMail;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function() {
    /**
     * User Routes
     */
    Route::get('/user', 'UserController@authenticatedUser');
    Route::get('/users', 'UserController@index');
    Route::get('/user/{id}', 'UserController@show');
    Route::post('/user', 'UserController@store');
    Route::put('/user', 'UserController@update');
    Route::put('/user/{id}/changePassword', 'UserController@changeUserPassword');
    Route::delete('/user', 'UserController@destroy');
    /**
     * End User Routes
     */

     /**
     * Incident Routes
     */
    Route::group(['prefix' => 'newsletter'], function() {
        Route::get(
            '/',
            'NewsletterController@index'
        );
        Route::post(
            '/',
            'NewsletterController@store'
        );
        Route::delete(
            '/',
            'NewsletterController@destroy'
        );
    });
    /**
     * End Incident Routes
     */

    /**
     * Incident Routes
     */
    Route::group(['prefix' => 'incident'], function() {
        Route::post(
            '/',
            'IncidentController@store'
        );
        Route::put(
            '/',
            'IncidentController@update'
        );
        Route::delete(
            '/',
            'IncidentController@destroy'
        );
    });
    /**
     * End Incident Routes
     */

    /**
     * Incident Type Routes
     */
    Route::group(['prefix' => 'incidentType'], function() {
        Route::post(
            '/',
            'IncidentTypeController@store'
        );
        Route::put(
            '/',
            'IncidentTypeController@update'
        );
        Route::delete(
            '/',
            'IncidentTypeController@destroy'
        );
    });
    /**
     * End Incident Type Routes
     */

    /**
     * Resource Routes
     */
    Route::group(['prefix' => 'resource'], function() {
        Route::post(
            '/',
            'ResourceController@store'
        );
        Route::delete(
            '/',
            'ResourceController@destroy'
        );
    });
    /**
     * End Resource Routes
     */

    /**
     * Config Routes
     */
    Route::group(['prefix' => 'config'], function() {
        Route::get('/', 'ConfigController@index');
        Route::post('/', 'ConfigController@update');
    });
    /**
     * End Config Routes
     */

    Route::put(
      '/state',
      'StateController@update'
    );

    /**
     * Member
     */
    Route::group(['prefix' => 'member'], function() {
        Route::post('/', 'MemberController@store');
        Route::post('/{id}', 'MemberController@update');
        Route::delete('/', 'MemberController@destroy');
    });
});

Route::group(['prefix'=> 'v1'], function() {
    /**
     * User and Roles routes
     */
    Route::get(
        '/roles',
        'RoleController@index'
    );
    /**
     * end User x Roles routes
     */

    /**
     * IncidentTypes routes
     */
    Route::get(
        'incidentTypes',
        'IncidentTypeController@index'
    );
    Route::get(
        'incidentType/{id}',
        'IncidentTypeController@show'
    );
    /**
     * End IncidentTypes routes
     */

    /**
     * Incident Routes
     */
    Route::get(
        '/incidents/limit/{limit}', 
        'IncidentController@index'
    );
    Route::get(
        '/incidents/state/{stateId}/limit/{limit}', 
        'IncidentController@stateIncidents'
    );
    Route::get(
        '/incidents/localGovernment/{localGovernmentId}/limit/{limit}', 
        'IncidentController@localGovernmentIncidents'
    );
    Route::get(
        '/incident/{id}', 
        'IncidentController@show'
    );

    /**
     * Member Routes
     */
    Route::group(['prefix' => 'member'], function() {
        Route::get('/', 'MemberController@index');
        Route::get('/view/{id}', 'MemberController@show');
    });
    /**
     * End Member Routes
     */

    /**
     * Resource Routes
     */
    Route::get(
        '/resources', 
        'ResourceController@index'
    );

    /**
     * Mail Routes
     */
    Route::group(['prefix' => 'mail'], function() {
        Route::post('/contact', function(Request $request) {
            Mail::send(new ContactMail($request));
            return response()->json([
                'success' => 1
            ]);
            
            //return (new ContactMail($request))->render();
        });
        Route::post('/apply-for-membership', function(Request $request) {
            Mail::send(new ApplyForMembershipMail($request));
            return response()->json([
                'success' => 1
            ]);
            //return (new ApplyForMembershipMail($request))->render();
        });
    });
    /**
     * End Mail Routes
     */

    
    /**
   * Locations Routes
   */
    Route::get(
        '/states',
        'StateController@index'
    );
    Route::get(
        '/state/{id}',
        'StateController@show'
    );
    Route::get(
        '/state/{stateId}/localGovernments',
        'LocalGovernmentController@index'
    );
    Route::get(
        '/localGovernment/{id}',
        'LocalGovernmentController@show'
    );
    /**
     * End Location Routes
     */
});
