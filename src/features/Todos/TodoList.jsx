import {Todo} from './Todo';

export const TodoList = ({todos}) => {

  return (
      <ul className="list-group col">
        {todos?.map((todo) => (
            <li key={todo.id} className='list-group-item mb-3 shadow-sm '>
              <Todo todo={todo} />
            </li>
        ))}
      </ul>
  );
};
