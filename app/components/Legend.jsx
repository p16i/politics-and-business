import React from 'react';

import { config } from '../utils';

import * as style from './legend.css';
import * as colors from './shared/colors.css';
import * as icons from './shared/icons.css';
import * as partyStyle from './party.css'

const bColorScheme = config.colorSchemes.businessType;

class Legend extends React.Component {

  handleClick(){
    console.log('clikc');
  }

  render() {
      return <div>
      <div className={ partyStyle.legendContainer }>
        <div className={ partyStyle.legendSection }>
          <div>
          <b>สุ่มเลือกจาก</b>
          </div>
          <div className={style.buttonContainer}>
            <div className={style.button} onClick={this.props.randomPolitician}>ส.ส.</div>
            <div className={style.button} onClick={this.props.randomOrg}>นิติบุคคล</div>
          </div>
        </div>
        <div><b>คำอธิบาย</b></div>
        <div className={ partyStyle.legendSection }>
          <div><b>สัญลักษณ์</b></div>
          <div>
            <div>
              <i className={ [icons.icon, icons.politician, colors.others].join(' ') }></i>
              นักการเมือง 
            </div>
            <div>
              <i className={ [icons.icon, icons.politicianWithBusiness, colors.others].join(' ') }></i>
              นักการเมืองที่มีประวัติด้านกับธุรกิจ
            </div>
            <div>
              <i className={ [icons.icon, icons.org, colors.others].join(' ') }></i>
              นิติบุคคล 
            </div>
          </div>
        </div>
        <div className={ partyStyle.legendSection }>
          <div><b>สีของนิติบุคคล</b></div>
          <div>
            <div className={ partyStyle.legendColorCode }>
              <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[2]}}></i>
              ห้างหุ้นส่วนสามัญนิติบุคค
            </div>
            <div className={ partyStyle.legendColorCode }>
              <i className={ [icons.icon, icons.org].join(' ')} style={{color: bColorScheme[3]}}></i>
              ห้างหุ้นส่วนจำกัด
            </div>
            <div>
              <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[5]}}></i>
              บริษัทจำกัด
            </div>
            <div className={ partyStyle.legendColorCode }>
              <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[7]}}></i>
              บริษัทมหาชนจำกัด
            </div>
          </div>
        </div>
        <div className={ partyStyle.legendSection }>
          <div><b>ขนาดทุนจดทะเบียน</b>
            <img className={ partyStyle.legendSymbolSizeImg } src="assets/images/size-legend.png"/>
          </div>
        </div>
      </div>
          </div>
  }
}
export default Legend