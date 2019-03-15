
import React from 'react';

import { Link } from 'react-router-dom';
import availableParties from '../availableParties';

import Select from 'react-select';
import * as style from './browse.css'

import { isSmallScreen } from '../utils';

class PartyList extends React.Component {
    render() {
        return <div className={style.container}>
            {isSmallScreen() &&
                <div className={style.msgModal}>
                    <div className={style.msgModalBackground}/>
                    <div className={style.msgModalText}>
                        งานชิ้นนี้ เหมาะสำหรับใช้บนจอขนาดใหญ่ <br/>(ขนาดความกว้าง 1280px ขึ้นไป)
                        <br/>
                        <br/>
                        ขออภัยในความไม่สะดวก
                        <br/>
                        <br/>
                         🙇🏻‍🙏🏼🙇🏻‍♀️
                    </div>
                </div>
            }
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