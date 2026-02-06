import { Todo } from '@/types';
import { Clock } from 'lucide-react';

interface CriticalTodosListProps {
  todos: Todo[];
}

export default function CriticalTodosList({ todos }: CriticalTodosListProps) {
  const criticalTodos = todos.filter((todo) => todo.priority === 'CRITICAL').slice(0, 5);

  if (criticalTodos.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🔴 Critical TODOs (0)
        </h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <div className="font-semibold text-textPrimary mb-1">No Critical TODOs!</div>
          <div className="text-sm text-textSecondary">Great job keeping things clean.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🔴 Critical TODOs ({criticalTodos.length})
      </h2>
      <div className="space-y-4">
        {criticalTodos.map((todo) => (
          <div
            key={todo.id}
            className="pb-4 border-b border-border last:border-b-0 last:pb-0 hover:bg-surface hover:p-2 hover:-m-2 rounded transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-1">
              <code className="text-sm text-info font-mono">
                {todo.file_path}:{todo.line_number}
              </code>
              <span className="flex items-center gap-1 text-xs text-textSecondary bg-surface px-2 py-1 rounded">
                <Clock className="w-3 h-3" />
                {todo.age_days}d ago
              </span>
            </div>
            <div className="text-sm text-textPrimary mb-2">{todo.text}</div>
            {todo.tags.length > 0 && (
              <div className="flex gap-2">
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-textSecondary bg-surface px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-info hover:text-info/80 font-medium py-2 hover:bg-surface rounded transition-colors">
        View All Critical TODOs →
      </button>
    </div>
  );
}
