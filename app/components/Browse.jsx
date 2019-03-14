
import React from 'react';

import { Link } from 'react-router-dom';
import availableParties from '../availableParties';

import Select from 'react-select';
import * as style from './browse.css'

class PartyList extends React.Component {
    render() {
        return <div className={style.container}>
            <h1>เลือกพรรคที่ต้องการดูข้อมูล</h1>
            <ul className={style.logoContainer}>
                {
                    availableParties.map(p => {
                        p = p.trim();
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
export default PartyList