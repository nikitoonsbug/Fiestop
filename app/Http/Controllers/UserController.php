<?php

namespace App\Http\Controllers;

use App\Models\Purchased;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = DB::table('users')->get();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);
        $user->save();

        return $request;

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::where('id', $request->id)->first();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_number' => $request->phone_number
        ]);

        $user->save();
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        /*$userPurchasesCount = Purchased::where('id_user', $request->id)->count();
        if ($userPurchasesCount > 0) {
            return response()->json(['error' => 'Cannot delete user with associated purchase.'], 400);
        }*/

        $user = User::find($request->id);
    
        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }
        if ($user->id_rol == 1) {
            return response()->json(['error' => 'Cannot delete a user with Administrator Rol.'], 400);
        }
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully.']);
    }
    public function token(){
        return csrf_token();
    }
}
