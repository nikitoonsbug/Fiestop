<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RegisterController extends ResponseController
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'phone_number' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $this->sendError(
                'Validation Error.',
                $validator->errors()
            );
        }

        $existingemail = User::where('email', $request->email)->first();

        if ($existingemail) {
            return response()->json(['error' => 'Email already exists'], 409);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token = $user->createToken('Token')->accessToken;
        $id = $user->id;
        $id_rol = $user->id_rol;
        return response()->json(['token' => $token, 'id' => $id, 'id_rol' => $id_rol, 'message' => 'Login successful'], 200);
    }

    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('Token')->accessToken;
            $id = $user->id;
            $id_rol = $user->id_rol;
            return response()->json(['token' => $token, 'id' => $id, 'id_rol' => $id_rol, 'message' => 'Login successful'], 200);
        } else {
            return $this->sendError(
                'Unauthorized.',
                ['error' => 'Unauthorized']
            );
        }
    }

    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            $user->token()->revoke();
            return $this->sendResponse([], 'Logout successful');
        }

        return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
    }
}
