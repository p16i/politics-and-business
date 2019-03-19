
import React from 'react';

import { Link } from 'react-router-dom';

import * as style from './browse.css'

import { isSmallScreen, config } from '../utils';

import Select from 'react-select';
import _ from 'lodash';

const parties = config.availableParties;

class Browse extends React.Component {
    render() {
        return (
            <div className={style.background}>
                <div className={style.container}>
                    <h1>ผู้สมัครส.ส.แต่ละพรรค <br /> มีประวัติเกี่ยวข้องกับธุรกิจอะไรบ้าง</h1>
                    <div className={style.selectContainer}>
                        <Select
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