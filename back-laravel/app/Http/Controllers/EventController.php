<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function store(Request $request)
{
    // Validação dos dados recebidos na requisição
    $validatedData = $request->validate([
        "date" => "required|date",
        "time" => "required|date_format:H:i",
        "duration" => "required|integer",
        "description" => "required|string",
    ]);

    try {
        // Tenta criar o evento com os dados validados
        $event = Event::create($validatedData);

        // Associa o evento ao usuário autenticado
        $user = auth()->user();
        $user->events()->save($event);

        // Retorna uma resposta de sucesso
        return response()->json(['success' => 'Evento criado'], 200);
    } catch (\Exception $e) {
        // Se ocorrer um erro, retorna uma resposta de erro com uma mensagem
        return response()->json(['error' => 'Erro ao criar o evento: ' . $e->getMessage()], 500);
    }
}

}
