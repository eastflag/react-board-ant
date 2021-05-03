import React from 'react';
import './App.less';
import {Layout} from "antd";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import BoardList from "./pages/board-list/BoardList";
import BoardRegister from "./pages/board-register/BoardRegister";
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={BoardList}></Route>
            <Route path="/board-register" component={BoardRegister}></Route>
            <Route path="/board-view/:id" component={BoardView}></Route>
            <Route path="/board-edit/:id" component={BoardEdit}></Route>
          </Switch>
        </BrowserRouter>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
