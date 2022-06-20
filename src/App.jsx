import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Project} from './features/Project/Project';
import {loadTodos} from './features/Todos/todoSlice';
import {FiltersLabels} from './pages/FiltersLabels/FiltersLabels';
import {Inbox} from './pages/Inbox/Inbox';
import {Today} from './pages/Today/Today';
import {Upcoming} from './pages/Upcoming/Upcoming';

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTodos())
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  index element={<Today />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="filters-labels" element={<FiltersLabels />} />
          <Route path='projects/:id' element={<Project />}/>
        </Route>
      </Routes>
  );
};

