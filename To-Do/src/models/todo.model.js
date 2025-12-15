
let todos = [];

class TodoModel {
    static findAll() {
        return Promise.resolve(todos);
    }
    
    static create(todo) {
        const newTodo = {
            id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
            title: todo.title,
            completed: todo.completed || false
        };
        
        todos.push(newTodo);
        return Promise.resolve(newTodo);
    }
}

module.exports = TodoModel;
