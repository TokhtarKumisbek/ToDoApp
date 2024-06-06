function TaskItem({ task, onToggle, onDelete }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div onClick={() => onToggle(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
          {task.completed ? '✔️' : '◻️'} {task.text}
        </div>
        <button onClick={() => onDelete(task.id)}>X</button>
      </div>
    );
  }
  
  export default TaskItem;
  