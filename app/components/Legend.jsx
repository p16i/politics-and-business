import React from 'react';



import { config } from '../utils';

import * as style from './legend.css';
import * as colors from './shared/colors.css';
import * as icons from './shared/icons.css';
import * as partyStyle from './party.css'

import allCandidates from '../candidates';

const bColorScheme = config.colorSchemes.businessType;

class Legend extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <div className={partyStyle.legendContainer}>
        <div><b>คำอธิบาย</b></div>
        <div className={partyStyle.legendSection}>
          <div><b>สัญลักษณ์</b></div>
          <div>
            <div>
              <i className={[icons.icon, icons.politician, colors.others].join(' ')}></i>
              นักการเมือง
            </div>
            <div>
              <i className={[icons.icon, icons.politicianWithBusiness, colors.others].join(' ')}></i>
              นักการเมืองที่มีประวัติด้านกับธุรกิจ
            </div>
            <div>
              <i className={[icons.icon, icons.org, colors.others].join(' ')}></i>
              นิติบุคคล
            </div>
          </div>
        </div>
        <div className={partyStyle.legendSection}>
          <div><b>สีของนิติบุคคล</b></div>
          <div>
            <div className={partyStyle.legendColorCode}>
              <i className={[icons.icon, icons.org].join(' ')} style={{ color: bColorScheme[2] }}></i>
              ห้างหุ้นส่วนสามัญนิติบุคคล
            </div>
            <div className={partyStyle.legendColorCode}>
              <i className={[icons.icon, icons.org].join(' ')} style={{ color: bColorScheme[3] }}></i>
              ห้างหุ้นส่วนจำกัด
            </div>
            <div>
              <i className={[icons.icon, icons.org].join(' ')} style={{ color: bColorScheme[5] }}></i>
              บริษัทจำกัด
            </div>
            <div className={partyStyle.legendColorCode}>
              <i className={[icons.icon, icons.org].join(' ')} style={{ color: bColorScheme[7] }}></i>
              บริษัทมหาชนจำกัด
            </div>
          </div>
        </div>
        <div className={partyStyle.legendSection}>
          <div><b>ขนาดทุนจดทะเบียน</b>
            <img className={partyStyle.legendSymbolSizeImg} src="assets/images/size-legend.png" />
          </div>
        </div>
          <div className={partyStyle.footerContainer}>
            ร่วมพัฒนาโดย <a href="//www.boonmeelab.com/">บุญมีแล็บ</a> & <a href="//pat.chormai.org">ภัทรวัต ช่อไม้</a>
            <span className={partyStyle.footerSeparator}>/</span> 
            ข้อมูลรวบรวมจาก <a target="_blank" href="//creden.co/creditscore/business">
              <b><img src="assets/images/creden.png" /></b>
            </a>
          </div>
      </div>
    </div>
  }
}

export default Legend