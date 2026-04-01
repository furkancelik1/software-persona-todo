import { Trash2, Edit2, Check } from 'lucide-react';

const TodoItem = ({ todo, onDelete, onEdit, onToggle }) => {
  return (
    <div className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${todo.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}`}>
      
      {/* Özel Checkbox ve Metin */}
      <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onToggle(todo.id)}>
        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-indigo-400'}`}>
          {todo.completed && <Check size={16} className="text-white" strokeWidth={3} />}
        </div>
        <span className={`text-[15px] font-medium transition-colors ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
          {todo.text}
        </span>
      </div>

      {/* Aksiyon Butonları (Sadece üzerine gelince netleşir) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(todo)}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Düzenle"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Sil"
        >
          <Trash2 size={18} />
        </button>
      </div>

    </div>
  );
};

export default TodoItem;