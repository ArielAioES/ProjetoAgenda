<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Response;

use Illuminate\Http\Request;

class UserController extends Controller
{
        //Listar todos os usuários
        public function index()
    {
        $users = User::all();

        //Retornar os usuários cadastrados
        return response()->json($users, 200);
    }

        //Listar um usuário específico
        public function show($id){

            $user = User::find($id);

            //Validação caso não encontre o usuário específico
            if(!$user){
                return response()->json(["error" => "Usuário não encontrado"], 404);
            }

            //Retorna o usuário selecionado
            return response()->json($user, 200);
        } 

        //Cadastrar um novo usuário
        public function store(Request $request)
    {
        $validatedData = $request->validate([
            "username" => "required|string|max:255",
            "email" => "required|email",
            "password" => "required|string|min:6",
        ],[
            'email.required' =>'O campo de email é obrigatório',
            'email.email' =>'O email deve ser válido',
            'password.required' =>'O campo de senha é obrigatório',
            'password.min' =>'O campo de senha deve ter no mínimo :min caracteres',
        ]);

        // Verifica se o e-mail já está cadastrado
        $existingUser = User::where('email', $validatedData['email'])->first();
        if ($existingUser) {
            //Retorna mensagem de error, caso dê errado
            return response()->json(["error" => "Usuário existente"], 400);
        }

        // Cria o usuário se o e-mail não estiver cadastrado
        $user = User::create([
            "username" => $validatedData["username"],
            "email" => $validatedData["email"],
            "password" => bcrypt($validatedData["password"]),
        ]);

        //Retorna mensagem de sucesso, caso seja cadastrado
        return response()->json(["message" => "Usuário cadastrado com sucesso"], 201);
    }

        //Atualizar usuário cadastrado
        public function update(Request $request, $id){

            $validatedData = $request->validate([
                "username" => "required|string|max:255",
                "email" => "required|email",
                "password" => "required|string|min:6",
            ],[
                'email.required' =>'O campo de email é obrigatório',
                'email.email' =>'O email deve ser válido',
                'password.required' =>'O campo de senha é obrigatório',
                'password.min' =>'O campo de senha deve ter no mínimo :min caracteres',
            ]);

            // Verifica se o e-mail já está cadastrado
            $existingUser = User::where('email', $validatedData['email'])->first();
            if ($existingUser) {
            //Retorna mensagem de error, caso dê errado
            return response()->json(["error" => "Email existente"], 400);
        }

            $user = User::findOrFail($id);

            $user->update([
                "username"=> $validatedData["username"],
                "email"=> $validatedData["email"],
                "password"=> bcrypt($validatedData["password"]),
            ]);

            //Retorna mensagem de sucesso, caso seja cadastrado
            return response()->json(["message"=> "Usuário atualizado com sucesso"],200);
        }

        //Deletar um usuário específico
        public function destroy($id){
            $user = User::find($id);

            if (!$user) {
                //Retorna mensagem de error
                return response()-> json(["error"=> "Usuário não encontrado"],404);
            }

            $user->delete();
            //Retorna mesagem de sucesso
            return response()->json(["message"=> "Usuário deletado com sucesso"],200);
        }
}