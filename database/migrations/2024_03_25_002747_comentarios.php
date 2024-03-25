<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Comentarios', function (Blueprint $table) {
            $table->id();
            $table->foreign('id_Producto')->references('id')->on('Producto')
            ->onDelete('cascade');
            $table->foreign('id_Usuario')->references('id')->on('Usuarios')
            ->onDelete('cascade');
            $table->longText('TextoComentario');
            $table->timestamps('FechaComentario');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
