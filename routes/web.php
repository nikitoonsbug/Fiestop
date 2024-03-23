<?php

use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\RolController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/{path?}','welcome')
    ->where('path','.*');

/* Route::get('/', function () {
    return view('welcome');
}); */
Route::post('/user_store', [UserController::class, 'store']);
Route::post('/user/{id}', [UserController::class,'show']);
Route::get('/user', [UserController::class, 'index']);
Route::get('/token', [UserController::class, 'token']);

Route::post('/book_store', [BookController::class, 'store']);
Route::post('/book_show', [BookController::class, 'show']);


Route::post('/rol_show', [RolController::class,'show']);
Route::get('/rol', [RolController::class, 'index']);

Route::post('/book_categories', [BookCategoryController::class,'show']);

