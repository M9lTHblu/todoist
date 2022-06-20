import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {projectSelectors} from '../Project/projectSlice';
import {TodoForm} from './TodoForm';
import {deleteTodo, updateTodo} from './todoSlice';

export const Todo = ({todo}) => {
  const [open, setOpen] = useState(false);

  return (
      <article className="d-flex flex-column justify-content-start pb-2">
        {!open ? (
            <>
              <TodoControls todo={todo} setOpen={setOpen} />
              <div>
                <p className="fs-5 fw-light ">{todo.name}</p>
                <p className="fs-6 fst-italic fw-lighter">{todo.description}</p>
              </div>
            </>
        ) : (
            <TodoForm todo={todo} open={setOpen} />
        )}
      </article>
  );
};

const TodoControls = ({todo, setOpen}) => {
  const dispatch = useDispatch();
  const [openMoveTo, setOpenMoveTo] = useState(false);

  const handleComplete = () => {
    dispatch(updateTodo({id: todo.id, changes: {completed: true}}));
  };

  const moveToProject = (projectId) => {
    dispatch(updateTodo({id: todo.id, changes: {projectId}}));
  };

  return (
      <>
        <div className=" d-flex align-items-center mb-3">
          <button className=" btn text-danger"
                  onClick={handleComplete}>
            <i className="bi bi-check2-square" />
          </button>
          <button className="btn "
                  onClick={() => setOpen(true)}>
            <i className="bi bi-pencil-square" />
          </button>
          <button className="btn"
                  onClick={() => setOpenMoveTo(!openMoveTo)}>
            <i className="bi bi-arrow-right-circle" />
          </button>
          <button className="btn" onClick={() => dispatch(deleteTodo(todo.id))}>
            <i className="bi bi-trash3" />
          </button>
        </div>
        {openMoveTo && <MoveTo moveToProject={moveToProject}
                               setOpenMoveTo={setOpenMoveTo}
        />}
      </>
  );
};

const MoveTo = ({moveToProject, setOpenMoveTo}) => {
  const projects = useSelector(projectSelectors.selectAll);
  const [id, setId] = useState(null);

  return (
      <div className='d-flex flex-column align-self-center mb-3'>
        {projects?.map(p =>
            <div key={p.id}>
              <h2 className='text-center'>Move to project</h2>
              <label className='m-2'>
                <input className="form-check-input me-2" type="radio"
                       onChange={() => setId(p.id)}
                />
                {p.name}
              </label>
            </div>)}
        <div className='d-flex gap-3 m-2'>
          <button className="btn text-uppercase"
                  onClick={() => {
                    moveToProject(id)
                    setOpenMoveTo(false)
                  }}>
            Move
          </button>
          <button className='btn btn text-uppercase' onClick={() => setOpenMoveTo(false)}>Cancel</button>
        </div>
      </div>
  );
};
