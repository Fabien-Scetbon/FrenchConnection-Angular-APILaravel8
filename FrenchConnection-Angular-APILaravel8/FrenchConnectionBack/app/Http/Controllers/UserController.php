<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{

    public function getUsers()
    {

        $users = User::all();
        foreach ($users as $user) {
            $role = Role::where('id', $user->role_id)->get();
            $user->role = $role[0]->name;
        }
        $message = 'Request Get User index successfull.';

        return $this->sendResponse([
            'users' => $users,

        ], $message, 201);
    }

    public function getUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $role = Role::where('id' , $user->role_id)->get();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('User not found', $e, 400);
        }
        $user->role = $role[0]->name;
        $message = 'User successfully found';
        return $this->sendResponse([
            'user' => $user,
        ], $message, 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        $data = $request->all();
      
        $email_exists = User::where('id', '!=', $id)->where('email', $data['email'])->first();
        if (isset($email_exists)) {
            $message = 'The Email already exists';
            return $this->sendError($message, 400);
        }

        $validator = Validator::make($data, [

            'username' => 'sometimes',
            'email' => 'sometimes|email',
            'address' => 'sometimes',
            'phone' => 'sometimes',
            'password' => 'sometimes',
            'role_id' => 'sometimes',
        ]);

        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        if (isset($data['username'])) {
            $user->username = $data['username'];
        }

        if (isset($data['email'])) {
            $user->email = $data['email'];
        }

        if (isset($data['address'])) {
            $user->address = $data['address'];
        }
        if (isset($data['phone'])) {
            $user->phone = $data['phone'];
        }
        if (isset($data['password']) && $data['password'] != $user->password) {
            $user->password = bcrypt($data['password']);
        }

        if (isset($data['role_id'])) {
            $user->role_id = $data['role_id'];
        }

        $result = $user->save();

        if ($result) {
            $message = 'The User has been succesfully updated';
        } else {
            $message = 'We have encounter an error in the updating of the User';
        }

        return $this->sendResponse($user, $message, 201);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        $result = $user->delete();
        if ($result) {
            $message = 'The User has been succesfully delete';
        } else {
            $message = 'We have encounter an error in the deleting of the User';
        }
        return $this->sendResponse($user, $message, 201);
    }
}


