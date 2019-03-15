import React from 'react';

import Img from 'react-image'

import { Link } from 'react-router-dom';
import { config } from '../utils';

import * as style from './politiciancard.css'

class PoliticianCard extends React.Component {
    render() {
        const p = this.props.politician;

        let businessDesc = '';

        if (p.relatedTo.length > 0) {
            businessDesc = (<div>เกี่ยวข้องกับ <b>{p.relatedTo.length}</b> นิติบุคคล
                    ซึ่งมีทุนจดทะเบียนรวมทั้งหมด <b>{p.relatedTo.map(o => o.cpm)
                    .reduce((a, b) => a + b, 0) / Math.pow(10, 6)}</b> ล้านบาท
                </div>)
        } else {
            businessDesc = (<div>ไม่มีประวัติทางธุรกิจ</div>)
        }
        return (
            <div className={style.main}>
                <h2 className={style.headerContainer}>
                    <div className={style.imageContainer}>
                        <Img src={p.image} className={style.politicianImage} />
                    </div>
                    <div>{p.name}</div>
                </h2>
                <h4 className={style.subHeaderContainer}>ว่าที่ผู้สมัคร ส.ส. พรรค {p.PartyName}
                    <div>({p.desc.replace(/[\(\)]/g, '')})</div>
                </h4>

                <div>{businessDesc}</div>

                <div className={style.footer}>
                    {p.relatedTo.length > 0 &&
                        <div className="FooterLink">
                            <a href={config.url.credenPersonSearch.replace(/<name>/, p.name)} target="_blank">ค้นหาเพิ่มใน Creden.co</a>
                        </div>
                    }
                    <div className="FooterLink">
                        <Link to={`/p/${p.PartyName}`} title="Hotkey (ESC)">กลับไปหน้าพรรค</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default PoliticianCard
