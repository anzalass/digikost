<?php

namespace App\Http\Controllers;

use App\Models\Aktivitas;
use Illuminate\Http\Request;

class AktivitasController extends Controller
{
    public function index(){
        $Aktivitas = Aktivitas::all();

        return response()->json([
            'message'=>"Data Aktivitas Berhasil Didapatkan",
            'results' => $Aktivitas
        ],200);
    }

    public function getByUser($idUser){
        $search = Aktivitas::where('idSiswa', $idUser)
        ->orWhere('idGuruPengajar', $idUser)
        ->orWhere('idGuruPiket',$idUser)
        ->orWhere('idKurikulum',$idUser)->get();

        if(!$search){
            return response()->json([
                'message' => 'Data Tidak Ditemukan'
            ],404);
        }
        return response()->json([
            'message'=>"Data Aktivitas Berhasil Didapatkan",
            'results' => $search
        ],200);
    }

    public function AddAktivitas(Aktivitas $request){
        try{
            $Add = Aktivitas::create($request->all());
            if($Add){
                return response()->json([
                    "Data Aktivitas Berhasil Ditambahkan"
                ]);
            }
        }catch(\Exception $e){
            return response()->json([
                'message'=> $e
            ],505);
        }
    }
}