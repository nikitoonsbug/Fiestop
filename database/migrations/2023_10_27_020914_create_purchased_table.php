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
       
        Schema::create('OrdenesCompra', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_Usuario');
            $table->date('FechaCompra');
            $table->string('EstadoOrden', 20);
            $table->string('Total');
            $table->timestamps();

            
            $table->foreign('id_Usuario')->references('id')->on('Usuarios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
