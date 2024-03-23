<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use App\Models\Videogame_purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideogamePurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $videogame_purchases = DB::table('videogame_purchases')->get();
        return $videogame_purchases;
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
        $videogame_purchase = Videogame_purchase::create([
            'id_purchase' => $request->id_purchase,
            'id_videogame' => $request->id_videogame,
        ]);
        $videogame_purchase->save();

        return $request;
    }
    public function purchaseVideoGame($id)
    {
        $purchaseVideogames = Videogame_purchase::where('id_purchase', $id)->get();
        $videoGameIds = $purchaseVideogames->pluck('id_videogame');
        $videogames = Videogame::whereIn('id', $videoGameIds)->get();

        return response()->json($videogames);
    }
}
