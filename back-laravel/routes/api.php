<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Str;

Route::middleware(['guest:api'])->group(function () { //guest:nao precisa estar autenticado para acessar
    Route::get('/', function() {
        return 'Olá mundo API';
    });
    Route::post('login', [LoginController::class, 'login']); // Usar array para chamar o método do controlador
});

Route::middleware(['auth:api'])->group(function () { //auth: necessita da autenticacao feita no login para ser acessada
    Route::get('/data', function() {
        return 'Olá mundo API (Autenticado)';
    });
    Route::post('logout', [LoginController::class, 'logout']); 
});

// CRUD do usuário
Route::apiResource('/user', UserController::class);

// Route::post('/login', [LoginController::class,'store']); // Removido
// Route::get('/logout', [LoginController::class,'destroy']); // Removido

Route::post('/event', [EventController::class,'store']);


