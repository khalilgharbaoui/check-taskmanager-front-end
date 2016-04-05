import './stylesheets/components.scss';
import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router';
class Navbar extends React.Component{

  constructor(){
    super();

  }

  render(){
          return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link to={"/"} className="navbar-brand"><img className="logo" src="http://s17.postimg.org/6ntnarrfz/Checklogo2.png" /></Link>
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav"> </ul>
                  <ul className="nav navbar-nav navbar-right colo">
                    <li><Link to={"/"}>Log Out</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
     }
}

export default Navbar;
