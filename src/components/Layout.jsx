import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from './Header';
import {SideBar} from './SideBar';

export const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
      <>
        <div className=" d-flex flex-column w-100 h-100 ">
          <Header openMenu={() => setOpen(!open)}/>
          <div className='d-flex h-100'>
            <SideBar open={open}/>
            <main className='flex-grow-1'>
              <Outlet/>
            </main>
          </div>
        </div>
      </>
  );
};



