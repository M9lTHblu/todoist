import {useSelector} from 'react-redux';
import {AddTodo} from '../../features/Todos/AddTodo';
import {TodoList} from '../../features/Todos/TodoList';
import {todosSelectors} from '../../features/Todos/todoSlice';

export const Today = () => {
  const todos = useSelector(todosSelectors.selectAll)
      .filter(({completed}) => !completed)
  const today = new Date(Date.now()).toDateString();
  const todayTodos = todos.filter(todo => {
    const todoDate = new Date(todo.date).toDateString()
    return todoDate === today
  })

  return (
      <div className="container">
        <div
            className="d-flex flex-column flex-md-row justify-content-between mt-4">
          <div className="d-flex align-items-center mb-4 ">
            <h1 className="me-2">Today</h1>
            {today.slice(0, -4)}
          </div>
        </div>
        <TodoList todos={todayTodos}/>
        <AddTodo />
      </div>
  );
};




