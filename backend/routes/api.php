<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});



// rotas para o controller de categorias

Route::get('/category',[CategoryController::class, 'index']);
Route::post('/category',[CategoryController::class, 'store']);
Route::get('/category/{id}',[CategoryController::class, 'show']);
Route::put('/category/{id}',[CategoryController::class, 'update']);
Route::delete('/category/{id}',[CategoryController::class, 'destroy']);


Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
