import React from 'react';

import Img from 'react-image'

import { Link } from 'react-router-dom';
import { config, moneyFormat } from '../utils';

import * as style from './politiciancard.css'

class PoliticianCard extends React.Component {
    render() {
        const p = this.props.politician;

        let businessDesc = '';

        if (p.relatedTo.length > 0) {
            businessDesc = (<div>มีประวัติเกี่ยวข้องกับธุรกิจ <b>{p.relatedTo.length}</b> แห่ง <br/>
                    ซึ่งมีทุนจดทะเบียนรวมทั้งหมด <b>{moneyFormat(p.relatedTo.map(o => o.cpm)
                    .reduce((a, b) => a + b, 0))}</b>
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
                <h4 className={style.subHeaderContainer}>ผู้สมัคร ส.ส. พรรค {p.PartyName}
                    <div>({p.desc.replace(/[\(\)]/g, '')})</div>
                </h4>

                <div className={style.desc}>{businessDesc}</div>

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
