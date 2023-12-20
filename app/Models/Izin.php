<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Izin extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $fillable = [
        'idUser',
        'idMapel',
        'kelas',
        'foto',
        'guruPengajar',
        'kurikulum',
        'jamKeluar',
        'jamMasuk',
        'keterangan',
        'typeIzin',
        'responGuruPengajar',
        'responKurikulum',
        'statusPengajuan'
    ];
}