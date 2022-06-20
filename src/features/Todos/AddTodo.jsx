import {useState} from 'react';
import {useDispatch} from 'react-redux';
import uniqid from 'uniqid';
import {createTodo} from './todoSlice';

export const AddTodo = ({projectId = null}) => {
  const [open, setOpen] = useState(false);

  return (
      <>
        {open ? (
            <AddForm open={setOpen} projectId={projectId} />
        ) : (
            <div>
              <button className="btn p-0" onClick={() => setOpen(true)}>
                <i className="bi bi-plus-lg" />
                Add task
              </button>
            </div>
        )}
      </>
  );
};

const AddForm = ({open, projectId}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uniqid(),
      name,
      description,
      date: Date.now(),
      completed: false,
      projectId: projectId
    };

    dispatch(createTodo(newTodo));
    setName('')
    setDescription('')
  };

  return (

      <form className='list-group-item'  onSubmit={addNewTodo}>
        <input
               className="form-control mb-3"
               type='text'
               value={name}
               placeholder="Name"
               autoFocus={true}
               onChange={(e) => setName(e.target.value)}
        />
        <input className="form-control  mb-5"
               type='text'
               value={description}
               placeholder="Description"
               onChange={(e) => setDescription(e.target.value)}
        />
        <div className='d-flex row-cols-1 row-cols-md-6 flex-column flex-md-row justify-content-end gap-2'>
          <button className="btn btn-outline-danger" onClick={() => open(false)}
          >
            Cancel
          </button>
          <button className="btn btn-outline-success" type="submit"
                  disabled={!name.trim()}
          >
            Add task
          </button>
        </div>
      </form>
  );
};
