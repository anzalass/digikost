<?php

namespace App\Http\Controllers;

use App\Models\Mata_Pelajaran;
use App\Models\MataPelajaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MataPelajaranController extends Controller
{
    public function index(){
        $getMapel = MataPelajaran::all();

        return response()->json([
            'results'=> $getMapel
        ],200);
    }

    public function AddMataPelajaran(MataPelajaran $request){
        try{
                $validator = Validator::make($request->all(), [
                    'KodePelajaran'=> 'required',
                    'namaPelajaran'=> 'required|string'
                ]);

                if($validator->fails()){
                    return response()->json([
                        "error"=> $validator->errors()
                    ],422);
                }

                MataPelajaran::create([
                    'KodePelajaran' => $request->KodePelajaran,
                    'namaPelajaran'=> $request->namaPelajaran
                ]);

                return response()->json([
                    'message'=> "Data Mapel Berhasil Ditambahkan"
                ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'=>$e
            ],505);
        }
    }

    public function EditMataPelajaran(MataPelajaran $request, $kodePelajaran){
        try{
            $findMapel = MataPelajaran::where('KodePelajaran', $kodePelajaran)->first();

            $validator = Validator::make($request->all(), [
                'KodePelajaran' => 'required',
                'NamaPelajaran' => 'required|string',
            ]);

            if(!$findMapel){
                return response()->json([
                    "message"=>"Mapel Tidak Ditemukan"
                ],404);
            }

            $findMapel->namaPelajaran = $request->namaPelajaran;
            $findMapel->save();

            return response()->json([
                "message"=> "Mapel Berhasil Diupdate"
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'=> $e
            ],505);
        }
    }
}