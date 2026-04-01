import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';

const TodoForm = ({ onAdd, editingTodo, onUpdate }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    } else {
      setText('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      onUpdate(editingTodo.id, text);
    } else {
      onAdd(text);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Aklındaki görevi yaz..."
        className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-indigo-200"
      >
        {editingTodo ? (
          <><Check size={20} /> Kaydet</>
        ) : (
          <><Plus size={20} /> Ekle</>
        )}
      </button>
    </form>
  );
};

export default TodoForm;