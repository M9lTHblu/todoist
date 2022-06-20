import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {AddProject} from '../features/Project/AddProject';
import {
  deleteProject,
  loadProjects,
  projectSelectors,
} from '../features/Project/projectSlice';

export const SideBar = ({open}) => {
  const dispatch = useDispatch();
  const projects = useSelector(projectSelectors.selectAll);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  const navVariants = {
    open: {x: 0, width: 350},
    close: {x: -350, width: 0},
  };

  const projectsVariants = {
    open: {height: 'auto'},
    close: {height: 0},
  };

  return (
      <motion.aside
          className="h-100 bg-dark"
          key="nav"
          initial={false}
          animate={open ? 'open' : 'close'}
          variants={navVariants}
          transition={{type: 'tween'}}
      >
        <nav className="nav p-5 flex-column text-uppercase">
          <NavLink className="nav-link link" to="inbox">
            Inbox
          </NavLink>
          <NavLink className="nav-link link" to="/">Today</NavLink>
          <NavLink className="nav-link link" to="upcoming">Upcoming</NavLink>
          <NavLink className="nav-link link" to="filters-labels">Filters &
            Labels</NavLink>
          <div className="nav-link link d-flex align-items-center gap-2" onClick={() => setOpenList(!openList)}>
            <span className='text-muted'>Projects</span>
            <AddProject/>
          </div>
          <ul className="list-group text-capitalize">
            {projects?.map(project =>
                <li key={project.id} className='d-flex align-items-end justify-content-between gap-2'>
                  <NavLink className="nav-link link" to={`projects/${project.id}`}
                           style={{fontSize: 15}}>
                    {project.name}
                  </NavLink>
                  <button className="btn text-light" onClick={() => dispatch(deleteProject(project.id))}>
                    <i className="bi bi-trash3" />
                  </button>
                </li>)}
          </ul>
        </nav>
      </motion.aside>);
};
