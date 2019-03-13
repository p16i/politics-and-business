import React from 'react';


import ReactAutocomplete from 'react-autocomplete';

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
    this.handleSearchSelect = this.handleSearchSelect.bind(this)
    this.state = {
      value: '',
    }
  }

  handleSearchSelect(selectedOption) {
    console.log(`Option selected:`, selectedOption);
    const attrs = selectedOption.split('-')
    this.props.history.push(`/r/p-${attrs[0]}-person-${attrs[1]}`)
    this.setState({value: ''})
  }

  render() {
    return <div>
      <div className={partyStyle.legendContainer}>
        <div className={style.toolBarContainer}>
          <ReactAutocomplete
            items={allCandidates}
            shouldItemRender={(item, input) => {
              if(input.length >=3){
                return item.name.indexOf(input) > -1
              } else{
                return item.province_name == 'ปราจีนบุรี'
              }
            }}
            getItemValue={item => `${item.PartyName}-${item.name}`}
            inputProps={{
              className: style.searchBox,
              placeholder: "ค้นหาจากชื่อ ส.ส.",
              onBlur: () => this.setState({ value: '' })
            }}
            renderItem={(item, highlighted) => 
              <div
                key={item.name}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
              >
                <img className={style.searchPartyImage} src={`https://elect.in.th/candidates/statics/party-logos/${item.PartyName.trim()}.png`}/> {item.name}
              </div>
            }
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={this.handleSearchSelect}
            wrapperStyle={{
              backgroundColor: 'red'
            }}
          />
          <div className={partyStyle.legendSection}>
            <div>
              <b>หรือ</b>
              <span className={style.button} onClick={this.props.randomPolitician}>สุ่มเลือก</span>
              จาก ส.ส. ในพรรคเดียวกัน
            </div>
            <div className={style.buttonContainer}>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  }
}

export default Legend