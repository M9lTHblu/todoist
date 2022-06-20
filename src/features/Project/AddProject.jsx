import {useState} from 'react';
import {useDispatch} from 'react-redux';
import uniqid from 'uniqid';
import {createProject} from './projectSlice';

export const AddProject = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCreateProject = () => {
    setOpenModal(true);
  };

  return (
      <>
        <button className="btn p-0 text-muted"
                onClick={handleCreateProject}>
          <i className="bi bi-plus-lg" />
        </button>
        {openModal && <Modal seOpenModal={setOpenModal} />}
      </>
  );
};

const Modal = ({seOpenModal}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      name,
      id: uniqid(),
      todos: [],
    };

    dispatch(createProject(newProject));
    seOpenModal(false);
  };

  return (
      <div className="custom-modal">
        <form className="card" onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3 card-body">
            <button className="btn align-self-end" onClick={() => seOpenModal(false)}>close</button>
            <input type="text" className="form-control" placeholder="Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-outline-success" type="submit" disabled={!name.trim().length}>Add
              project
            </button>
          </div>
        </form>
      </div>
  );
};
