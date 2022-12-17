<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix'=> 'files'], function () {
    Route::get('all',[FileController::class,'all']);
    Route::get('get',[FileController::class,'get']);
    Route::get('getFiles',[FileController::class,'getFiles']);
    Route::post('store',[FileController::class,'store']);
    Route::delete('delete',[FileController::class,'delete']);
});