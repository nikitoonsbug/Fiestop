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
        Schema::create('Usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('Apellido_paterno');
            $table->string('Apellido_materno');
            $table->string('Email')->unique();
            $table->string('CodigoPostal', 15);
            $table->string('Contraseña');
            $table->string('Estado',25);
            $table->string('Municipio',25);
            $table->string('Direccion', 100);
            $table->string('NumeroInterior', 15);
            $table->string('NumeroExterior', 15);
            $table->unsignedBigInteger('id_rol')->default(2);
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('id_rol')->references('id')->on('rols')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Usuarios');
    }
};
