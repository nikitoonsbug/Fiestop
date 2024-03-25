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
        Schema::create('DetalleOrden', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_Orden');
            $table->unsignedBigInteger('id_Producto');
            $table->string('Cantidad');
            $table->float('PrecioUnitario');
            $table->timestamps();

            $table->foreign('id_Orden')->references('id')->on('OrdenesCompra')->onDelete('cascade');
            $table->foreign('id_Producto')->references('id')->on('Producto')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DetalleOrden');
    }
};
