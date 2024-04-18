<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Response;

use Illuminate\Http\Request;

class UserController extends Controller
{
        // List all users
        public function index()
    {
        $users = User::all();

        // Return the list of registered users
        return response()->json($users, 200);
    }

        // Show a specific user
        public function show($id){

            $user = User::find($id);

            // Validation in case the specific user is not found
            if(!$user){
                return response()->json(["error" => "User not found"], 404);
            }

            // Return the selected user
            return response()->json($user, 200);
        } 

        // Register a new user
        public function store(Request $request)
    {
        $validatedData = $request->validate([
            "username" => "required|string|max:255",
            "email" => "required|email",
            "password" => "required|string|min:6",
        ],[
            'email.required' =>'The email field is required',
            'email.email' =>'The email must be valid',
            'password.required' =>'The password field is required',
            'password.min' =>'The password field must be at least :min characters',
        ]);

        // Check if the email is already registered
        $existingUser = User::where('email', $validatedData['email'])->first();
        if ($existingUser) {
            // Return error message if failed
            return response()->json(["error" => "User already exists"], 400);
        }

        // Create the user if the email is not registered
        $user = User::create([
            "username" => $validatedData["username"],
            "email" => $validatedData["email"],
            "password" => bcrypt($validatedData["password"]),
        ]);

        // Return success message if created
        return response()->json(["message" => "User registered successfully"], 201);
    }

        // Update registered user
        public function update(Request $request, $id){

            $validatedData = $request->validate([
                "username" => "required|string|max:255",
                "email" => "required|email",
                "password" => "required|string|min:6",
            ],[
                'email.required' =>'The email field is required',
                'email.email' =>'The email must be valid',
                'password.required' =>'The password field is required',
                'password.min' =>'The password field must be at least :min characters',
            ]);

            // Check if the email is already registered
            $existingUser = User::where('email', $validatedData['email'])->first();
            if ($existingUser) {
            return response()->json(["error" => "Email already exists"], 400);
        }

            $user = User::findOrFail($id);

            $user->update([
                "username"=> $validatedData["username"],
                "email"=> $validatedData["email"],
                "password"=> bcrypt($validatedData["password"]),
            ]);

            return response()->json(["message"=> "User updated successfully"],200);
        }

        // Delete a specific user
        public function destroy($id){
            $user = User::find($id);

            if (!$user) {
                return response()-> json(["error"=> "User not found"],404);
            }

            $user->delete();
            return response()->json(["message"=> "User deleted successfully"],200);
        }

        // Relation method to get user events
        public function events()
        {
            return $this->belongsToMany(EventController::class);
        }

        // Relation method to get user relationships
        public function users()
        {
            return $this->belongsToMany(User::class);
        }

}