import React from 'react';
import  './main.scss';
import Listurls from '../Listurls/Listurls';


export default class Main extends React.Component<{}> {

  render() {
    return (
      <div className="main">
        <div className="header">
          <span>Acme Co.</span>
        </div>
        <div className="content">
          <div className="theater">
            <Listurls />
          </div>
        </div>
      </div>
    );
  }
}

