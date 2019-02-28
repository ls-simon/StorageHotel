import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from "react-router-dom";
import './style.css';
import {Provider} from "react-redux";
import redux from "./redux/Redux";
import EditOrder from './components/pages/Admin/AdminOrders/EditOrder';
import AdminOrder from './components/pages/Admin/AdminOrders/EditOrder';
import EditOrderAddress from './components/pages/Admin/AdminOrders/EditOrderAddress';
import loginMain from "./mainPages/loginMain";
import adminMain from "./mainPages/adminMain";
import userMain from "./mainPages/userMain";
import AdminOrders from "./components/pages/Admin/AdminOrders/AdminOrders";
import AdminProfile from "./components/pages/Admin/AdminProfile/AdminProfile";
import AdminAdd from "./components/pages/Admin/AdminProfile/AdminAdd";
import AdminProfileEdit from "./components/pages/Admin/AdminProfile/AdminProfileEdit";
import AdminStock from "./components/pages/Admin/AdminStock/AdminStock";
import NewWare from "./components/pages/Admin/AdminStock/NewWare";
import Edit from "./components/pages/Admin/AdminStock/Edit";
import AdminUsers from "./components/pages/Admin/AdminUsers/AdminUsers";
import PublisherClient from "./components/pages/User/PublisherClients/PublisherClient";
import PublisherRequestClientChange from "./components/pages/User/PublisherClients/PublisherRequestClientChange";
import UserStock from "./components/pages/User/UserStock/UserStock";
import UserProfile from "./components/pages/User/UserProfile/UserProfile";
import UserProfileEdit from "./components/pages/User/UserProfile/UserProfileEdit";
import Order from "./components/MenuComponents/Orders/OrderSelect";
import UserOrder from "./components/pages/User/UserOrder/UserOrder";
import Pushback from "./components/pages/Admin/AdminUsers/pushback"
import OrderCart from "./components/MenuComponents/Orders/OrderCart";
import CartConfirm from "./components/MenuComponents/Orders/CartConfirm";
import Menues from "./components/Menues/Menues";
import Home from "./mainPages/landingPage";
import CreateUser from "./components/pages/Admin/AdminUsers/CreateUser";
import OrderSuccess from "./components/MenuComponents/Orders/OrderSuccess";
import OrderFailed from "./components/MenuComponents/Orders/OrderFailed";

ReactDOM.render(
    <Provider store={redux}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={loginMain}/>
                
                <Route path="/Home" component={Menues}/>
                <Route exact path="/Home" component={Home}/>

                <Route path="/Admin" component={Menues}/>
                <Route exact path="/Admin/*" component={adminMain}/>
                <Route exact path="/Admin/Orders" component={AdminOrders}/>
                <Route exact path="/Admin/Orders/New" component={Order}/>
                <Route exact path="/Admin/Orders/Edit/" component={EditOrder}/>
                <Route exact path="/Admin/Orders/Edit/OrderAddress/" component={EditOrderAddress}/>
                <Route exact path="/Admin/Order" component={AdminOrder}/>
                <Route exact path="/Admin/Order/Cart" component={OrderCart}/>
                <Route exact path="/Admin/Order/Cart/Confirm" component={CartConfirm}/>
                <Route exact path="/Admin/Order/Success" component={OrderSuccess}/>
                <Route exact path="/Admin/Order/Failed" component={OrderFailed}/>
                <Route exact path="/Admin/Profile" component={AdminProfile}/>
                <Route exact path="/Admin/Profile/AddEmployee" component={AdminAdd}/>
                <Route exact path="/Admin/Profile/Edit/:id" component={AdminProfileEdit}/>
                <Route exact path="/Admin/Stock" component={AdminStock}/>
                <Route exact path="/Admin/Stock/New" component={NewWare}/>
                <Route exact path="/Admin/Stock/Edit/:id" component={Edit}/>
                <Route exact path="/Admin/Users" component={AdminUsers}/>
                <Route exact path="/Admin/Users/Create" component={CreateUser}/>
                <Route exact path="/Admin/Users/Push" component={Pushback}/>


                <Route path="/User" component={Menues}/>
                <Route exact path="/User/*" component={userMain}/>
                <Route exact path="/User/Order" component={UserOrder}/>
                <Route exact path="/User/Order/Select" component={Order}/>
                <Route exact path="/User/Order/Cart" component={OrderCart}/>
                <Route exact path="/User/Order/Cart/Confirm" component={CartConfirm}/>
                <Route exact path="/User/Order/Success" component={OrderSuccess}/>
                <Route exact path="/User/Order/Failed" component={OrderFailed}/>
                <Route exact path="/User/Stock" component={UserStock}/>
                <Route exact path="/User/Profile" component={UserProfile}/>
                <Route exact path="/User/Profile/Edit/" component={UserProfileEdit}/>
                <Route exact path="/User/Clients" component={PublisherClient}/>
                <Route exact path="/User/Clients/Request" component={PublisherRequestClientChange}/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
