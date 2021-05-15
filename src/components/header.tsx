import React from "react";
import { Layout, Menu } from "antd"
import { Link, useHistory } from "react-router-dom";
import { ROUTE_CANDIDATES, ROUTE_STATISTICS, ROUTE_VOTE } from "../routes";
const { Header } = Layout;

export function AppHeader() {


  return (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ useHistory().location.pathname  ]}>
                <Menu.Item key={ROUTE_CANDIDATES} ><Link to={ROUTE_CANDIDATES}>Candidates</Link></Menu.Item>
                <Menu.Item key={ROUTE_VOTE} ><Link to={ROUTE_VOTE}>Votes</Link></Menu.Item>
                <Menu.Item key={ROUTE_STATISTICS} ><Link to={ROUTE_STATISTICS}>Statistics</Link></Menu.Item>
            </Menu>
        </Header>
    );
}
