<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function register(Request $request)
    {
        //Validate data
        $data = $request->only('username', 'email', 'address', 'phone', 'role_id', 'password', 'password_confirmation');
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'email' => 'required|email|unique:users',
            'address' => 'required|string',
            'phone' => 'required|string|min:8|max:12',
            'role_id' => 'sometimes',
            'password' => 'required|string|confirmed|min:6|max:50',


        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        if (!$request->role_id) {
            $request->role_id = 1;
        }
        //Request is valid, create new user
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'role_id' => $request->role_id,
            'password' => bcrypt($request->password)
        ]);

        //User created, return success response
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        //Request is validated
        //Crean token
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login credentials are invalid.',
                ], 400);
            }
        } catch (JWTException $e) {
            return $credentials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token.',
            ], 500);
        }
        $role = Role::where('id', JWTAuth::user()->role_id)->get();
        JWTAuth::user()->role = $role[0]->name;

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
            'user_id' => JWTAuth::user()->id,
            'username' => JWTAuth::user()->username,
            'email' => JWTAuth::user()->email,
            'address' => JWTAuth::user()->address,
            'phone' => JWTAuth::user()->phone,
            'role_id' => JWTAuth::user()->role_id,
            'role' => JWTAuth::user()->role,
            'created_at' => JWTAuth::user()->created_at,

        ]);
    }

    public function logout(Request $request)
    {
        //valid credential
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        //Request is validated, do logout        
        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get_user(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);

        return response()->json(['user' => $user]);
    }
}
