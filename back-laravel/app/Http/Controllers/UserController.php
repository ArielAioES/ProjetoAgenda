<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request){
        $validatedData = $request->validate([
            "username"=> "required|strig|max:255",
            "email"=> "required|email|unique:users,email",
            "password"=> "required|string|min:6",
        ]);

        $user = User::create([
            "username"=> $validatedData["username"],
            "email"=> $validatedData["email"],
            "password"=> bcrypt($validatedData["password"]),
        ]);

         return redirect()->route("")->with("success","Usuário cadastrado com sucesso!");

    }
}
