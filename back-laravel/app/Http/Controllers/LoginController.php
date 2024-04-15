<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //Logar em alguma conta
    public function store(Request $request)
    {
        // Validação dos dados recebidos do formulário
        $validatedData = $request->validate([
            "email" => "required|email",
            "password" => "required|string|min:6",
        ], [
            'email.required' => 'O campo de email é obrigatório',
            'email.email' => 'O email deve ser válido',
            'password.required' => 'O campo de senha é obrigatório',
            'password.min' => 'O campo de senha deve ter no mínimo :min caracteres',
        ]);


        // Tentativa de autenticação do usuário
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            // Retorna mensagem de erro se a autenticação falhar
            return response()->json(['error' => 'Email ou senha inválido'], 400);
        }

        // Retorna mensagem de sucesso se a autenticação for bem-sucedida
        return response()->json(['success' => 'Logado'], 200);
    }

    //Deslogar da sessão atual
    public function destroy()
    {
        Auth::logout();
        
        // Retorna mensagem de sucesso
        return response()->json(['message' => 'Deslogado'], 200);
    }
}
