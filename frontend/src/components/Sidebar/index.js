import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuOptions } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidbar } from "../../slices/actionSlice";

function Sidebar() {
  const store = useSelector((state) => state.actions);
  const auth = useSelector((state) => state.auth);
  const { user_info } = auth;

  const dispatch = useDispatch();
  const location = useLocation();
  const sidebarRef = useRef();

  const [indexOfDropdown, setindexOfDropdown] = useState(0);
  const [activeDrop, setactiveDrop] = useState(false);

  useEffect(() => {
    function handler(event) {
      if (
        window.innerWidth <= 1200 &&
        !sidebarRef.current?.contains(event.target)
      ) {
        // window.Helpers.toggleCollapsed();
      }
    }
    // Attach the event listener to the document
    window.addEventListener("click", handler);
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [store.isOpenMobileSidebar]); // Empty dependency array means this effect runs once after the initial render

  const desktopSidebar = () => {
    window.Helpers.toggleCollapsed();
    dispatch(toggleSidbar(!store.isOpenMobileSidebar));
  };

  // Filter menuOptions based on user's permissions
  const filteredMenuOptions = menuOptions?.filter((item) =>
    user_info?.roleName?.permissions?.includes(item.value)
  );

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
        ref={sidebarRef}
      >
        <div className="app-brand demo">
          <Link to="/user" className="app-brand-link">
            {/* <span className="app-brand-logo demo">

            </span> */}
            <span className="app-brand-text demo menu-text fw-bold ms-2 ">
              <img
                className="img1"
                src={"../../assets/img/favicon/logo.png"}
                style={{
                  objectFit: "contain",
                  width: "80%",
                  height: 50,
                  // display: !menu ? "block" : "none",
                }}
              />
              <img
                className="img2"
                src={"../../assets/img/favicon/sidebar.png"}
                style={{
                  objectFit: "contain",
                  width: "80%",
                  height: 50,
                  // display: !menu ? "block" : "none",
                }}
              />
            </span>
          </Link>
          <a
            href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto"
            id={store.isOpenMobileSidebar ? "toogle_btn" : "d-none"}
            onClick={desktopSidebar}
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>

        <ul className="menu-inner py-1">
          {filteredMenuOptions?.map((item, index) => (
            <li
              key={index + "it"}
              className={`menu-item ${activeDrop &&
                item?.menuSub?.length &&
                indexOfDropdown == index &&
                "open"
                } ${location.pathname == item.path ? "active" : ""}`}
              onClick={() => {
                if (indexOfDropdown == index) {
                  setactiveDrop(false);
                  setindexOfDropdown(null);
                } else if (
                  item?.menuSub?.length > 0
                  // location.pathname == item.path &&
                  // indexOfDropdown == index
                ) {
                  setactiveDrop(true);
                  setindexOfDropdown(index);
                } else {
                  setactiveDrop(false);
                  setindexOfDropdown(null);
                }
              }}
            >
              <Link
                to={item.path}
                className={`menu-link  ${item?.menuSub?.length && "menu-toggle"
                  } `}
              >
                <i className={item.icon} />
                <div className="text-truncate" data-i18n="Page 1">
                  {item.label}
                </div>
              </Link>
              {item?.menuSub?.length > 0 && (
                <ul className="menu-sub" onClick={(e) => e.stopPropagation()}>
                  {item?.menuSub?.map((item, idx) => (
                    <li
                      className={`menu-item ${location.pathname == item.path ? "active" : ""
                        } `}
                      key={idx}
                    >
                      <Link to={item.path} className="menu-link">
                        <div class="text-truncate">{item?.label}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li> //
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
