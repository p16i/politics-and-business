import React from 'react';

import { withRouter } from 'react-router-dom';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from 'react-share';

import { config } from '../utils';

import * as style from './legend.css';
import * as colors from './shared/colors.css';
import * as icons from './shared/icons.css';

const pColor = config.colorSchemes.polColorRange;
const oColor = config.colorSchemes.orgColorRange;
const shareIconSize = 32;

class Legend extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const shareUrl = `https://${process.env.publicPath}/#/p/${this.props.match.params.partyName}`;

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
              <b>สีอ่อน</b> เกี่ยวข้องน้อย
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.politicianWithBusiness].join(' ')} style={{ color: pColor[1] }}></i>
              <b>สีเข้ม</b> เกี่ยวข้องมาก (10 นิติบุคคล ขึ้นไป)
            </div>
          </div>
        </div>
        <div className={style.legendSection}>
          <div className={style.legendSectionHeader}><b><i className={[icons.icon, icons.orgBlack].join(' ')} />นิติบุคคล</b></div>
          <div className={style.legendSectionDetails}>
            <div><b>สี</b> = จำนวนวงเงินโครงการจัดซื้อจัดจ้างของภาครัฐที่เกี่ยวข้อง<br/>
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.org].join(' ')}></i>
              <b>ไม่มีสี</b> ไม่เคยเกี่ยวข้องกับโครงการใดๆ
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.orgWithProject].join(' ')} style={{ color: oColor[0] }}></i>
              <b>สีอ่อน</b> เกี่ยวข้องน้อย 
            </div>
            <div className={style.legendLabel}>
              <i className={[icons.icon, icons.orgWithProject].join(' ')} style={{ color: oColor[1] }}></i>
              <b>สีเข้ม</b> เกี่ยวข้องมาก (มูลค่า 10 ล้านบาทขึ้นไป) 
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
          {/* ร่วมพัฒนาโดย <a href="//www.boonmeelab.com/">บุญมีแล็บ</a> & <a href="//pat.chormai.org">ภัทรวัต ช่อไม้</a> */}
          {/* <span className={style.footerSeparator}>/</span> */}
          <br/>
          ข้อมูลรวบรวมจาก <a target="_blank" href="//creden.co/creditscore/business">
            <b><img src="assets/images/creden.png" /></b>  
          </a> และ <a target="_blank" href="https://govspending.data.go.th">เว็บภาษีไปไหน?</a>
        </div>
        <div className={style.shareButtonsContainer}>
            <FacebookShareButton url={shareUrl} hashtag="#electinth">
               <FacebookIcon size={shareIconSize} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} hashtags={['electinth', `พรรค${this.props.match.params.partyName}`]}>
               <TwitterIcon size={shareIconSize} round={true}/>
            </TwitterShareButton>
            <LineShareButton title={`ข้อมูลการเกี่ยวของทางธุรกิจของผู้สมัคร ส.ส. พรรค${this.props.match.params.partyName}`} url={shareUrl}>
                <LineIcon size={shareIconSize} round={true}/>
            </LineShareButton>
          </div>
      </div>
    </div>
  }
}

export default withRouter((props) => <Legend {...props}/>)