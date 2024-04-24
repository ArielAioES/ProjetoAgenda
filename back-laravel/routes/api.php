<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Str;

Route::middleware(['guest:api'])->group(function () { //guest: Route accessible to guests (unauthenticated users)
    Route::get('/', function() {
        return 'Olá, crie ou entre em sua conta para ter acesso ao sistema!';
    });

    Route::post('login', [AuthController::class, 'login']); // Use array to call controller method
    Route::get('/events/accept/{event}', 'EventController@acceptInvitation')->name('events.accept');
});

Route::apiResource('/user', UserController::class);

    Route::middleware(['auth:api'])->group(function () { //auth: Routes accessible only to authenticated users

        Route::post('/event/create', [EventController::class,'store']);
        Route::get('/events/list', [EventController::class, 'index'])->name('events.index');
        Route::get('/event/{id}', [EventController::class,'show']);
        Route::post('logout', [AuthController::class, 'logout']); 
        Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
        Route::post('/events/{event}/invite', [EventController::class, 'inviteUser'])->name('events.invite.user');

});





