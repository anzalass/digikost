<?php

use App\Http\Controllers\KategoriesController;
use App\Http\Controllers\PengadaanController;
use App\Http\Controllers\PemeliharaanController;
use App\Http\Controllers\RuangController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[UserController::class, 'user']);
    Route::post('logout',[UserController::class,'logout']);
});

Route::middleware('auth')->group(function () {
    Route::get('GetUser',[UserController::class,'getUser']);
// Route::get('User',[UserController::class,'user']);
});

// Route::prefix('api')->middleware('api')->group(function () {
//     Route::post('tambahPemeliharaan',[PemeliharaanController::class, 'tambahPemeliharaan']);
// });


//Database Pengadaan
Route::get('pengadaan',[PengadaanController::class, 'index']);
Route::get('getBarangRuangan/{kodeRuang}',[PengadaanController::class, 'getBarangRuangan']);
Route::get('findPengadaan/{id}',[PengadaanController::class, 'FindPengadaan']);
Route::get('findByKategori/{kodeBarang}',[PengadaanController::class, 'FindByKategori']);
Route::post('tambahPengadaan',[PengadaanController::class, 'TambahPengadaan']);
Route::put('updatePengadaan/{id}', [PengadaanController::class, 'UpdatePengadaan']);
Route::delete('pengadaanDelete/{id}',[PengadaanController::class, 'DeletePengadaan']);

Route::put('aksiOwnerPengadaan/{kodeBarang}',[PengadaanController::class, 'AksiOwnerPengadaan']);

//Database User
Route::get('getUser',[UserController::class, 'getUser']);
Route::get('getUserById/{id}',[UserController::class,'getUserById']);
Route::put('updateDataUser/{id}',[UserController::class, 'updateDataUser']);
Route::post('Register',[UserController::class,'regis']);
Route::post('login',[UserController::class, 'login']);
Route::post('forgotPassword',[UserController::class, 'register']);
Route::delete('deleteUser/{id}', [UserController::class, 'deleteUser']);

//Database Kategori
Route::get('getKategori',[KategoriesController::class, 'index']);
Route::get('findKategori/{kodeBarang}/{namaBarang}',[KategoriesController::class, 'FindKategori']);
Route::put('updateKategori/{kodeBarang}', [KategoriesController::class, 'UpdateKategori']);
Route::post('tambahKategori',[KategoriesController::class, 'TambahKategori']);
Route::delete('kategoriDelete/{kodeBarang}',[KategoriesController::class, 'DeleteKategori']);

//Database Ruang
Route::get('getRuang',[RuangController::class, 'index']);
Route::get('findRuang/{kodeRuang}',[RuangController::class, 'FindRuang']);
Route::put('updateRuang',[RuangController::class,'UpdateRuang']);
Route::post('tambahRuang',[RuangController::class, 'TambahRuang']);
Route::delete('deleteRuang/{kodeRuang}',[RuangController::class, 'DeleteRuang']);

//Database Pemeliharaan
Route::get('getPemeliharaan',[PemeliharaanController::class, 'getPemeliharaan']);
Route::post('tambahPemeliharaan',[PemeliharaanController::class, 'TambahPemeliharaan']);
Route::put('updatePemeliharaan/{kodePemeliharaan}',[PemeliharaanController::class, 'UpdatePemeliharaan']);
Route::put('editPemeliharaan/{kodePemeliharaan}',[PemeliharaanController::class, 'EditPemeliharaan']);
Route::delete('deletePemeliharaan/{kodePemeliharaan}',[PemeliharaanController::class, 'hapusPemeliharaan']);