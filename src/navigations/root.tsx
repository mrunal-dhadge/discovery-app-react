import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Application </h1>
        <div>

          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/`}>Contacts</a>
            </li>
            <li>
              <a href={`/chart/`}>Chart</a>
            </li>
            <li>
              <a href={`/map/`}>Map</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='container mx-auto'>
        <Outlet />
      </div>
    </>
  );
}
