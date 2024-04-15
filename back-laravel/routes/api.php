<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


//CRUD do usuário
Route::apiResource('/user', UserController::class);
