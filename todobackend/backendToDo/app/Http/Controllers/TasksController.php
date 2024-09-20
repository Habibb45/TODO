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
                'completed' => false, // Assuming newly created tasks are incomplete by default
            ]);

            return response()->json($task, 201); // Return the created task with a 201 status code
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add task.'], 500);
        }
    }

    // Delete a task
    public function deleteData($id)
    {
        try {
            $task = Tasks::findOrFail($id); // Find the task by its ID or fail if not found
            $task->delete(); // Delete the task
            return response()->json(['message' => 'Task deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete task: ' . $e->getMessage()], 500);
        }
    }


    // Toggle the completion status of a task
    public function ToggleData($id)
    {
        try {
            $task = Tasks::findOrFail($id); // Find the task by its ID or fail if not found
            $task->completed = !$task->completed; // Toggle the completed status
            $task->save(); // Save the updated task
            return response()->json($task, 200); // Return the updated task
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to toggle task status.'], 500);
        }
    }
}
