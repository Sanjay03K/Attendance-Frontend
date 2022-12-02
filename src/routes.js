// import
import Dashboard from "views/Dashboard/Dashboard.js";
import GeneralInformation from "views/Dashboard/GeneralInformation";
import Profile from "views/Dashboard/Profile.js";
import TimeTable from "views/Dashboard/TimeTableEdit";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
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


// let type = localStorage.getItem("type")
// console.log("HELLO "+type)

// if(type === 1){

//   dashRoutes.push(  {
//     path: "/timetable_edit",
//     name: "TimeTable",
//     icon: <PersonIcon color="inherit" />,
//     secondaryNavbar: true,
//     component: TimeTable,
//     layout: "/admin",
//   })
// }

export default dashRoutes;