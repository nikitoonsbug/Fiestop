<?php

namespace App\Http\Controllers;

use App\Models\Purchased;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lends = DB::table('purchased')->get();
        return $lends;
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
        $purchase = Purchased::create([
            'id_user' => $request->id_user,
            'purchase_date' => $request->purchase_date,
            'purchase_method' => $request->purchase_method,
            'purchase_currency' => $request->purchase_currency,
            'purchase_status' => $request->purchase_status,
        ]);
        $purchase->save();

        return $purchase;
    }

    /**
     * Display the specified resource.
     */
    public function show(request $request, Purchased $purchase)
    {
        $userId = $request->id;
    
        if ($userId != $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $purchase = Purchased::where('id_user', $userId)->get();

        return response()->json($purchase);
    }

    /**
     * Show the form for editing the specified resource.
     */
  

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Purchased $purchase)
    {
        $purchase = Purchased::where('id', $request->id)->first();

        $purchase->update([
            'id_user' => $request->id_user,
            'purchase_date' => $request->purchase_date, 
            'purchase_method' => $request->purchase_method,
            'purchase_currency' => $request->purchase_currency,
            'purchase_status' => $request->purchase_status,
        ]);

        $purchase->save();
        return $purchase;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Busca el préstamo por su id
        $purchase = Purchased::find($request->id);

        // Verifica si el préstamo existe
        if (!$purchase) {
            return response()->json(['error' => 'Purchase not found'], 404);
        }

        try {
            // Elimina el préstamo
            $purchase->delete();

            // Realiza operaciones adicionales, como decrementar las copias disponibles del libro asociado
            // ...

            return response()->json(['message' => 'Purchase deleted successfully']);
        } catch (\Exception $e) {
            // Maneja cualquier error que pueda ocurrir durante la eliminación
            return response()->json(['error' => 'An error occurred while deleting the purchase'], 500);
        }
    }
}
