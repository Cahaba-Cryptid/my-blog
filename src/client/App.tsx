import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app';
import Navbar from './Components/Navbar';
import Home from './Views/Home'
import Admin from './Components/Admin';

const App: React.SFC<IAppProps> = props => {


    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    {/* <Route exact path="/newblog" comonent={NewBlog}></Route> */}
                    <Route exact path="/admin/:id" component={Admin}></Route>
                </Switch>
            </Router>

        </>
    )

}

interface IAppProps {

}

export default App;