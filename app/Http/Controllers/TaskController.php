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
        
        $allTags = [];

        
        foreach($tasks as $task) {
            $tags = explode(' ',$task->tags);
            foreach ($tags as $tag) {
                $allTags[] = $tag;
            }
        }
        $allTags = array_unique($allTags);

        return view('home', ['tasks' => $tasks, 'allTags' => $allTags]);
    }

    public function edit ($id) {
        $task = Task::find($id);

        return response()->json($task);
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
        //new task saving
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

        // retrieving all tasks
        $DBtags = Task::select('tags')->get();

        $allTags = [];

        foreach($DBtags as $DBtag) {
            $tags = explode(' ',$DBtag->tags);
            foreach ($tags as $tag) {
                $allTags[] = $tag;
            }
        }
        $allTags = array_unique($allTags);

        // sending the new task and all tags
        return response()->json([$task, $allTags]);
    }

    public function update(Request $request, Task $task) {
        //task editing
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

        $task->update($taskFromBlade);

        $task->tags = explode(' ', $task->tags);

        // retrieving all tags
        $DBtags = Task::select('tags')->get();

        $allTags = [];

        foreach($DBtags as $DBtag) {
            $tags = explode(' ',$DBtag->tags);
            foreach ($tags as $tag) {
                $allTags[] = $tag;
            }
        }
        $allTags = array_unique($allTags);

        // sending the new task and all tags
        return response()->json([$task, $allTags]);
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
