
import React from 'react';

import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search'

import availableParties from '../availableParties';

import * as style from './browse.css'

import { isSmallScreen } from '../utils';

import Select from 'react-select';


const parties = availableParties.map(p => {
    return {
        value: p,
        label: p,
        icon: `//elect.in.th/candidates/statics/party-logos/${p.trim()}.png`
    }
});

class Browse extends React.Component {
    render() {
        return (
            <div className={style.background}>
                <div className={style.container}>
                    {isSmallScreen() &&
                        <div className={style.msgModal}>
                            <div className={style.msgModalBackground} />
                            <div className={style.msgModalText}>
                                งานชิ้นนี้ เหมาะสำหรับใช้บนจอขนาดใหญ่ <br />(ขนาดความกว้าง 1280px ขึ้นไป)
                        <br />
                                <br />
                                ขออภัยในความไม่สะดวก
                        <br />
                                <br />
                                🙇🏻‍🙏🏼🙇🏻‍♀️
                    </div>
                        </div>
                    }
                    <h1>ผู้สมัครส.ส.แต่ละพรรค <br /> มีประวัติเกี่ยวข้องกับธุรกิจอะไรบ้าง</h1>
                    <div className={style.selectContainer}>
                        <Select
                            autoFocus={true}
                            className={style.selectElement}
                            classNamePrefix="react-select"
                            options={parties}
                            placeholder="เลือกพรรค"
                            onChange={(opt) => this.props.history.push(`/p/${opt.value}`)}
                            getOptionLabel={({ icon, label }) => {
                                return (
                                    <div>
                                        <div className={style.partyLogoContainer}>
                                            <img
                                                className={style.partyLogo}
                                                src={icon}
                                            />
                                        </div>
                                        <div className={style.partyName}>{label}</div>
                                    </div>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>)
    }
}
export default Browse