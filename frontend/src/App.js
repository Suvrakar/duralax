import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UsersList from "./pages/User/index";
import DashboardLayout from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard/index";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { checkToken } from "./slices/authSlice";
import { useEffect } from "react";
import RoleList from "./pages/Role";
import NotAccess from "./pages/NotAccess";
import Cost from "./pages/Cost";
import Customer from "./pages/Customer";
import PdfNote from "./pages/Pdf";
import ProposalStatus from "./pages/ProposalStatus";
import Shop from "./pages/Shop";
import Proposal from "./pages/Proposal";
import ItemsList from "./pages/Product/ItemsList";
import CategoryList from "./pages/Product/CategoryList";
import MaterialList from "./pages/Material/materialList";
import MCategoryList from "./pages/Material/CategoryList";
import GlobalValues from "./pages/settings/GlobalValues";
import CreateProposal from "./pages/CreateProposal";
import Status from "./pages/settings/Status";

// Define your routes with their corresponding permissions
const allRoutes = [
  { path: "/", element: <Dashboard />, permission: "Dashboard" },
  { path: "/users", element: <UsersList />, permission: "Users" },
  { path: "/role", element: <RoleList />, permission: "Role" },
  { path: "/cost", element: <Cost />, permission: "Cost" },
  {
    path: "/proposal-status",
    element: <ProposalStatus />,
    permission: "Proposal Status",
  },
  { path: "/customer", element: <Customer />, permission: "Customer" },
  { path: "/shop", element: <Shop />, permission: "Shop" },
  { path: "/proposal", element: <Proposal />, permission: "Proposal" },
  { path: "/pdf-note", element: <PdfNote />, permission: "PDF Note" },
  { path: "/item/items", element: <ItemsList />, permission: "Item" },
  { path: "/item/category", element: <CategoryList />, permission: "Item" },
  { path: "/material/list", element: <MaterialList />, permission: "Item" },
  {
    path: "/create-proposal",
    element: <CreateProposal />,
    permission: "Create Proposal",
  },
  {
    path: "/settings/global-values",
    element: <GlobalValues />,
    permission: "Settings",
  },
  {
    path: "/settings/status",
    element: <Status />,
    permission: "Settings",
  },
  {
    path: "/material/category",
    element: <MCategoryList />,
    permission: "Item",
  },
];

function App() {
  const store = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for authToken in local storage during the initialization
    const authToken = localStorage.getItem("authToken");
    let user_info = localStorage.getItem("user_info");
    if (authToken && user_info) {
      // If authToken is present, dispatch the loginApi to set the isLoggedIn state
      user_info = JSON.parse(user_info);
      dispatch(checkToken({ token: authToken, user_info }));
    } else {
      dispatch(checkToken({ token: false, user_info }));
    }
  }, [dispatch]);

  //not show any page untile check for token
  if (store.loading) return null;

  // Filter routes based on user's permissions
  const allowedRoutes = allRoutes.filter((route) =>
    store?.user_info?.roleName?.permissions?.includes(route.permission)
  );

  return (
    <Router>
      {!!store.isLoggedIn ? (
        <DashboardLayout>
          <Routes>
            {allowedRoutes?.length > 0 ? (
              allowedRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            ) : (
              <Route path={"/"} element={<NotAccess />} />
            )}
            <Route
              path="/*"
              element={<Navigate replace to={allowedRoutes[0]?.path} />}
            />
          </Routes>
        </DashboardLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
