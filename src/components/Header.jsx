export const Header = ({openMenu}) => {
  return (
      <header className='bg-light border-bottom py-2'>
        <div className="container-sm">
          <button
              onClick={openMenu}
              className="btn btn-outline-dark"
          >
            Menu
          </button>
        </div>
      </header>
  )
}
