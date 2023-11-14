<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aktivitas extends Model
{
    use HasFactory;

        protected $fillable = [
        'idUser',
        'idPembuat',
        'idGuruPengajar',
        'idGuruPiket',
        'idKurikulum',
        'idIzin',
        'tanggal',
        'aktivitas',
        'created_at',
        'updated_at'
    ];
}