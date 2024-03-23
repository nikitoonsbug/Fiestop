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
        Schema::create('videogames', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->longText('description');
            $table->string('image', 100);
            $table->date('release_date');
            $table->integer('stock');
            $table->float('price');
            $table->boolean('physical');
            $table->boolean('digital');
            $table->unsignedBigInteger('id_category');
            $table->unsignedBigInteger('id_platform');
            $table->string('developer', 100);
            $table->string('publisher', 100);
            $table->timestamps();

            $table->foreign('id_platform')->references('id')->on('platforms')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videogames');
    }
};
