<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::where('user_id', Auth::id())->latest()->get();
        return view('home', ['tasks' => $tasks]);
        // return response()->json('{"id":1,"user_id":"1","task":"to do sth","status":"no","tags":"bla,dla","image":"dummy.png"}');
    }

    public function store(Request $request) {
        $taskFromBlade = $request->validate([
            'task' => 'required',
            'tags' => 'nullable',
            'image' => 'nullable',
        ]);

        $taskFromBlade['user_id']= auth()->user()->id;

        $task = Task::create($taskFromBlade);

        return response()->json($task);
    }

    public function update() {
        
    }

    public function destroy($id) {
        Task::find($id)->delete($id);

        return response()->json([]);
    }

}
