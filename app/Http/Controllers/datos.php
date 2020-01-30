<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class datos extends Controller
{
    public function mostrar_contenido(){
    	$url = "https://www.transparencia.gob.sv/api/v1/institutions.json?per_page=300";
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$data = curl_exec($curl);
		$datasearch = json_decode($data);
		//print_r($datasearch);
		curl_close($curl);
		return view('datos_vista')->with('datos', $datasearch);


    }
}
