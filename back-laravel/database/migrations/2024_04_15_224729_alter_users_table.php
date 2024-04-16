<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Adiciona a coluna 'event_id' à tabela 'users'
            $table->unsignedBigInteger('event_id')->nullable();
            
            // Adiciona a chave estrangeira 'event_id' que referencia a coluna 'id' na tabela 'events'
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove a chave estrangeira 'event_id'
            $table->dropForeign(['event_id']);
            
            // Remove a coluna 'event_id'
            $table->dropColumn('event_id');
        });
    }
};

