
import React from 'react';

import { Link } from 'react-router-dom';
import { config } from '../utils';

import Select from 'react-select';
import * as style from './browse.css'

class Party extends React.Component {
    render() {
        return <div className={style.container}>
            <h1>เลือกพรรคที่ต้องการดูข้อมูล</h1>
            <ul className={style.logoContainer}>
                {
                    config.availableParties.map(p => {
                        return <li>
                            <Link to={`/p/${p}`}>
                                <img
                                    className={style.partyLogo}
                                    src={`//elect.in.th/candidates/statics/party-logos/${p}.png`}
                                />
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}
export default Party
