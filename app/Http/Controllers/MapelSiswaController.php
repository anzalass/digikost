<?php

namespace App\Http\Controllers;

use App\Models\Mapel_Siswa;
use App\Models\MapelSiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MapelSiswaController extends Controller
{
    public function index(){
        $getSiswaMapel = Mapel_Siswa::all();
        return response()->json([
            'results'=>$getSiswaMapel
        ],200);
    }

    public function TambahMapelSiswa(Mapel_Siswa $request){
        try{
                $Validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required'
                ]);

                if($Validator->fails()){
                    return response()->json([
                        'errors' => $Validator->errors()
                    ],422);
                }

                Mapel_Siswa::create([
                    'idUser'=>$request->idUser,
                    'idMapel'=> $request->idMapel
                ]);

                return response()->json([
                    "message" => "Data Mapel Siswa Berhasil Ditambahkan"
                ],200);
        }catch(\Exception $e){
            return response()->json([
                "message"=>$e
            ],505);
        } 
    }

    public function EditMapelSiswa(Mapel_Siswa $request, $id){
        try{
            $FindMapelSiswa = Mapel_Siswa::find($id);
            if($FindMapelSiswa){
                $validator = Validator::make($request->all,[
                    "idUser"=>'required',
                    "idMapel"=>'required'
                ]);
                if($validator->fails()){
                    return response()->json([
                        "errors"=>$validator->errors()
                    ],422);
                }
                $FindMapelSiswa->idUser = $request->idUser;
                $FindMapelSiswa->idMapel = $request->idMapel;
                $FindMapelSiswa->save();
                return response()->json([
                    "message"=>"Data Mapel Siswa Berhasil Ditambahkan"
                ],200);
            }
            return response()->json([
                "message"=>"Data Mapel Siswa Tidak Ditemukan"
            ],404);
        }catch(\Exception $e){
            return response()->json([
                "message"=>$e
            ],505);
        }
    }
}