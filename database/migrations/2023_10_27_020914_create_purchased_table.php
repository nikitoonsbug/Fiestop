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
       
        Schema::create('purchased', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->date('purchase_date');
            $table->string('purchase_method', 20);
            $table->string('purchase_currency', 20);
            $table->string('purchase_status', 20);
            $table->timestamps();

            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
