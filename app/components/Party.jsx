import React from 'react';
import rd3 from 'react-d3-library';

import d3Viz from 'd3Party';
import { config } from '../utils';

const RD3Component = rd3.Component;
const bColorScheme = config.colorSchemes.businessType;

import * as partyStyle from './party.css'

import * as icons from './shared/icons.css';
import * as colors from './shared/colors.css';
import * as utils from '../utils';

class Party extends React.Component {

  constructor(props) {
    super(props);
    console.log(config.partyFiles);
    this.state = {d3: ''}
  }

  componentDidMount() {
    this.renderParty('อนาคตใหม่')
  }

  renderParty(partyName){
    let self = this;
    fetch(`//localhost:8080/assets/data/${partyName}.csv.json`)
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
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

        console.log(topPoliticians);

      self.setState({
        partyName: partyName,
        d3Obj: d3Viz(d3Data),
        totalCPMinM: orgs.map( o => o.cpm )
          .reduce( (a, b) => a + b, 0 )  / 1000000,
        totalPoliticians: politicians.length,
        totalPoliticiansInvoledWithBusiness: politicians.filter( p => p.relatedTo.length > 0 ).length,
        topList: topPoliticians
      })
    })
  }

  render() {
    return (
      <div className={ partyStyle.party }>
        <div className={ partyStyle.descBox }>
          <h2 className={ partyStyle.title }>
            พรรค <b>{this.state.partyName}</b>
          </h2>
          <div className={ partyStyle.description }>
            <div>
              มี ส.ส.​ จำนวน {this.state.totalPoliticiansInvoledWithBusiness} จาก {this.state.totalPoliticians} คน <br/>
              เป็นหรือเคยเป็นกรรมการบริษัท <br/>
              ซึ่งรวมทุนจดทะเบียนทั้งสิ้น ฿{this.state.totalCPMinM}M
            </div>
            <div className={ partyStyle.topListContainer }>
              { this.state.topList &&
                <span>
                  <b>{this.state.topList.length} ส.ส. ที่เกี่ยวข้องกับธุรกิจมากที่สุด</b>
                  <ul className={ partyStyle.topListUL }>
                    {
                      this.state.topList.map( (p, idx) => {
                        return <li>
                          <div>{idx+1}. {p.name} ({p.relatedTo.length} นิติบุคคล)</div>
                        </li>
                      })
                    }
                  </ul>
                </span>
              }
            </div>
          </div> 
          <div>
          </div>
        </div>
        <div className={ partyStyle.d3Container }>
          <RD3Component data={this.state.d3Obj} />
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