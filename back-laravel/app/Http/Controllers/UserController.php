<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Response;

use Illuminate\Http\Request;

class UserController extends Controller
{
        public function store(Request $request)
    {
        $validatedData = $request->validate([
            "username" => "required|string|max:255",
            "email" => "required|email",
            "password" => "required|string|min:6",
        ]);

        // Verifica se o e-mail já está cadastrado
        $existingUser = User::where('email', $validatedData['email'])->first();
        if ($existingUser) {
            return response()->json(["message" => "Usuário existente"], 400);
        }

        // Cria o usuário se o e-mail não estiver cadastrado
        $user = User::create([
            "username" => $validatedData["username"],
            "email" => $validatedData["email"],
            "password" => bcrypt($validatedData["password"]),
        ]);

        return response()->json(["message" => "Usuário cadastrado com sucesso"], 201);
    }

}
