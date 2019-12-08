<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
	public function index()
	{
		return view('admin/content/home');
	}
	
	public function test()
	{
		return view('admin/content/test');
	}
}
