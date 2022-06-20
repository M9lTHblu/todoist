import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {AddTodo} from '../Todos/AddTodo';
import {TodoList} from '../Todos/TodoList';
import {todosSelectors} from '../Todos/todoSlice';
import {projectSelectors} from './projectSlice';

export const Project = () => {
  const {id} = useParams();
  const project = useSelector(state => projectSelectors.selectById(state, id));
  const todos = useSelector(todosSelectors.selectAll)
      .filter(({completed}) => !completed)
  const projectTodos = todos.filter(({projectId}) => projectId === id);

  return (
      <div className="container">
        <div
            className="d-flex flex-column flex-md-row justify-content-between mt-4">
          <div className="d-flex align-items-center mb-4 ">
            <h1 className="me-2">{project?.name}</h1>
          </div>
        </div>
        <TodoList todos={projectTodos} />
        <AddTodo projectId={id}/>
      </div>
  );
};
