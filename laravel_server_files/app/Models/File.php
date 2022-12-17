<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class File extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'files';
    protected $fillable=['path','user_id'];
}
