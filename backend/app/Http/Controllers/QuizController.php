<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index()
    {
        return Quiz::all();
    }

    public function show(Quiz $quiz)
    {
        return Quiz::find($quiz->id);
    }
}
