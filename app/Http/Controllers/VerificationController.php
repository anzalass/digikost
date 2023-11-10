<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Mail\ForgotPasswordVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request){
        if(!$request->hasValidSignature()){
            return response()->json(["msg"=>"Invalid/Expired url provided"],401);
        }
        $user = User::findOrFail($user_id);
        if(!$user->hasVerifiedEmail()){
            $user->markEmailAsVerified();
        }else{
            return response()->json([
                "status"=>400,
                "message"=>"Email already verified"
            ],400);
        }
    }

    public function forgotPassword(Request $request){
        $validator = Validator::make($request->only(['email'],[
            'email' =>'required'
        ]));

        if($validator->fails()){
            return response()->json([
                'message'=> $validator->errors()
            ],422);
        }else{
            $findUser = User::where('email', $request->email);
            if(!$findUser){
                return response()->json([
                    'message' => "Data user dengan email ".$request->email." Tidak ditemukan."
                ],404);
            }else{
               try{
                    Mail::mailer('smtp')->send(new ForgotPasswordVerification($findUser));
                    
                    return response()->json([
                        'status'=>200,
                        'message' => "Registered, verify your email address to login"
                    ],200);
               }catch(\Exception $e){
                    
               }
            }
        }
    }
}