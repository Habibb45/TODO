<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    // Get all tasks
    public function GetData()
    {
        try {
            $tasks = Tasks::all(); // Fetch all tasks from the database
            return response()->json($tasks);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch tasks.'], 500);
        }
    }

    // Add a new task
    public function AddData(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $task = Tasks::create([
                'name' => $request->input('name'),
                'iscomplete' => false, // Assuming newly created tasks are incomplete by default
            ]);

            return response()->json($task, 201); // Return the created task with a 201 status code
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add task.'], 500);
        }
    }

    public function Delete($id)
    {
        // Find the item by ID
        $item = Tasks::find($id);

        if ($item) {
            // Delete the item
            $item->delete();
            return response()->json(['message' => 'Item deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Item not found'], 404);
        }
    }


    // Toggle the completion status of a task
    public function ToggleData($id)
    {
        try {
            $task = Tasks::findOrFail($id); // Find the task by its ID or fail if not found
            $task->iscomplete = !$task->iscomplete; // Toggle the completed status
            $task->save(); // Save the updated task
            return response()->json($task, 200); // Return the updated task
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to toggle task status.'], 500);
        }
    }
}
