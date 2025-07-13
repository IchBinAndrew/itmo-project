/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FormEvent, useEffect, useState } from 'react';
import withAuth from '@/utils/withAuth';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/Input';
import Button from '@/components/Button';


type TasksCategory = typeof TasksCategoryEnum[number];

interface Task {
  id: number;
  title?: string;
  description?: string;
  imageUrls?: string[];
  assigned_user_id: number;
  data_json: Record<string, any>;
  category: string;
  ai_pred: string;
}

const TasksCategoryEnum = [
  'multifactor_relevancy',
  'logical_connection',
  'attitude',
  'size_matches',
  'product_quality',
  'composition',
  'wear',
  'product_contents',
  'multimodal_matching',
  'argument_classification',
  'source_reliability',
  'contraditctions_check',
  'intent_analysis',
  'manipulation_detection',
  'genre_and_style',
  'counterfeit_check',
  'material_type',
  'packaging_integrity',
  'color_comparison',
  'installation_check',
] as const;

type Tab = 'text' | 'images';

function TasksPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assigned_user_id: '',
    data_json: '',
    category: TasksCategoryEnum[0] as TasksCategory,
  });
  const [tab, setTab] = useState<Tab>('text');
  const [images, setImages] = useState<{ required: File | null; optional: File | null }>({
    required: null,
    optional: null,
  });

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks/list', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setTasks(await res.json());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (tab === 'text') {
        const pyld = {
          assigned_user_id: Number(form.assigned_user_id),
          data_json: JSON.parse(form.data_json || '{}'),
          category: form.category,
        };
        const formData = new FormData()
        formData.append("task", JSON.stringify(pyld))
        const res = await fetch('/api/tasks/upload/text', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (res.ok) {
          setForm({ ...form, title: '', description: '', assigned_user_id: '', data_json: '' });
          fetchTasks();
        }
      } else {
        const formData = new FormData();
        if (images.required) formData.append('file', images.required);
        if (images.optional) formData.append('second_file', images.optional);
        
        const pyld = {
          assigned_user_id: Number(form.assigned_user_id),
          data_json: JSON.parse(form.data_json || '{}'),
          category: form.category,
        };
        
        formData.append('task', JSON.stringify(pyld));

        const res = await fetch('/api/tasks/upload/image', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          setImages({ required: null, optional: null });
          setForm({ ...form, assigned_user_id: '', data_json: '' });
          fetchTasks();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex space-x-3 mb-4">
        {(['text', 'images'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg font-semibold transition
              ${
                tab === t
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            type="button"
          >
            {t === 'text' ? 'Текстовая задача' : 'Задача с картинками'}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={create}
        className="bg-white rounded-xl p-6 shadow-md space-y-4"
        noValidate
      >
        {tab === 'text' ? (
          <div />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">Новая задача с картинками</h2>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col text-gray-700 font-medium">
                Обязательная картинка
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    setImages({ ...images, required: e.target.files?.[0] || null })
                  }
                  className="mt-1"
                />
              </label>

              <label className="flex flex-col text-gray-700 font-medium">
                Опциональная картинка
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImages({ ...images, optional: e.target.files?.[0] || null })
                  }
                  className="mt-1"
                />
              </label>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="User ID"
            type="number"
            value={form.assigned_user_id}
            onChange={(e) => setForm({ ...form, assigned_user_id: e.target.value })}
            className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min={1}
          />

          <select
            className="rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as TasksCategory })}
          >
            {TasksCategoryEnum.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="JSON data"
          className="w-full rounded-md border border-gray-300 p-3 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
          value={form.data_json}
          onChange={(e) => setForm({ ...form, data_json: e.target.value })}
          spellCheck={false}
          rows={5}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Создать
        </Button>
      </form>

      {/* Задачи */}
      <div className="grid gap-6 md:grid-cols-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex flex-col bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            {t.data_json && <p className="text-gray-700 mb-2">{String(t.data_json.text)}</p> ? t.data_json.text : <div />}
            {t.data_json && <p className="text-gray-700 mb-2">{String(t.data_json.statement1)}</p> ? t.data_json.statement1 : <div />}
            {t.data_json && <p className="text-gray-700 mb-2">{String(t.data_json.statement2)}</p> ? t.data_json.statement2 : <div />}
            {t.data_json && <p className="text-gray-700 mb-2">{String(t.data_json.comment)}</p> ? t.data_json.comment : <div />}

            {t.data_json && <p className="text-gray-700 mb-2">{String(t.ai_pred)}</p>}

            {t.imageUrls?.length ? (
              <div className="flex flex-wrap gap-2 mb-3">
                {t.imageUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`task image ${i + 1}`}
                    className="rounded-md max-h-40 object-cover"
                  />
                ))}
              </div>
            ) : null}

            <p className="text-sm text-gray-500">User ID: {t.assigned_user_id}</p>
            <p className="text-sm text-gray-500">Категория: {t.category.replace(/_/g, ' ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(TasksPage);