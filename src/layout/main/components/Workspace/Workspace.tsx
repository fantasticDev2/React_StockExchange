import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import {makeStyles} from '@material-ui/core/styles';
import {drawerWidth} from "../../../../styles/jss/_variables";
import {Redirect, Route, Switch} from "react-router";
import InformationPage from "../../../../pages/admin/information/InformationPage";
import CompanyStockPricesPage from "../../../../pages/admin/company-stock-prices/CompanyStockPage";
import DefinitionsPage from "../../../../pages/admin/definitions/DefinitionsPage";
import NodesRelationshipsManagement
    from "../../../../pages/admin/nodes-relationships-management/NodesRelationshipsManagement";
import RelationshipsPage from "../../../../pages/admin/relationships/RelationshipsPage";
import NodesPage from "../../../../pages/admin/nodes/NodesPage";
import AddNodeToGraphPage from "../../../../pages/admin/add-node-graph/AddNodeToGraphPage";
import AddRelationshipToGraphPage from "../../../../pages/admin/add-relationship-graph/AddRelationshipToGraphPage";
import DeleteNodeFromGraphPage from "../../../../pages/admin/delete-node-graph/DeleteNodeFromGraphPage";
import DeleteRelationshipFromGraphPage
    from "../../../../pages/admin/delete-relationship-graph/DeleteRelationhsipFromGraphPage";
import GraphOverviewPage from "../../../../pages/admin/graph-overview/GraphOverviewPage";
import GraphSchemaVisualizationPage
    from "../../../../pages/admin/graph-schema-visualization/GraphSchemaVisualizationPage";
import TwittersPage from "../../../../pages/admin/twitter/TwitterPage";
import AddWorkspaceToGraphPage from "../../../../pages/admin/add-workspace-graph/AddWorkspaceToGraphPage";
import AddDataSourceToGraphPage from "../../../../pages/admin/add-datasource-graph/AddDataSourceToGraphPage";
import WorkspacesPage from "../../../../pages/admin/workspaces/WorkspacesPage";
import GraphManagementPage from "../../../../pages/admin/graph-management-manage/GraphManagementPage";
import DataSourcesPage from "../../../../pages/admin/datasources/DataSourcesPage";

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.default,
        minWidth: 0,
        width: '100%',
        position: 'relative',
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        '-webkit-overflow-scrolling': 'touch'
    },
    'content-left': {
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth
        }
    },
    'content-right': {
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    'contentShift-left': {
        marginLeft: 0
    },
    'contentShift-right': {
        marginRight: 0
    }
}));

const Workspace = ({opened}) => {
    const classes = useStyles();
    return (
        <main
            className={classNames(classes.content, classes[`content-left`], {
                [classes.contentShift]: opened,
                [classes[`contentShift-left`]]: opened
            })}
        >
            <Switch>
                <Route
                    exact
                    path="/admin"
                    component={InformationPage}
                    name="Admin"
                />
                <Route
                    exact
                    path="/company-stock-prices"
                    component={CompanyStockPricesPage}
                    name="Company Stock Prices"
                />
                <Route
                    exact
                    path="/definitions"
                    component={DefinitionsPage}
                    name="Definitions"
                />
                <Route
                    exact
                    path="/graph-management/add-node-graph"
                    component={AddNodeToGraphPage}
                    name="Add Node To Graph"
                />
                <Route
                    exact
                    path="/graph-management/add-relationship-graph"
                    component={AddRelationshipToGraphPage}
                    name="Add Relationship To Graph"
                />
                <Route
                    exact
                    path="/graph-management/delete-node-graph"
                    component={DeleteNodeFromGraphPage}
                    name="Delete node from graph"
                />
                <Route
                    exact
                    path="/graph-management/delete-relationship-graph"
                    component={DeleteRelationshipFromGraphPage}
                    name="Delete relationship from graph"
                />
                <Route
                    exact
                    path="/nodes"
                    component={NodesPage}
                    name="Nodes"
                />
                <Route
                    exact
                    path="/nodes-relationships-management"
                    component={NodesRelationshipsManagement}
                    name="Nodes Relationships Management"
                />
                <Route
                    exact
                    path="/graph-overview"
                    component={GraphOverviewPage}
                    name="Graph Overview"
                />
                <Route
                    exact
                    path="/graph-schema-visualization"
                    component={GraphSchemaVisualizationPage}
                    name="Graph Schema Visualization"
                />
                <Route
                    exact
                    path="/relationships"
                    component={RelationshipsPage}
                    name="Relationships"
                />
                <Route
                    exact
                    path="/tweets"
                    component={TwittersPage}
                    name="Tweets"
                />
                <Route
                    exact
                    path="/graph-administration/add-workspace"
                    component={AddWorkspaceToGraphPage}
                    name="Create Workspace"
                />
                <Route
                    exact
                    path="/graph-administration/add-datasource"
                    component={AddDataSourceToGraphPage}
                    name="Create DataSource"
                />
                <Route
                    exact
                    path="/graph-administration/display-workspaces"
                    component={WorkspacesPage}
                    name="Display Workspaces"
                />
                <Route
                    exact
                    path="/graph-administration/display-datasources"
                    component={DataSourcesPage}
                    name="Display DataSources"
                />
                <Route
                    exact
                    path="/graph-management/graph-backup-delete-import-export"
                    component={GraphManagementPage}
                    name="Graph Backup Delete Import Export"
                />
                <Redirect to="/admin"/>
            </Switch>
        </main>
    );
};

Workspace.prototypes = {
    children: PropTypes.node.isRequired,
    opened: PropTypes.bool
};

export default Workspace;
