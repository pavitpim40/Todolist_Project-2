import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ConfigRoutes from '../../config/routes';

function PrivateRoutes(props) {
    const role = props.role || "guest" ;
    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoutes = ConfigRoutes[role].redirectRoutes;
    return (
        <div>
            <Switch>
                {allowedRoutes.map(route => (
                <Route 
                path = { route.url }
                key = { route.url }
                exact
                component={route.component}
                ><route.component setRole={props.setRole}/>
                    </Route>)
                )}
                <Redirect to={redirectRoutes}/>
            </Switch>
        </div>
    )
}

export default PrivateRoutes
