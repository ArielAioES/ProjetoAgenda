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
    Route::apiResource('/user', UserController::class);
    Route::post('/event', [EventController::class,'store']);
    Route::post('logout', [LoginController::class, 'logout']); 
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
    Route::get('/events/{event}/invite', [EventController::class, 'showInviteForm'])->name('events.invite');
    Route::post('/events/invite', [EventController::class, 'inviteUser'])->name('events.invite.user');
});





