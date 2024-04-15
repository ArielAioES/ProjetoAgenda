<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\EventController;


//CRUD do usuário
Route::apiResource('/user', UserController::class);

//Login/Logout do usuário
Route::post('/login', [LoginController::class,'store']);
Route::get('/logout', [LoginController::class,'destroy']);

Route::post('/event', [EventController::class,'store']);

