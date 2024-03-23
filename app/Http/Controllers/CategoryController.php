<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = DB::table('categories')->get();
        return $categories;
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
        $category = Category::create([
            'category_name' => $request->category_name,
            'description' => $request->description,
        ]);
        $category->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $category = Category::where('id', $request->id)->get();
        return $category;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $book_category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $videogame_category)
    {
        $category = Category::where('id', $request->id)->first();

        $category->update([
            'category_name' => $request->category_name,
            'description' => $request->description,
        ]);

        $category->save();
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Category $videogame_category)
    {
        $videogamesCount = Videogame::where('id_category', $request->id)->count();

        if ($videogamesCount > 0) {

            return response()->json(['error' => 'Cannot delete category with associated a videogame.'], 400);
        }

        $category = Category::find($request->id);

        if (!$category) {
            return response()->json(['error' => 'Category not found.'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
