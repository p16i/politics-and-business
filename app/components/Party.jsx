import React from 'react';
import rd3 from 'react-d3-library';

import containerNode from 'd3Party';

const RD3Component = rd3.Component;

import { party, title, descBox, d3Container,
  legendContainer, clear, legendSection, legendColorCode, description
 } from './party.css'

import * as icons from './shared/icons.css';
import * as colors from './shared/colors.css';

class Party extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
  }

  componentDidMount() {
    this.setState({d3: containerNode});
  }

  render() {
    return (
      <div className={ party }>
        <div className={ descBox }>
          <h2 className={ title }>
            นักการเมือง <b>พรรคคนมีบุญ</b>
          </h2>
          <p className={ description }>
          จำนวน x คน <br/>
          เป็นหรือเคยเป็นกรรมการบริษัท <br/>
          ซึ่งรวมทุนจดทะเบียนทั้งสิ้น XX ล้านบาท
          </p>
        </div>
        <div className={ d3Container }>
          <RD3Component data={this.state.d3} />
        </div>
        <div className={ legendContainer }>
          <div><b>คำอธิบาย</b></div>
          <div className={ legendSection }>
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
          <div className={ legendSection }>
            <div><b>สีของนิติบุคคล = กลุ่มธุรกิจด้าน</b></div>
            <div>
              <span className={ legendColorCode }>
                <i className={ [icons.icon, icons.org, colors.energy].join(' ') }></i>
                พลังงาน
              </span>
              <span className={ legendColorCode }>
                <i className={ [icons.icon, icons.org, colors.transportation].join(' ') }></i>
                คมนาคม
              </span>
              <span>
                <i className={ [icons.icon, icons.org, colors.building].join(' ') }></i>
                อสังหาริมทรัพย์
              </span>
              <span className={ legendColorCode }>
                <i className={ [icons.icon, icons.org, colors.others].join(' ') }></i>
                อื่นๆ
              </span>
            </div>
          </div>
          <div className={ legendSection }>
            <div><b>ขนาดทุนจดทะเบียน (หน่วย: บาท)</b></div>
            <div>
              <img src="https://i.imgur.com/xR5hKD6.png" width="80"/>
            </div>
          </div>
        </div>
        <div className={ clear }></div>
      </div>
    )
  }
}

export default Party