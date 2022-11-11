import SignIn from "views/Pages/SignIn.js";
import ExtraCurricularData from "views/Pages/ExtraCurricularData";


var NdashRoutes = [
  {
    path: "/Attendance",
    component: ExtraCurricularData,
    layout: "/admin",
  },
  {
    path: "/signin",
    component: SignIn,
    layout: "/auth",
  },
];
export default NdashRoutes;
