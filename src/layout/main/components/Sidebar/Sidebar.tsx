import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import {drawerWidth} from "../../../../styles/jss/_variables";
import InformationPage from "../../../../pages/admin/information/InformationPage";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CompanyStockPricesPage from "../../../../pages/admin/company-stock-prices/CompanyStockPage";
import DefinitionsPage from "../../../../pages/admin/definitions/DefinitionsPage";
import NodesPage from "../../../../pages/admin/nodes/NodesPage";
import NodesRelationshipsManagement
    from "../../../../pages/admin/nodes-relationships-management/NodesRelationshipsManagement";
import RelationshipsPage from "../../../../pages/admin/relationships/RelationshipsPage";
import GraphOverviewPage from "../../../../pages/admin/graph-overview/GraphOverviewPage";
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PagesIcon from '@material-ui/icons/Pages';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TimelineIcon from '@material-ui/icons/Timeline';
import AddNodeToGraphPage from "../../../../pages/admin/add-node-graph/AddNodeToGraphPage";
import AddRelationshipToGraphPage from "../../../../pages/admin/add-relationship-graph/AddRelationshipToGraphPage";
import DeleteNodeFromGraphPage from "../../../../pages/admin/delete-node-graph/DeleteNodeFromGraphPage";
import DeleteRelationshipFromGraphPage
    from "../../../../pages/admin/delete-relationship-graph/DeleteRelationhsipFromGraphPage";
import GraphSchemaVisualizationPage
    from "../../../../pages/admin/graph-schema-visualization/GraphSchemaVisualizationPage";
import TwitterIcon from "../../../../pages/home/common/icons/TwitterIcon";
import TwittersPage from "../../../../pages/admin/twitter/TwitterPage";
import {MultilineChart} from "@material-ui/icons";
import AddWorkspaceToGraphPage from "../../../../pages/admin/add-workspace-graph/AddWorkspaceToGraphPage";
import AddDataSourceToGraphPage from "../../../../pages/admin/add-datasource-graph/AddDataSourceToGraphPage";
import WorkspacesPage from "../../../../pages/admin/workspaces/WorkspacesPage";
import GraphManagementPage from "../../../../pages/admin/graph-management-manage/GraphManagementPage";
import DataSourcesPage from "../../../../pages/admin/datasources/DataSourcesPage";

// @ts-ignore
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        maxWidth: drawerWidth,
        height: '100%',
        zIndex: theme.zIndex.drawer + 99
    },
    modal: {
        [theme.breakpoints.down('sm')]: {
            top: '56px!important'
        },
        [theme.breakpoints.up('sm')]: {
            top: '64px!important'
        },
        zIndex: 1000
    },
    backdrop: {
        [theme.breakpoints.down('sm')]: {
            top: '56px'
        },
        [theme.breakpoints.up('sm')]: {
            top: '64px'
        }
    }
}));


const Sidebar = ({opened, toggleDrawer, location}: any) => {
    const routes = [
        {
            path: '/admin',
            name: 'Admin',
            type: 'link',
            icon: SupervisedUserCircleIcon,
            component: InformationPage
        },
        {
            path: '/company-stock-prices',
            name: 'Company Stock Prices',
            type: 'link',
            icon: MonetizationOnIcon,
            component: CompanyStockPricesPage
        },
        {
            path: '/definitions',
            name: 'Definitions',
            type: 'link',
            icon: LocalOfferIcon,
            component: DefinitionsPage
        },
        {
            path: '/graph-management',
            name: 'Graph Management',
            type: 'submenu',
            icon: TimelineIcon,
            badge: {
                type: 'primary',
                value: '4'
            },
            children: [
                {
                    path: '/add-node-graph',
                    name: 'Add Node to Graph',
                    component: AddNodeToGraphPage
                },
                {
                    path: '/add-relationship-graph',
                    name: 'Add Relationship to Graph',
                    component: AddRelationshipToGraphPage
                },
                {
                    path: '/delete-node-graph',
                    name: 'Delete Node from Graph',
                    component: DeleteNodeFromGraphPage
                },
                {
                    path: '/delete-relationship-graph',
                    name: 'Delete Relationship from Graph',
                    component: DeleteRelationshipFromGraphPage
                },
                {
                    path: '/graph-backup-delete-import-export',
                    name: 'Backup Delete Export & Import Link',
                    component: GraphManagementPage
                },
            ]
        },
        {
            path: '/graph-overview',
            name: 'Graph Overview',
            type: 'link',
            icon: InsertChartIcon,
            component: GraphOverviewPage
        },
        {
            path: '/graph-schema-visualization',
            name: 'Graph Schema Visualization',
            type: 'link',
            icon: InsertChartIcon,
            component: GraphSchemaVisualizationPage
        },
        {
            path: '/nodes',
            name: 'Nodes',
            type: 'link',
            icon: AccountTreeIcon,
            component: NodesPage
        },
        {
            path: '/nodes-relationships-management',
            name: 'Nodes Relationships Management',
            type: 'link',
            icon: PagesIcon,
            component: NodesRelationshipsManagement
        },
        {
            path: '/relationships',
            name: 'Relationships',
            type: 'link',
            icon: ShuffleIcon,
            component: RelationshipsPage
        },
        {
            path: '/tweets',
            name: 'Tweets',
            type: 'link',
            icon: TwitterIcon,
            component: TwittersPage
        },
        {
            path: '/graph-administration',
            name: 'Graph Administration',
            type: 'submenu',
            icon: MultilineChart,
            children: [
                {
                    path: '/add-workspace',
                    name: 'Add Workspace',
                    component: AddWorkspaceToGraphPage
                },
                {
                    path: '/add-datasource',
                    name: 'Add DataSource',
                    component: AddDataSourceToGraphPage
                },
                {
                    path: '/display-workspaces',
                    name: 'Display Workspaces',
                    component: WorkspacesPage
                },
                {
                    path: '/display-datasources',
                    name: 'Display DataSources',
                    component: DataSourcesPage
                }
            ]
        },

    ];
    const classes = useStyles();
    const [activeRoute, setActiveRoute] = useState(undefined);
    const toggleMenu = index =>
        setActiveRoute(activeRoute === index ? undefined : index);
    const menu = (
        <List component="div">
            {routes.map((route, index) => {
                const isCurrentPath =
                    location.pathname.indexOf(route.path) > -1;
                return (
                    <SidebarItem
                        key={index}
                        index={index}
                        route={route}
                        activeRoute={activeRoute}
                        toggleMenu={toggleMenu}
                        currentPath={isCurrentPath}
                    />
                );
            })}
        </List>
    );

    return (
        <>
            <Hidden smDown>
                <Drawer
                    variant="persistent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open={opened}
                    ModalProps={{
                        keepMounted: false,
                        className: classes.modal,
                        BackdropProps: {
                            className: classes.backdrop
                        },
                        onBackdropClick: toggleDrawer
                    }}
                >
                    {menu}
                </Drawer>
            </Hidden>
            <Hidden mdUp>
                <SwipeableDrawer
                    variant="temporary"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open={opened}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                    disableBackdropTransition={!iOS}
                    ModalProps={{
                        keepMounted: false,
                        className: classes.modal,
                        BackdropProps: {
                            className: classes.backdrop
                        },
                        onBackdropClick: toggleDrawer
                    }}
                >
                    {menu}
                </SwipeableDrawer>
            </Hidden>
        </>
    );
};

Sidebar.prototypes = {
    opened: PropTypes.func,
    toggleDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    openDrawer: PropTypes.func,
};

// @ts-ignore
const SidebarWithRouter = withRouter(Sidebar);

export default withWidth()(SidebarWithRouter);
