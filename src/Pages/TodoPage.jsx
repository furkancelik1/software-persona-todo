import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from '../Components/TodoForm';
import TodoItem from '../Components/TodoItem';
import { LayoutList, Loader2 } from 'lucide-react';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);

  // 1. VERİ ÇEKME (API & LocalStorage Yönetimi)
  useEffect(() => {
    const fetchInitialData = async () => {
      const savedTodos = localStorage.getItem('software-persona-todos');
      
      // Eğer tarayıcıda kayıtlı veri varsa onu getir
      if (savedTodos && JSON.parse(savedTodos).length > 0) {
        setTodos(JSON.parse(savedTodos));
        setLoading(false);
      } else {
        // LocalStorage boşsa, API'den örnek verileri Axios ile çek
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
          
          const turkishTasks = [
            "React dökümanlarını incele",
            "Staj projesi eksiklerini tamamla",
            "Tailwind CSS ile tasarımı güzelleştir",
            "API entegrasyonunu test et",
            "Kodları GitHub'a yükle"
          ];

          const apiTodos = response.data.map((item, index) => ({
            id: item.id,
            text: turkishTasks[index] || "Yeni Görev",
            completed: item.completed
          }));

          setTodos(apiTodos);
          localStorage.setItem('software-persona-todos', JSON.stringify(apiTodos));
        } catch (error) {
          console.error("API Veri Çekme Hatası:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialData();
  }, []);

  // 2. LOCALSTORAGE GÜNCELLEME (Her değişiklikte otomatik kayıt)
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('software-persona-todos', JSON.stringify(todos));
    }
  }, [todos, loading]);

  // CRUD İŞLEMLERİ
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    setEditingTodo(null);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-indigo-600 p-8 text-center text-white">
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-3">
          <LayoutList size={32} className="text-indigo-200" />
          Yapılacaklar Listesi
        </h1>
        <p className="text-indigo-200 mt-2 font-medium">Software Persona Web Geliştirme Projesi</p>
      </div>

      <div className="p-8">
        <TodoForm onAdd={addTodo} editingTodo={editingTodo} onUpdate={updateTodo} />

        <div className="mt-8">
          {loading ? (
            <div className="flex flex-col items-center py-12 text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Veriler API'den yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={deleteTodo}
                  onEdit={setEditingTodo}
                  onToggle={toggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage; 