import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');  // 'all', 'active', 'completed'

  // Retrieve tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Retrieved from localStorage:', storedTasks);  // Check what's actually being retrieved
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  useEffect(() => {
    console.log('Storing to localStorage:', tasks);  // Check what's being stored
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  return (
    <div style={{ backgroundColor: '#333', color: 'white', padding: '20px', margin: '20px auto', borderRadius: '8px', width: '80%'}}>
        <h1>TODO</h1>
        <input
            style={{ padding: '10px', margin: '5px', width: '70%', borderRadius: '5px', border: 'none' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What to do?"
        />
        <button
            style={{ padding: '10px', margin: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={handleAddTask}
        >
            Add Task
        </button>
        <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />

        <div class="others">
            
            <button class="allbtn" onClick={() => setFilter('all')}>All</button>
            <button class="allbtn" onClick={() => setFilter('active')}>Active</button>
            <button class="allbtn" onClick={() => setFilter('completed')}>Completed</button>
        </div>


        <div class="left">{tasks.filter(task => !task.completed).length} items left</div>
        
        <div class="completed"><button onClick={() => setTasks(tasks.filter(task => !task.completed))}>Clear Completed</button></div>
        {/* <div>
            {tasks.filter(task => !task.completed).length} items left
            <button onClick={() => setTasks(tasks.filter(task => !task.completed))}>Clear Completed</button>
        </div> */}
    </div>
);

}
