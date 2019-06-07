import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app';
import Navbar from './Components/Navbar';
import Home from './Views/Home';
import Admin from './Components/Admin';
import SingleBlog from './Components/SingleBlog';
import NewBlog from './Components/NewBlog';
import Login from './Components/passProtected/Login';
import Register from './Components/Register';

const App: React.SFC<IAppProps> = props => {


    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/newblog" component={NewBlog}></Route>
                    <Route exact path="/admin/:id" component={Admin}></Route>
                    <Route exact path="/blog/:id" component={SingleBlog}></Route>
                    <Route exact path="/register" component={Register}></Route>
                </Switch>
            </Router>
        </>
    )

}

interface IAppProps {

}

export default App;