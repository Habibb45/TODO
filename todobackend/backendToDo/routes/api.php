<?php

use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

Route::get('/getdata', [TasksController::class, "GetData"]);

Route::post('/adddata', [TasksController::class, 'AddData']);
Route::delete('/deletedata/{id}', [TasksController::class, 'deleteData']);

Route::put('/toggletodo/{id}', [TasksController::class, 'ToggleData']);
