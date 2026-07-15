// DOM Elements Selection 
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Try to load saved Todos from localStorage 
const saved = localStorage.getItem('todos'); 
const todos = saved ? JSON.parse(saved) : []; 

function saveTodos() {
    // Save current todos arrays to localStorage
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

function createTodoNode(todo, index) {
    const li = document.createElement('li'); 

    // Checkbox
    const checkbox = document.createElement('input'); 
    checkbox.type = 'checkbox'; 
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked; 
        textSpan.style.textDecoration = todo.completed ?  'line-through' : ""
        render(); // Re-render to instantly update the line-through styling
        saveTodos(); 
    });

    // Text Span
    const textSpan = document.createElement("span"); 
    textSpan.textContent = todo.text; 
    textSpan.style.margin = '0 8px'; 
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through'; 
    }
        
    textSpan.addEventListener("dblclick", () => { // Fixed spelling: dblclick
        const newText = prompt("Edit todo", todo.text); 
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text; 
            saveTodos(); 
            render();
        }
    });

    // Delete To Do button
    const delBtn = document.createElement('button'); // Fixed variable name consistency
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1); // Fixed: splice the global array 'todos', not 'todo'
        render(); 
        saveTodos(); 
    });

    li.appendChild(checkbox); 
    li.appendChild(textSpan); 
    li.appendChild(delBtn); 
    return li; 
}

// Render the whole todo list from todos array
function render() {
    list.innerHTML = ''; 

    todos.forEach((todo, index) => { // Fixed: removed '.array'
        const node = createTodoNode(todo, index); 
        list.appendChild(node); 
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim(); // Fixed: use .value instead of .ariaValueMax
    if (!text) {
        return; 
    }

    todos.push({ text, completed: false }); 
    input.value = ''; // Cleaned up: reset to empty string rather than ' ' (space)
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo); 

// Initial render call on page load
render();