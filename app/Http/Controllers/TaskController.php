<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::where('user_id', Auth::id())->latest()->get();
        
        return view('home', ['tasks' => $tasks]);
        // return response()->json('{"id":1,"user_id":"1","task":"to do sth","status":"no","tags":"bla,dla","image":"dummy.png"}');
    }

    public function fulfil ($id) {
        $task = Task::find($id);

        $task->status = "yes";
        
        $task->save();

        return response()->json($task);
    }

    public function unfulfil ($id) {
        $task = Task::find($id);

        $task->status = null;
        
        $task->save();

        return response()->json($task);
    }

    public function store(Request $request) {
        $taskFromBlade = $request->validate([
            'task' => 'required',
            'tags' => 'nullable',
            'image' => 'nullable',
        ]);

        if($request->hasFile('image')) {
            if (Str::contains($request->file('image')->store(), ['.jpg', '.jpeg', '.png', '.gif'])) {
                $request->file('image')->store('images', 'public');
                $taskFromBlade['image'] = $request->file('image')->store();
            } else {
                $taskFromBlade['image'] = 'no-image.jpg';
            }
        }
        

        $taskFromBlade['user_id']= auth()->user()->id;

        $task = Task::create($taskFromBlade);

        $task->tags = explode(' ', $task->tags);

        return response()->json($task);
    }

    public function update() {
        
    }

    public function destroy($id) {
        $task = Task::find($id);

        $task->delete($id);

        if ($task->image !== 'no-image.jpg') {
            Storage::disk('public')->delete('images/'.$task->image);
        }

        return response()->json($task->image);
    }

}
