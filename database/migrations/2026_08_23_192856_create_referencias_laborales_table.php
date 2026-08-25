<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('referencias_laborales', function (Blueprint $table) {
            $table->increments('id_ref_lab');
            $table->string('nombre_referente', 200);
            $table->string('institucion', 200);
            $table->string('telefono_celular', 20);
            $table->integer('id_persona')->unsigned();
            // $table->integer('id_exp_lab')->unsigned();
            $table->timestamps();

            $table->bigInteger('id_persona')->unsigned(); 
            $table->timestamps();

            $table->foreign('id_persona')
                  ->references('id')->on('personas')
                  ->onDelete('cascade');
            // $table->foreign('id_exp_lab')
            //       ->references('id_exp_lab')->on('experiencias_laborales')
            //       ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('referencias_laborales');
    }
};