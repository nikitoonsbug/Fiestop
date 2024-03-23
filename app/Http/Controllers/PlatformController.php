<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use App\Models\Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $platforms = DB::table('platforms')->get();
        return $platforms;
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
        $platform = Platform::create([
            'platform_name' => $request->platform_name,
            'description' => $request->description,
        ]);
        $platform->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $platform = Platform::where('id', $request->id)->get();
        return $platform;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Platform $videogame_platform)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Platform $videogame_platform)
    {
        $platform = Platform::where('id', $request->id)->first();

        $platform->update([
            'platform_name' => $request->platform_name,
            'description' => $request->description,
        ]);

        $platform->save();
        return $platform;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Platform $videogame_platform)
    {
        $videogamesCount = Videogame::where('id_platform', $request->id)->count();

        if ($videogamesCount > 0) {

            return response()->json(['error' => 'Cannot delete the platform with associated a videogame.'], 400);
        }

        $platform = Platform::find($request->id);

        if (!$platform) {
            return response()->json(['error' => 'Platform not found.'], 404);
        }

        $platform->delete();

        return response()->json(['message' => 'Platform deleted successfully.']);
    }
}
