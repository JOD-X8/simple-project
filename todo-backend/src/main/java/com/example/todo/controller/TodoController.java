package com.example.todo.controller;

import com.example.todo.model.Todo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    // In-memory storage (no database)
    private final List<Todo> todos = new ArrayList<>();

    // Auto-increment ID counter
    private Long nextId = 1L;


    // GET /api/todos — Get all tasks
    @GetMapping
    public List<Todo> getAllTodos() {

        System.out.println("=================================");
        System.out.println("GET /api/todos");
        System.out.println("Number of tasks: " + todos.size());
        System.out.println("=================================");

        return todos;
    }


    // POST /api/todos — Add a new task
    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {

        todo.setId(nextId++);
        todo.setCompleted(false);
        todos.add(todo);

        System.out.println("=================================");
        System.out.println("POST /api/todos");
        System.out.println("Task added: " + todo.getTask());
        System.out.println("Task ID: " + todo.getId());
        System.out.println("Completed: " + todo.isCompleted());
        System.out.println("=================================");

        return todo;
    }


    // PUT /api/todos/{id} — Update a task
    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo updatedTodo) {

        for (Todo todo : todos) {

            if (todo.getId().equals(id)) {

                todo.setTask(updatedTodo.getTask());
                todo.setCompleted(updatedTodo.isCompleted());

                System.out.println("=================================");
                System.out.println("PUT /api/todos/" + id);
                System.out.println("Task updated: " + todo.getTask());
                System.out.println("Completed: " + todo.isCompleted());
                System.out.println("=================================");

                return todo;
            }
        }

        System.out.println("PUT /api/todos/" + id);
        System.out.println("Task not found!");

        return null;
    }


    // DELETE /api/todos/{id} — Delete a task
    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable Long id) {

        todos.removeIf(todo -> todo.getId().equals(id));

        System.out.println("=================================");
        System.out.println("DELETE /api/todos/" + id);
        System.out.println("Task deleted!");
        System.out.println("=================================");

        return "Task deleted";
    }
}

