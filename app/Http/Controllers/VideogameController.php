<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VideogameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $videogames = DB::table('videogames')->get();
        return $videogames;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if (Videogame::where('name', $request->name)->exists()) {
            return response()->json(['error' => 'The name already exists.'], 422);
        }

        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'release_date' => 'required|date',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
            'physical' => 'required|boolean',
            'digital' => 'required|boolean',
            'id_category' => 'required|exists:categories,id',
            'id_platform' => 'required|exists:platforms,id',
            'developer' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $videogame = Videogame::create($request->all());
        return response()->json(['message' => 'Success created videogame'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query = Videogame::query();

        if ($request->has('id')) {
            $query->where('id', 'like', '%' . $request->input('id') . '%');
        }

        // Other conditions...

        $videogames = $query->get();

        return response()->json(['videogames' => $videogames], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $videogame = Videogame::find($request->id);

        $videogame->name = $request->name;
        $videogame->description = $request->description;
        $videogame->image = $request->image;
        $videogame->release_date = $request->release_date;
        $videogame->stock = $request->stock;
        $videogame->price = $request->price;
        $videogame->physical = $request->physical;
        $videogame->digital = $request->digital;
        $videogame->id_category = $request->id_category;
        $videogame->id_platform = $request->id_platform;
        $videogame->developer = $request->developer;
        $videogame->publisher = $request->publisher;
        $videogame->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $videogame = Videogame::find($request->id);

        if (!$videogame) {
            return response()->json(['error' => 'Videogame not found.'], 404);
        }

        $videogame->delete();

        return response()->json(['message' => 'Videogame deleted successfully.']);
    }

    public function decrementStock($id)
    {
        $videogame = Videogame::find($id);

        if ($videogame) {
            $videogame->decrement('stock');
            return response()->json(['message' => 'Stock field decremented successfully'], 200);
        }

        return response()->json(['error' => 'Videogame not found'], 404);
    }

    public function incrementStock($id)
    {
        $videogame = Videogame::find($id);

        if ($videogame) {
            $videogame->increment('stock');
            return response()->json(['message' => 'Stock field incremented successfully'], 200);
        }

        return response()->json(['error' => 'Videogame not found'], 404);
    }
}
