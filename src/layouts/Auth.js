// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
// core components

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import routes1 from "routes1.js";
import theme from "theme/theme.js";

export default function Pages(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const getActiveRoute1 = (routes1) => {
    let activeRoute1 = "Default Brand Text";
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

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
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
  const getActiveNavbar1 = (routes1) => {
    let activeNavbar1 = false;
    for (let i = 0; i < routes.length; i++) {
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
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
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
      if (prop.layout === "/auth") {
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

  const navRef = React.useRef();
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            <Switch>
              {getRoutes1(routes1)}
              {getRoutes(routes)}
              <Redirect from="/auth" to="/auth/login-page" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
