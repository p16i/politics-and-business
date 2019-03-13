import React from 'react';

import Img from 'react-image'

import { Link } from 'react-router-dom';
import { config } from '../utils';

import * as style from './politiciancard.css'

class PoliticianCard extends React.Component {
    render() {
        const p = this.props.politician;
        // TODO: partyName from politician object;
        const partyName = this.props.partyName;
        return (
            <div className={style.main}>
                <h1 className={style.headerContainer}>
                    <div className={style.imageContainer}>
                        <Img src={p.image} className={style.politicianImage} />
                    </div>
                    <div>{p.name}</div>
                </h1>
                <h4 className={style.subHeaderContainer}>ว่าที่ผู้สมัคร ส.ส. พรรค {partyName} <img className={style.partyLogo} src={`https://elect.in.th/candidates/statics/party-logos/${partyName}.png`} />
                    <div>({p.province_name} เขต {p.zone_number})</div>
                </h4>
                <div>เกี่ยวข้องกับ <b>{p.relatedTo.length}</b> นิติบุคคล
                    ซึ่งมีทุนจดทะเบียนรวมทั้งหมด <b>{p.relatedTo.map(o => o.cpm)
                        .reduce((a, b) => a + b, 0) / Math.pow(10, 6)}</b> ล้านบาท
                </div>
              <div className={style.footer}>
                <div>
                    <Link to={`/p/${partyName}`}>ค้นหาผู้สมัครจากพรรคเดียวกัน</Link>
                </div>
                <div>
                    <a href={config.url.credenPersonSearch.replace(/<name>/, p.name)} target="_blank">ค้นหาเพิ่มใน Creden.co</a>
                </div>
              </div>
            </div>
        )
    }
}
export default PoliticianCard
