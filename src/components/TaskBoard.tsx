import React, { useState } from 'react';
import { Plus, Check, Trash2, Tag, AlertCircle, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'Feature' | 'Optimización' | 'UI/UX' | 'Setup';
  priority: 'Alta' | 'Media' | 'Baja';
  completed: boolean;
}

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Crear plantilla base Vite + React + TypeScript', category: 'Setup', priority: 'Alta', completed: true },
    { id: '2', title: 'Instalar paquetes npm y dependencias de UI', category: 'Setup', priority: 'Alta', completed: true },
    { id: '3', title: 'Diseñar interfaz futurista glassmorphism para Mi proyecto_D', category: 'UI/UX', priority: 'Alta', completed: true },
    { id: '4', title: 'Iniciar servidor local dev en puerto 5173', category: 'Feature', priority: 'Alta', completed: true },
    { id: '5', title: 'Configurar enrutamiento dinámico y estado global', category: 'Feature', priority: 'Media', completed: false },
    { id: '6', title: 'Optimizar bundle final con Code Splitting', category: 'Optimización', priority: 'Baja', completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Feature' | 'Optimización' | 'UI/UX' | 'Setup'>('Feature');
  const [newTaskPriority, setNewTaskPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'completadas'>('todos');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pendientes') return !t.completed;
    if (filter === 'completadas') return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Progress Bar */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 color="var(--accent-emerald)" size={20} /> Gestor de Features de Mi proyecto_D
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Administra el ciclo de vida y estado de desarrollo
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Progreso: {progressPercent}% ({completedCount}/{tasks.length})
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          width: '100%',
          height: '10px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'var(--gradient-brand)',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Add Task Form & Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Form Panel */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} color="var(--accent-primary)" /> Agregar Nueva Tarea / Feature
          </h3>
          <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Ej: Integrar API de autenticación..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                className="input-field"
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as any)}
                style={{ flex: 1 }}
              >
                <option value="Feature">Feature</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Optimización">Optimización</option>
                <option value="Setup">Setup</option>
              </select>

              <select
                className="input-field"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as any)}
                style={{ flex: 1 }}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '4px' }}>
              <Sparkles size={16} /> Crear Tarea
            </button>
          </form>
        </div>

        {/* Filters & Quick Stats */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={16} color="var(--accent-cyan)" /> Filtrar Tareas
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['todos', 'pendientes', 'completadas'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn"
                  style={{
                    flex: 1,
                    textTransform: 'capitalize',
                    padding: '8px',
                    fontSize: '0.82rem',
                    background: filter === f ? 'var(--gradient-brand)' : 'rgba(0,0,0,0.2)',
                    color: filter === f ? '#fff' : 'var(--text-secondary)',
                    borderColor: filter === f ? 'transparent' : 'var(--border-color)'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <p style={{ fontSize: '0.8rem', color: '#818cf8', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> Tip: Haz clic en el círculo para marcar una tarea como completada.
            </p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>
          Lista de Tareas ({filteredTasks.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredTasks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
              No hay tareas en esta categoría.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: task.completed ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  opacity: task.completed ? 0.75 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: task.completed ? 'none' : '2px solid var(--text-muted)',
                      background: task.completed ? 'var(--accent-emerald)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff'
                    }}
                  >
                    {task.completed && <Check size={14} />}
                  </button>
                  <span style={{
                    fontSize: '0.95rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    fontWeight: 500
                  }}>
                    {task.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-indigo">
                    <Tag size={11} /> {task.category}
                  </span>
                  <span className={`badge ${task.priority === 'Alta' ? 'badge-amber' : 'badge-cyan'}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px'
                    }}
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
