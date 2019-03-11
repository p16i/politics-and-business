import React from 'react';
import rd3 from 'react-d3-library';

import { Redirect, Link } from 'react-router-dom';
import d3Viz from 'd3Party';
import { config } from '../utils';
import _ from 'lodash';

import Select from 'react-select';

const RD3Component = rd3.Component;
const bColorScheme = config.colorSchemes.businessType;

import * as partyStyle from './party.css'

import * as icons from './shared/icons.css';
import * as colors from './shared/colors.css';
import * as utils from '../utils';

const selectOptions = config.availableParties
  .map( a => {
    return {
      value: a,
      label: a
    }
  })

const customSelectStyle = {}

class Party extends React.Component {

  constructor(props) {
    super(props);
    this.state = { d3: '', newPath: null, params: props.params }

    console.log(props.params)
    
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleBubbleClick = this.handleBubbleClick.bind(this);
  }

  componentDidMount() {
    console.log('mouttt');
    const opt = selectOptions.filter(p => p.value === this.props.params.partyName);
    this.renderParty(opt[0]);
  }

  handleBubbleClick(e) {
    this.setState({
      params: e
    })
  }

  handleSelectChange(o) {
    const newPath=`${o.value}`;
    this.setState({
      oldPath: this.state.selectedOption.value,
      newPath: newPath
    })
  }

  renderParty(o){
    const partyName = o.value;
    let self = this;

    fetch(`//${process.env.publicPath}/assets/data/${partyName}.csv.json`)
    .then(response => response.json())
    .then(data => {
      const politicians = data.map( p => {
        p['EventID'] = p['name']
        p['Count'] = 1
        p['Type'] = 'politician'
        return p
      })

      const orgs = data.map( p => { 
          return p.relatedTo.map(o => {
            const cpm = parseFloat(o['cpm'].replace(/,/g,''))
            o['EventID'] = p['name']
            o['Count'] = utils.discretizeCPM(cpm)
            o['Type'] = 'org'
            o['cpm'] = cpm
            return o;
          });
        })
        .flat()

      const d3Data = {
        'name': partyName,
        'children': [{
            Count: 50,
            Type: 'logo'
          }]
          .concat(politicians)
          .concat(orgs)
      }

      const topPoliticians = politicians.slice().sort((a, b) =>  b.relatedTo.length - a.relatedTo.length)
          .slice(0, 5)

      const dd = d3Viz(d3Data, this.props)
      self.setState({
        selectedOption: o,
        partyName: partyName,
        dataPols: politicians,
        dataOrgs: orgs,
        d3Data: d3Data,
        d3Obj: dd.containerNode,
        d3HighlightForEvent: dd.highlightForEvent,
        totalCPMinM: orgs.map( o => o.cpm )
          .reduce( (a, b) => a + b, 0 )  / 1000000,
        totalPoliticians: politicians.length,
        totalPoliticiansInvoledWithBusiness: politicians.filter( p => p.relatedTo.length > 0 ).length,
        topList: topPoliticians
      })
    })
  }

  render() {
    const selectedOption = this.state.selectedOption;
    if(this.state.newPath){
      return <Redirect to={'/r/p-' + this.state.newPath}/>
    }

    let selectedObject = null;
    if(this.state.dataPols && this.state.dataOrgs){
      if(this.props.params.personName){
        selectedObject = this.state.dataPols.find(p => p.name === this.props.params.personName)
      } else if (this.props.params.orgID){
        selectedObject = this.state.dataOrgs.find(o => o._id == this.props.params.orgID)
      }

      if(selectedObject){
        this.state.d3HighlightForEvent(selectedObject.EventID);
      }
    }

    return (
      <div className={ partyStyle.party }>
        <div className={ partyStyle.descBox }>
          <h2 className={ partyStyle.title }>
            ข้อมูลรายละเอียดส.ส.ของพรรคการเมืองที่มีประวัติเกี่ยวข้องกับธุรกิจ
          </h2>
          <Select
            value={selectedOption}
            onChange={this.handleSelectChange}
            options={selectOptions}
            styles={customSelectStyle}
          />
          { !this.props.params.personName &&
            !this.props.params.orgID &&
            <div>

              <div className={ partyStyle.description }>
                <div>
                  มี ส.ส.​ จำนวน <b>{this.state.totalPoliticiansInvoledWithBusiness}</b> จาก <b>{this.state.totalPoliticians}</b> คน <br/>
                  เป็นหรือเคยเป็นกรรมการบริษัท <br/>
                  ซึ่งรวมทุนจดทะเบียนทั้งสิ้น <b>฿{Math.round(this.state.totalCPMinM)}M</b>
                </div>
                <div className={ partyStyle.topListContainer }>
                  { this.state.topList &&
                    <span>
                      <b>{this.state.topList.length} ส.ส. ที่เกี่ยวข้องกับธุรกิจมากที่สุด</b>
                      <ul className={ partyStyle.topListUL }>
                        {
                          this.state.topList.map( (p, idx) => {
                            return <li>
                              <div>
                                {idx+1}. <Link to={`/p/${this.props.params.partyName}/person/${p.name}`}>{p.name}</Link> ({p.relatedTo.length} นิติบุคคล)
                              </div>
                            </li>
                          })
                        }
                      </ul>
                    </span>
                  }
                </div>
              </div> 
            </div>
          }
          { this.props.params.personName &&
            <div>
              <h1>{this.props.params.personName}</h1>
              <img src="http://autonomous.mesimcc.org/img/testimonial.png"/>
              <h3>เกี่ยวข้องกับ {selectedObject.relatedTo.length} นิติบุคคล</h3>
              <div>
                รวมทุนจดทะเบียนทั้งหมด {selectedObject.relatedTo.map(o => o.cpm)
                .reduce((a, b) => a+b, 0)/Math.pow(10, 6)} ล้านบาท
              </div>
              <div>
                <a href={config.url.credenPersonSearch.replace(/<name>/, this.props.params.personName)} target="_blank">ดูรายละเอียดเพิ่มเติมจาก creden.co</a>
              </div>
              <Link to={`/p/${this.props.params.partyName}`}>Close</Link>
            </div>
          }
          { this.props.params.orgID &&
            <div>
              <h1>{selectedObject.JP_TNAME}</h1>
              <h3>{selectedObject.JP_ENAME}</h3>
              <h4>วัตถุประสงค์{selectedObject.OBJ_TNAME}</h4>
              <div>ทุนจดทะเบียน {selectedObject.cpm / Math.pow(10, 6)} ล้านบาท</div>
              <div>เลขที่นิติบุคคล {this.props.params.orgID}</div>
              <div>สถานะ {selectedObject.stn}</div>
              เกี่ยวข้องกับ {selectedObject.EventID}
              <div>
                <a href={config.url.credenBusinessPage.replace(/<ID>/, selectedObject._id)} target="_blank">ดูรายละเอียดเพิ่มเติมจาก creden.co</a>
              </div>
              <Link to={`/p/${this.props.params.partyName}`}>Close</Link>
            </div>
          }
        </div>

        <div className={ partyStyle.d3Container }>
          <RD3Component data={this.state.d3Obj}/>
        </div>
        <div className={ partyStyle.legendContainer }>
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
            <div><b>สีของนิติบุคคล = กลุ่มธุรกิจด้าน</b></div>
            <div>
              <span className={ partyStyle.legendColorCode }>
                <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[2]}}></i>
                ห้างหุ้นส่วนสามัญนิติบุคค
              </span>
              <span className={ partyStyle.legendColorCode }>
                <i className={ [icons.icon, icons.org].join(' ')} style={{color: bColorScheme[3]}}></i>
                ห้างหุ้นส่วนจำกัด
              </span>
              <span>
                <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[5]}}></i>
                บริษัทจำกัด
              </span>
              <span className={ partyStyle.legendColorCode }>
                <i className={ [icons.icon, icons.org].join(' ') } style={{color: bColorScheme[7]}}></i>
                บริษัทมหาชนจำกัด
              </span>
            </div>
          </div>
          <div className={ partyStyle.legendSection }>
            <div><b>ขนาดทุนจดทะเบียน (หน่วย: บาท)</b></div>
            <div>
              <img src="assets/images/size-legend.png" width="80"/>
            </div>
          </div>
        </div>
        <div className={ partyStyle.clear }></div>
      </div>
    )
  }
}

export default Party