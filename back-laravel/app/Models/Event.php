<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'time',
        'duration',
        'description',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function users()
    {
    return $this->belongsToMany(User::class); //used to define a many-to-many relationship between the User and Event models
    }
}
