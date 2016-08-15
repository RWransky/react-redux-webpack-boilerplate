import React, { Component } from 'react';
import { Link } from 'react-router';
import { GithubButton } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a className={styles.github} href="https://github.com/MWransky"
                 target="_blank">
                <i className="fa fa-github"/> View Me on Github
              </a>
            </p>
            <div className={styles.gitbutton}>
              <GithubButton user="MWransky"
                            type="follow"
                            width={220}
                            height={30}
                            count large/>
            </div>
            <p className={styles.humility}>
              An Ahsoka LLC extension.
            </p>
          </div>
        </div>

        <div className="container">
          <div className=".col-md-3"></div>
          <div className=".col-md-7">
            <h3>Welcome</h3>

            <p>
              Observe, Preserve, Conserve. Repeat. is my effort to provide resources to beekeepers that benefit both the industry and the ecology of apiculture.
            </p>

            <p>Thanks for taking the time to check this out.</p>

            <p>~Michael</p>
          </div>
          <div className=".col-md-3"></div>
          
        </div>
      </div>
    );
  }
}
