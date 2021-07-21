import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import NodesPage from "../pages/admin/nodes/NodesPage";
import GraphOverviewPage from "../pages/admin/graph-overview/GraphOverviewPage";
import RelationshipsPage from "../pages/admin/relationships/RelationshipsPage";
import CompanyStockPricesPage from "../pages/admin/company-stock-prices/CompanyStockPage";
import DefinitionsPage from "../pages/admin/definitions/DefinitionsPage";
import NodesRelationshipsManagement from "../pages/admin/nodes-relationships-management/NodesRelationshipsManagement";
import SignUp from "../pages/auth/signup/SignUp";
import MinimalLayout from "../layout/minimal/Minimal";
import {SIGNIN, SIGNUP} from "../settings/constants";
import SignIn from "../pages/auth/signin/SignIn";
import Demo from "../pages/home/Demo";
import Landing1 from "../pages/home/Landing1";
import Landing2 from "../pages/home/Landing2";
import Landing3 from "../pages/home/Landing3";
import Landing4 from "../pages/home/Landing4";
import Landing5 from "../pages/home/Landing5";
import Landing6 from "../pages/home/Landing6";
import Landing7 from "../pages/home/Landing7";
import Landing8 from "../pages/home/Landing8";
import Landing9 from "../pages/home/Landing9";
import Landing10 from "../pages/home/Landing10";
import Landing11 from "../pages/home/Landing11";
import Landing12 from "../pages/home/Landing12";
import InformationPage from "../pages/admin/information/InformationPage";
import {createBrowserHistory} from "history";

import {Router} from "react-router";
import MainLayout from "../layout/main/MainLayout";
import AddNodeToGraphPage from "../pages/admin/add-node-graph/AddNodeToGraphPage";
import AddRelationshipToGraphPage from "../pages/admin/add-relationship-graph/AddRelationshipToGraphPage";
import DeleteNodeFromGraphPage from "../pages/admin/delete-node-graph/DeleteNodeFromGraphPage";
import DeleteRelationshipFromGraphPage from "../pages/admin/delete-relationship-graph/DeleteRelationhsipFromGraphPage";
import GraphSchemaVisualizationPage from "../pages/admin/graph-schema-visualization/GraphSchemaVisualizationPage";
import NotFound from "../components/Errors/NotFound";
import PrivateRoute from '../components/RouteWithLayout/RouteWithLayout'
import TwittersPage from "../pages/admin/twitter/TwitterPage";
import AddWorkspaceToGraphPage from "../pages/admin/add-workspace-graph/AddWorkspaceToGraphPage";
import AddDataSourceToGraphPage from "../pages/admin/add-datasource-graph/AddDataSourceToGraphPage";
import WorkspacesPage from "../pages/admin/workspaces/WorkspacesPage";
import GraphManagementPage from "../pages/admin/graph-management-manage/GraphManagementPage";
import DataSourcesPage from "../pages/admin/datasources/DataSourcesPage";
const browserHistory = createBrowserHistory();

export default function AppRouteConfig() {

    return (
        <Router history={browserHistory}>
            <Switch>
                <Redirect path="/" exact to="landing3"/>
                <Route path={SIGNIN}>
                    <MinimalLayout>
                        <SignIn/>
                    </MinimalLayout>
                </Route>
                <Route path={SIGNUP}>
                    <MinimalLayout>
                        <SignUp/>
                    </MinimalLayout>
                </Route>
                <Route path="/demos" component={Demo} exact/>
                <Route path="/landing1" component={Landing1}/>
                <Route path="/landing2" component={Landing2}/>
                <Route path="/landing3" component={Landing3}/>
                <Route path="/landing4" component={Landing4}/>
                <Route path="/landing5" component={Landing5}/>
                <Route path="/landing6" component={Landing6}/>
                <Route path="/landing7" component={Landing7}/>
                <Route path="/landing8" component={Landing8}/>
                <Route path="/landing9" component={Landing9}/>
                <Route path="/landing10" component={Landing10}/>
                <Route path="/landing11" component={Landing11}/>
                <Route path="/landing12" component={Landing12}/>


                <PrivateRoute exact={true} path="/admin">
                    <MainLayout>
                        <InformationPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/company-stock-prices">
                    <MainLayout>
                        <CompanyStockPricesPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/definitions">
                    <MainLayout>
                        <DefinitionsPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-management/add-node-graph">
                    <MainLayout>
                        <AddNodeToGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-management/add-relationship-graph">
                    <MainLayout>
                        <AddRelationshipToGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-management/delete-node-graph">
                    <MainLayout>
                        <DeleteNodeFromGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-management/delete-relationship-graph">
                    <MainLayout>
                        <DeleteRelationshipFromGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/nodes">
                    <MainLayout>
                        <NodesPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/nodes-relationships-management">
                    <MainLayout>
                        <NodesRelationshipsManagement/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-overview">
                    <MainLayout>
                        <GraphOverviewPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-schema-visualization">
                    <MainLayout>
                        <GraphSchemaVisualizationPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/relationships">
                    <MainLayout>
                        <RelationshipsPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/tweets">
                    <MainLayout>
                        <TwittersPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-administration/add-workspace">
                    <MainLayout>
                        <AddWorkspaceToGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-administration/add-datasource">
                    <MainLayout>
                        <AddDataSourceToGraphPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-administration/display-workspaces">
                    <MainLayout>
                        <WorkspacesPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-administration/display-datasources">
                    <MainLayout>
                        <DataSourcesPage/>
                    </MainLayout>
                </PrivateRoute>
                <PrivateRoute exact={true} path="/graph-management/graph-backup-delete-import-export">
                    <MainLayout>
                        <GraphManagementPage/>
                    </MainLayout>
                </PrivateRoute>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

