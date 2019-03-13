import React from 'react';

import './shared/typography.css'

import { Link } from 'react-router-dom';
import { config } from '../utils';

import * as style from './header.css';

class Header extends React.Component {
    render() {
        return <div className={style.headerContainer}>
            <div>
                <img className={style.logo} src="https://elect.in.th/wp-content/uploads/2018/10/site-logo.png"/>
            </div>
            <span className={style.subHeader}>
                In VOTE We TRUST
            </span>
        </div>
    }
}
export default Header
