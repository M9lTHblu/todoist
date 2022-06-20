import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateTodo} from './todoSlice';

export const TodoForm = ({todo, open}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  });

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({id: todo.id, changes: {name, description}}));
    open(false);
  };

  return (
      <AnimatePresence>
        <motion.form
            key="form"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="rounded-3 shadow-lg py-3 px-2"
            onSubmit={handleUpdate}>
          <div className="mb-3">
            <input className="form-control fs-6 fw-light mb-2"
                   type="text"
                   value={name}
                   autoFocus={true}
                   onChange={(e) => setName(e.target.value)} />
            <input className="form-control fs-6 fst-italic fw-lighter"
                   type="text"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div
              className="d-flex row-cols-1 row-cols-md-6 flex-column flex-md-row justify-content-end gap-2">
            <button className="btn btn-outline-danger">
              Cancel
            </button>
            <button type="submit" className="btn btn-outline-success"
                    disabled={!name.trim().length}
            >
              Save
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
  );
};
