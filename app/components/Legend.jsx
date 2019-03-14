import React from 'react';



import { config } from '../utils';

import * as style from './legend.css';
import * as colors from './shared/colors.css';
import * as icons from './shared/icons.css';

import allCandidates from '../candidates';

const pColor = config.colorSchemes.polColorRange;
const oColor = config.colorSchemes.orgColorRange;

class Legend extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <div className={style.legendContainer}>
        <div className={style.legendSection}>
          <div className={style.legendSectionHeader}><b>▲ นักการเมือง</b></div>
          <div className={style.legendSectionDetails}>
            <div><b>สี</b> = ประวัติด้านธุรกิจ</div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.politician].join(' ')}></i>
              <b>ไม่มีสี</b> ไม่เกี่ยวข้องกับธุรกิจใดๆ
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.politicianWithBusiness].join(' ')} style={{ color: pColor[0] }}></i>
              <b>สีอ่อน</b> จำนวนธุรกิจที่เกี่ยวข้องน้อย
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.politicianWithBusiness].join(' ')} style={{ color: pColor[1] }}></i>
              <b>สีเข้ม</b> จำนวนธุรกิจที่เกี่ยวข้องมาก
            </div>
          </div>
        </div>
        <div className={style.legendSection}>
          <div className={style.legendSectionHeader}><b><i className={[icons.icon, icons.orgBlack].join(' ')} />นิติบุคคล</b></div>
          <div className={style.legendSectionDetails}>
            <div><b>สี</b> = จำนวนโครงการรัฐฯ ที่เกี่ยวข้อง</div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.org].join(' ')}></i>
              <b>ไม่มีสี</b> ไม่เคยเกี่ยวข้องกับโครงการรัฐฯ
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.orgWithProject].join(' ')} style={{ color: oColor[0] }}></i>
              <b>สีอ่อน</b> เกี่ยวข้องน้อย
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.orgWithProject].join(' ')} style={{ color: oColor[1] }}></i>
              <b>สีเข้ม</b> เกี่ยวข้องมาก
            </div>
          </div>
        </div>
        <div className={style.legendSection}>
          <div className={style.legendSectionHeader}><b>ขนาด</b> = ทุนจดทะเบียน</div>
          <div className={style.legendSymbolSizeContainer}>
            <img className={style.legendSymbolSizeImg} src="assets/images/size-legend.png" />
          </div>
        </div>
        <div className={style.footerContainer}>
          ร่วมพัฒนาโดย <a href="//www.boonmeelab.com/">บุญมีแล็บ</a> & <a href="//pat.chormai.org">ภัทรวัต ช่อไม้</a>
          {/* <span className={style.footerSeparator}>/</span> */}
          <br/>
          ข้อมูลรวบรวมจาก <a target="_blank" href="//creden.co/creditscore/business">
            <b><img src="assets/images/creden.png" /></b>  
          </a> และ <a target="_blank" href="https://govspending.data.go.th">ภาษีไปไหน?</a>
        </div>
      </div>
    </div>
  }
}

export default Legend