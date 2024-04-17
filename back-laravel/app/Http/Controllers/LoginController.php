<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials)){

            $error = "Not authorized";
            $response = [
                'error' => $error
            ];
            return response()->json($response, 404);
        }

        $user = $request->user();
        $response['name']= $user->name;
        $response['email']= $user->email;
        $response['token']= $user->createToken('token')->accessToken;
        return response()->json($response, 200);
    }

    public function logout(Request $request)
    {
        $isUser = $request->user()->token()->revoke();
        if($isUser){
            $response['message'] = "Logout successful";
            return response()->json($response, 200);
        }
        else{
            $response = "Something's gone wrong";
            return response()->json($response, 404);
        }
    }
}
    /*
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

        // Obtém o usuário autenticado
        $user = Auth::user();

        // Gera um token de acesso para o usuário
        $accessToken = $user->createToken('AccessToken')->accessToken;

        // Retorna uma resposta JSON com a mensagem de sucesso e o token de acesso
        return response()->json(['success' => 'Logado', 'token' => $accessToken], 200);
    }

    //Deslogar da sessão atual
    public function destroy()
    {
        Auth::logout();
        
        // Retorna mensagem de sucesso
        return response()->json(['message' => 'Deslogado'], 200);
    }
}*/
