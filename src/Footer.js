import './stylesheets/components.scss';
import React from 'react';

class Footer extends React.Component{

  constructor(){
    super();

  }

  render(){
          return (


<footer className="Site-footer">
  <div className="Footer"><span className="Footer-social">made with ♡ by khalil gharbaoui | source code: <a href="https://github.com/khalilgharbaoui/check-taskmanager-front-end">here</a></span>
    <div className="Footer-credits"><span className="Footer-credit"><img src="http://webtotally.com/codaisseur.png" /></span></div>
  </div>
</footer>
);
}
}

export default Footer;
