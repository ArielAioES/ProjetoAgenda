<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;


//CRUD do usuário
Route::apiResource('/user', UserController::class);

//Login/Logout do usuário
Route::post('/login', [LoginController::class,'store']);
Route::get('/logout', [LoginController::class,'destroy']);