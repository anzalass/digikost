<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Izin;
use App\Http\Requests\IzinRequest;
use Illuminate\Support\Facades\Validator;

class IzinController extends Controller
{
        public function index(){
       try{
         $getAllIzin = Izin::all();

        if($getAllIzin){
            return response()->json([
                'results' => $getAllIzin
            ],200);
        }else{
            return response()->json([
                'Message' => "Tidak Terdapat Izin"
            ],404);
        }
       }catch(\Exception $e){
            return response()->json([
                'message' => $e
            ],500);
       }    
    }

    public function getIzinById($id){
        $resultsIzin = Izin::find($id);
        if($resultsIzin){
            return response()->json([
                'results'=> $resultsIzin
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    
    public function AllPermissionGuruPengajar($id){
        $results = Izin::where('guruPengajar', $id)->get();
        if($results){
            return response()->json([
                'results'=> $results
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function AllPermissionGuruPiket($id){
        $results = Izin::where('guruPiket', $id)->get();
        if($results){
            return response()->json([
                'results'=> $results
            ],200);
        }else{
            return response()->json([
                'message' => "Izin tidak ditemukan"
            ],404);
        } 
    }

    public function EditIzin(IzinRequest $request, $id){
        $SearchEditById = Izin::find($id);
        if($SearchEditById){
            try{
            if($request->typeIzin == 'Masuk'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'guruPiket'=>'required',
                    'keterangan'=> 'required',
                    'jamMasuk' => 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Keluar'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'guruPiket'=>'required',
                    'jamKeluar'=> 'required',
                    'jamMasuk'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Pulang'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required',
                    'guruPiket'=>'required',
                    'jamKeluar'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }

            if($validator->fails()){
                return response()->json([
                    'error'=> $validator->errors()
                ],422);
            }

            if($request->foto != null){
            $SearchEditById->foto = $request->foto;
            }

            if($request->typeIzin == "Masuk"){
                $SearchEditById->foto = $request->foto;
                $SearchEditById->jamKeluar = null;
                $SearchEditById->jamMasuk = $request->jamMasuk;
            }else if($request->typeIzin == "Keluar"){
                $SearchEditById->foto = null;
                $SearchEditById->jamKeluar = $request->jamKeluar;
                $SearchEditById->jamMasuk = $request->jamMasuk;
            }else{
                $SearchEditById->foto = null;
                $SearchEditById->jamKeluar = $request->jamKeluar;
                $SearchEditById->jamMasuk = null;
            }

            $SearchEditById->idMapel = $request->idMapel;
            $SearchEditById->guruPengajar = $request->guruPengajar;
            $SearchEditById->guruPiket = $request->guruPiket;
            $SearchEditById->keterangan = $request->keterangan;
            $SearchEditById->typeIzin = $request->typeIzin;

            $SearchEditById->save();
            return response()->json([
                'message'=> "Data berhasil diupdate"
            ],200);

            }catch(\Exception $e){
                return response()->json([
                    'message'=>$e
                ],505);
            }

        }
        return response()->json([
            'message' => "Izin Tidak Ditemukan"
        ],404);
    }

    public function tambahIzin(IzinRequest $request){
        try{
            if($request->typeIzin == 'Masuk'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'guruPiket'=>'required|string',
                    'keterangan'=> 'required',
                    'jamMasuk' => 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Keluar'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'guruPiket'=>'required|string',
                    'jamKeluar'=> 'required',
                    'jamMasuk'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }else if($request->typeIzin == 'Pulang'){
                $validator = Validator::make($request->all(),[
                    'idUser' => 'required',
                    'idMapel' => 'required',
                    'kelas' => 'required|string',
                    'guruPengajar' => 'required|string',
                    'guruPiket'=>'required|string',
                    'jamKeluar'=> 'required',
                    'keterangan'=> 'required',
                    'typeIzin'=> 'required',
                ]);
            }

            if($validator->fails()){
                return response()->json([
                    'error'=> $validator->errors()
                ],422);
            }

            if($request->foto != null){
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'idMapel'=> $request->idMapel,
                    'kelas'=> $request->kelas,
                    'foto' => $request->foto,
                    'guruPengajar'=> $request->guruPengajar,
                    'guruPiket'=> $request->guruPiket,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responGuruPengajar' => "pending",
                    'responGuruPiket' => "pending",
                    'statusPengajuan'=> "pending"
                ]);
            }else{
                $add = Izin::create([
                    'idUser' => $request->idUser,
                    'idMapel'=> $request->idMapel,
                    'kelas'=> $request->kelas,
                    'guruPengajar'=> $request->guruPengajar,
                    'guruPiket'=> $request->guruPiket,
                    'jamKeluar'=> $request->jamKeluar,
                    'jamMasuk'=> $request->jamMasuk,
                    'keterangan'=> $request->keterangan,
                    'typeIzin'=> $request->typeIzin,
                    'responGuruPengajar' => "pending",
                    'responGuruPiket' => "pending",
                    'statusPengajuan'=> "pending"
                ]);
            }

            if($add){
                return response()->json([
                    "message" => "Izin Berhasil Diajukan"
                ],200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => $e
            ],500);
        }
    }

    public function BeriIzin($id,$role){
        $getRecord = Izin::find($id);

        if(!$getRecord){
            return response()->json([
                'message' => "Data Tidak Ditemukan"
            ],404);
        }

        if($role == 2){
            $getRecord->responGuruPengajar = "Diizinkan";
        }else if($role == 3){
            $getRecord->responGuruPiket = "Diizinkan";
        }

        $getRecord->save();
        return response()->json([
            'message'=> "Data berhasil diupdate"
        ],200);
    }

    public function Tolak($id,$role){
        $getRecord = Izin::find($id);

        if(!$getRecord){
            return response()->json([
                'message' => "Data Tidak Ditemukan"
            ],404);
        }

        if($role == 2){
            $getRecord->responGuruPengajar = "Ditolak";
        }else if($role == 3){
            $getRecord->responGuruPiket = "Ditolak";
        }

        $getRecord->save();
        return response()->json([
            'message'=> "Data berhasil diupdate"
        ],200);
    }
}