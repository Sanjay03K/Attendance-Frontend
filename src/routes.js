// import
import Dashboard from "views/Dashboard/Dashboard.js";
import GeneralInformation from "views/Dashboard/GeneralInformation";
import Profile from "views/Dashboard/Profile.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/Report",
    name: "Report",
    icon: <StatsIcon color="inherit" />,
    component: GeneralInformation,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
];
export default dashRoutes;
