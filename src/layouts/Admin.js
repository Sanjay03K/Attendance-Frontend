// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import routes1 from "routes1.js";
// Custom Chakra theme
import theme from "theme/theme.js";

// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Mark Attendance";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveRoute1 = (routes1) => {
    let activeRoute1 = "Mark Attendance";
    for (let i = 0; i < routes1.length; i++) {
      if (routes1[i].collapse) {
        let collapseActiveRoute1 = getActiveRoute1(routes1[i].views);
        if (collapseActiveRoute1 !== activeRoute1) {
          return collapseActiveRoute1;
        }
      } else if (routes1[i].category) {
        let categoryActiveRoute1 = getActiveRoute1(routes1[i].views);
        if (categoryActiveRoute1 !== activeRoute1) {
          return categoryActiveRoute1;
        }
      } else {
        if (
          window.location.href.indexOf(routes1[i].layout + routes1[i].path) !==
          -1
        ) {
          return routes1[i].name;
        }
      }
    }
    return activeRoute1;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbar1 = (routes1) => {
    let activeNavbar1 = false;
    for (let i = 0; i < routes1.length; i++) {
      if (routes1[i].category) {
        let categoryActiveNavbar1 = getActiveNavbar1(routes1[i].views);
        if (categoryActiveNavbar1 !== activeNavbar1) {
          return categoryActiveNavbar1;
        }
      } else {
        if (
          window.location.href.indexOf(routes1[i].layout + routes1[i].path) !==
          -1
        ) {
          if (routes1[i].secondaryNavbar) {
            return routes1[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar1;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getRoutes1 = (routes1) => {
    return routes1.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes1(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes1(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={"Attendance Portal"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"Hod Dashboard"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            rtlActive={false}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                {getRoutes1(routes1)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}

        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
  );
}
