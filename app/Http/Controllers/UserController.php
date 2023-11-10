<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Mail\UserVerification;
use App\Models\Pengadaan;
use App\Models\User;
// use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;


// use \Illuminate\Http\Response::HTTP_UNAUTHORIZED

class UserController extends BaseController
{
    public function regis(UserRequest $request){
          $validator = Validator::make($request->all(),[
                'email' => 'required|email',
                'password' => 'required|string|max:50',
                'name' => 'required|string|max:255',
                'role' => 'required|string|max:1',
                "noHP" => 'required|string|max:13'
          
            ]);
             if($validator->fails()){
                return response()->json([
                    'error' => $validator->errors()
                ],422);
            }
        try{
            $user = User::create([
                        'email'=>$request->email,
                        'name'=>$request->name,
                        'password' => Hash::make($request->password ),
                        'role' => $request->role,
                        'noHP' => $request->noHP
                    ]);

            if($user){
                try{
                    Mail::mailer('smtp')->to($user->email)->send(new UserVerification($user));

                    return response()->json([
                        'status'=>200,
                        'message' => "Registered, verify your email address to login"
                    ],200);
                }catch(\Exception $e){
                    $user->delete();
                    
                    return response()->json([
                        'status'=>500,
                        'message' => "could not send email verification, please try again",
                        'error' => $e
                    ],500);
                }
            }
        
        }catch(\Exception $e){
            return response()->json([
                'message'=>$e
            ],500);
        }
    }

    public function getUser(){
        $user = User::all();

        return response()->json([
            'results' => $user,
            'total' =>count($user)
        ],200);
    }

    public function getGuruPengajar(){
        $GuruPengajar = User::where('role', 2)->get();
        if($GuruPengajar){
            return response()->json([
                'results' => $GuruPengajar
            ]);
        }
    }

    public function getGuruPiket(){
        $GuruPiket = User::where('role', 3)->get();
        if($GuruPiket){
            return response()->json([
            'results' => $GuruPiket
        ]);
        }
    }

    public function getUserById($id){
        try{   
            $userFind = User::find($id);
            if($userFind){
                return response()->json([
                    'results'=> $userFind
                ],200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message'=> $e
            ],500);
        }
    }   

    public function user(){
        return Auth::user();
    }

    public function login(LoginRequest $request){
        $validator = Validator::make($request->only(['email', 'password']),[
            'email' => 'required|email',
            'password' => 'required|string|max:50',
        ]);

        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors()
            ],422);
        }else{
            if(!$token = Auth::attempt($request->only('email','password'))){
                return response([
                    'message'=> "Invalid Credentials"
                ], Response::HTTP_UNAUTHORIZED);
            }

            // return $this->respondWithToken($token);

            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            $cookie = cookie('jwt',$token, 60*24,);

            return response()->json([
                'message' => $token
            ])->withCookie($cookie);
        }
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return Response()->json([
            'message' => 'Success'
        ])->withCookie($cookie);
    }

    public function updateDataUser(UserRequest $request, $id){
        try{
            $findUser = User::find($id);
            if($findUser){
                $validator = Validator::make($request->only(['name', 'noHP','role']),[
                    'name' => 'required',
                    'noHP' => 'required|max:13',
                    'role'=> 'required'
                ]);

                if($validator->fails()){
                    return response()->json([
                        'error' => $validator->errors()
                    ],422);
                }else{
                    $findUser->name = $request->name;
                    $findUser->noHP = $request->noHP;
                    $findUser->role = $request->role;
                    $findUser->save();
                    return response()->json([
                        'message' => "Data User Berhasil Di Update"
                    ],200);
                }
            }
        }catch(\Exception $e){
            return response()->json([
                'message'=> $e
            ],500);
        }
    }

    public function deleteUser($id){
        $findUser = User::find($id);

        if($findUser){
            $findUser->delete();
            return response()->json([
                'message' =>"User berhasil dihapus."
            ],200);
        }
    }
}