import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

const withRoutePersistence = (WrappedComponent) => {
  const RoutePersistence = (props) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
      const unlisten = props.history.listen(() => {
        setKey((prevKey) => prevKey + 1);
      });
      return unlisten;
    }, [props.history]);

    return (
      <Route
        key={key}
        path={props.path}
        render={(routeProps) => (
          <WrappedComponent {...props} {...routeProps} key={key} />
        )}
      />
    );
  };

  return RoutePersistence;
};

const RoutePersistenceSwitch = (props) => {
  const { children, ...rest } = props;

  return (
    <Switch>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...rest,
            component: withRoutePersistence(child.props.component),
          });
        }
        return child;
      })}
    </Switch>
  );
};

export default RoutePersistenceSwitch;