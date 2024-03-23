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
        Schema::create('videogames_purchased', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_purchased');
            $table->unsignedBigInteger('id_videogame');
            $table->timestamps();

            $table->foreign('id_purchased')->references('id')->on('purchased')->onDelete('cascade');
            $table->foreign('id_videogame')->references('id')->on('videogames')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_lendings');
    }
};
