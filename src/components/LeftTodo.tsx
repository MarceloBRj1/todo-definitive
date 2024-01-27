'use client'
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';



const LeftTodo = () => {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [list, setList] = React.useState([
    {
      id: 2,
      text: "Ir pra academia",
      isCompleted: false,
      data: date,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setList([...list, {
      id: list.length + 1,
      text: title,
      data: date,
      isCompleted: false
    }]);
    

    // limpando os inputs
    setTitle('');
    setDate(new Date());
  }
  const removeTodo = (id: number) => {
    const newTodos = [...list];
    const filterTodos = newTodos.filter((item) => item.id !== id);
    setList(filterTodos)
  }

  const completeTodo = (id: number) => {
    const newTodos = [...list];
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setList(newTodos)
  }

  return (
    <main className=''>
      <form onSubmit={handleSubmit} className='container grid-cols-2 mx-auto grid w-full mt-28'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className='text-center' htmlFor="title">Qual a sua tarefa?</Label>
          <Input  type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            
          />
          <Button type="submit" className='mt-2'>Adicionar Tarefa</Button>
        </div>
        
        <section className="border border-sky-200">
          <h1 className='text-3xl text-center mt-4 mb-4 '>Listas de Tarefas</h1>
          <div className='container'>
            <div>
            {list.map((item) => (
              <div className=' rounded-md just mb-10 font-semibold text-lg border gap-4 space-x-10 text-center' key={item.id}>
                <div className='flex space-x-4 justify-center mt-5 mb-5 items-center'>
                <Checkbox/>
                <p className='text-white' >{item.text}</p>
                <span className='text-white' >{item.data?.toLocaleDateString()}</span>
                </div>
                <div className='mb-6'>
                  <Button className='bg-green-400 hover:bg-green-600 mr-10'>Completar</Button>
                  <Button onClick={() => removeTodo(item.id)}>X</Button>

                </div>
              </div>
            ))}
            </div>
          <ul>
          </ul>

          </div>
        </section>
      </form>
    </main>
  );
}

export default LeftTodo;
