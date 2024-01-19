<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminDetail extends Model
{
    use HasFactory;
    protected $table = 'admin_detail';
    protected $fillable = ['admin_id', 'name', 'address', 'telephone', 'status', 'created_at', 'updated_at'];
}
