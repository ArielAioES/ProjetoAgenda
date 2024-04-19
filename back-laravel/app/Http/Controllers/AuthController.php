<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required|string|min:6",
        ]);

        if(!Auth::attempt($credentials)){

            $error = "Not authorized";
            $response = [
                'error' => $error
            ];
            return response()->json($response, 404);
        }

        $user = $request->user();
        $response['id']= $user->id;
        $response['username']= $user->username;
        $response['email']= $user->email;
        $response['token']= $user->createToken('token')->accessToken;
        return response()->json($response, 200);
    }

    public function logout(Request $request)
    {
        // Revoke the access token associated with the authenticated user
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
    protected function authenticated(Request $request, $user)
    {
        // Check if there's an event ID in the session
        if ($event_id = session('event_id')) {
            session()->forget('event_id');

            // Redirect the user to the event page associated with the event ID
            return redirect()->route('event.show', $event_id);
        }

        // If no event ID is found in the session, redirect to the homepage
        return redirect('/');
    }
}
    