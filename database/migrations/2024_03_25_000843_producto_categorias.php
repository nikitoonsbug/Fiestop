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
        Schema::create('ProductoCategorias', function (Blueprint $table) {
            $table->foreign('id_Producto')->references('id')->on('Producto')
            ->onDelete('cascade');
            $table->foreign('id_Categoria')->references('id')->on('Categorias')
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ProductoCategorias');
    }
};
