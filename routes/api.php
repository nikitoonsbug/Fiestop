<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\VideogameController;
use App\Http\Controllers\VideogamePurchaseController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register',[RegisterController::class,'register']);
Route::post('auth/login',[RegisterController::class,'login']);

Route::middleware('auth:api')->group(function () {

    //Rutes Videogame
    Route::post('/game_store', [VideogameController::class, 'store']);
    Route::post('/game_show/{id}', [VideogameController::class,'show']);
    Route::put('/game_update/{id}', [VideogameController::class,'update']);
    Route::post('/game_delete', [VideogameController::class,'destroy']);
    Route::post('/game_decrement_stock/{id}', [VideogameController::class, 'decrementStock']);
    Route::post('/game_increment_stock/{id}', [VideogameController::class, 'incrementStock']);
    Route::get('/game_index', [VideogameController::class,'index']);

    //Rutes User
    Route::get('/user_index', [UserController::class, 'index']);
    Route::get('/user_show/{id}', [UserController::class, 'show']);
    Route::post('/user_update/{id}', [UserController::class,'update']);
    Route::post('/user_delete', [UserController::class,'destroy']);

    //Rutes Lend
    Route::post('/purchase_store', [PurchaseController::class,'store']);
    Route::get('/purchase_index', [PurchaseController::class,'index']);
    Route::post('/purchase_update', [PurchaseController::class,'update']);
    Route::post('/purchase_show/{id}', [PurchaseController::class,'show']);
    Route::post('/purchase_delete', [PurchaseController::class,'destroy']);

    //Rutes Category
    Route::get('/category_index', [CategoryController::class,'index']);
    Route::post('/category_store', [CategoryController::class,'store']);
    Route::post('/category_update', [CategoryController::class,'update']);
    Route::post('/category_delete', [CategoryController::class,'destroy']);

     //Rutes Platform
     Route::get('/platform_index', [PlatformController::class,'index']);
     Route::post('/platform_store', [PlatformController::class,'store']);
     Route::post('/platform_update', [PlatformController::class,'update']);
     Route::post('/platform_delete', [PlatformController::class,'destroy']);

    //Rutes Book Lending
    Route::post('/videogame_purchase_store', [VideogamePurchaseController::class,'store']);
    Route::get('/videogame_purchase_index', [VideogamePurchaseController::class,'index']);
    Route::get('/videogame_purchase/{id}', [VideogamePurchaseController::class, 'videogamesPurchase']);
    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
