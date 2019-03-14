import React from 'react';
import rd3 from 'react-d3-library';
import { Redirect, Link } from 'react-router-dom';
import d3Viz from 'd3Party';
import _ from 'lodash';

import ReactDOM from 'react-dom';
import Legend from './Legend';
import PoliticianCard from './PoliticianCard';
import SearchBox from './SearchBox';
import { config } from '../utils';

import './shared/typography.css'
import * as partyStyle from './party.css'

import * as utils from '../utils';
import randomInt from 'random-int';

const RD3Component = rd3.Component;

import allCandidates from '../candidates';

const selectOptions = config.availableParties
  .map(a => {
    return {
      value: a,
      label: a
    }
  })

class Party extends React.Component {

  constructor(props) {
    super(props);
    this.state = { d3: '', newPath: null, params: props.params, searchValue: '' }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.randomPolitician = this.randomPolitician.bind(this);
    this.randomOrg = this.randomOrg.bind(this);
  }

  componentDidMount() {
    const opt = selectOptions.filter(p => p.value === this.props.params.partyName);
    this.renderParty(opt[0]);
    console.log('mouttt')
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown(e) {
    if (e.key === 'p') {
      this.randomPolitician();
    } else if (e.key === 'o') {
      this.randomOrg();
    } else if (e.key === 'Escape') {
      this.props.history.push(`/p/${this.props.params.partyName}`)
    }
  }

  randomPolitician(){
      const dataPols = this.state.dataPolsWithBusiness
      const p = dataPols[randomInt(dataPols.length)]
      this.props.history.push(`/p/${this.props.params.partyName}/person/${p.name}`)
  }

  randomOrg(){
      const orgs = this.state.dataOrgs;
      const o = orgs[randomInt(orgs.length)]
      this.props.history.push(`/p/${this.props.params.partyName}/org/${o._id}`)
  }

  renderParty(o) {
    const partyName = o.value;
    let self = this;

    fetch(`//${process.env.publicPath}/assets/data/${partyName}.csv.json`)
      .then(response => response.json())
      .then(data => {
        const politicians = data.map(p => {
          p['EventID'] = p['name']
          p['Count'] = 1
          p['Type'] = 'politician'
          return p
        })

        const orgs = data.map(p => {
          return p.relatedTo.map(o => {
            const cpm = parseFloat(o['cpm'].replace(/,/g, ''))
            o['EventID'] = p['name']
            o['Count'] = utils.discretizeCPM(cpm)
            o['Type'] = 'org'
            o['cpm'] = cpm 
            o['colorScale'] = cpm  //TODO: change this to project budget
            return o;
          });
        })
          .flat()

        const d3Data = {
          'name': partyName,
          'maxRelatedTo': Math.max(...politicians.map(p => p.relatedTo.length)),
          'maxMoney': Math.max(...orgs.map(o => o.colorScale)),
          'children': [{
            Count: 50,
            Type: 'logo'
          }]
            .concat(politicians)
            .concat(orgs)
        }

        const topPoliticians = politicians.slice().sort((a, b) => b.relatedTo.length - a.relatedTo.length)
          .slice(0, 5)

        const dd = d3Viz(d3Data, this.props)
        self.setState({
          selectedOption: o,
          partyName: partyName,
          dataPols: politicians,
          dataPolsWithBusiness: politicians.filter(p => p.relatedTo.length > 0),
          dataOrgs: orgs,
          d3Data: d3Data,
          d3Obj: dd.containerNode,
          d3HighlightForEvent: dd.highlightForEvent,
          totalCPMinM: orgs.map(o => o.cpm)
            .reduce((a, b) => a + b, 0) / 1000000,
          totalPoliticians: politicians.length,
          totalPoliticiansInvoledWithBusiness: politicians.filter(p => p.relatedTo.length > 0).length,
          topList: topPoliticians
        })
      })
  }

  render() {
    const selectedOption = this.state.selectedOption;
    if (this.state.newPath) {
      return <Redirect to={'/r/p-' + this.state.newPath} />
    }

    let selectedObject = null;
    if (this.state.dataPols && this.state.dataOrgs) {
      if (this.props.params.personName) {
        selectedObject = this.state.dataPols.find(p => p.name === this.props.params.personName)
      } else if (this.props.params.orgID) {
        selectedObject = this.state.dataOrgs.find(o => o._id == this.props.params.orgID)
      }

      if (selectedObject) {
        const bbBox = ReactDOM.findDOMNode(this.d3Dom)
          .getBoundingClientRect();
        this.state.d3HighlightForEvent(selectedObject.EventID, bbBox, selectedObject.JP_TNAME);
      } else {
        this.state.d3HighlightForEvent(null);
      }
    }

    return (
      <div className={partyStyle.party}>
        <div className={partyStyle.descBox}>
          <div>
            <h2>
              ประวัติเกี่ยวข้องกับธุรกิจของผู้สมัคร ส.ส. พรรค
            </h2>
            <h1 className={partyStyle.title}>{this.props.params.partyName}</h1>

          <div className={partyStyle.toolBarContainer}>
            <SearchBox politicians={this.state.dataPols} history={this.props.history} partyName={this.props.params.partyName}/>

            <div className={partyStyle.legendSection}>
              <div>
                <b>หรือ</b>
                <span className={partyStyle.button} onClick={this.randomPolitician}>สุ่มเลือก</span>
                จาก ส.ส. ในพรรคเดียวกัน
              </div>
              <div className={partyStyle.buttonContainer}>
              </div>
            </div>
          </div>
          </div>

          {!this.props.params.personName &&
            !this.props.params.orgID &&
            this.state.d3Data &&
            <div>
              <div className={partyStyle.description}>
                <div className={partyStyle.descDetails}>
                  มี ผู้สมัคร ส.ส.​ แบ่งเขต จำนวน <b>{this.state.totalPoliticiansInvoledWithBusiness}</b> จาก <b>{this.state.totalPoliticians}</b> คน
                  เป็นหรือเคยเป็นกรรมการนิติบุคคล
                  ซึ่งมีทุนจดทะเบียนรวมทั้งสิ้น <b>{Math.round(this.state.totalCPMinM)}</b> ล้านบาท โดย ผู้สมัครฯ ที่เกี่ยวข้องกับธุรกิจมากที่สุด คือ
                  {this.state.topList && <ul className={partyStyle.topListUL}>
                    {
                      this.state.topList.map((p, idx) => {
                        return <li>
                          <div>
                            {idx + 1}. <Link to={`/p/${this.props.params.partyName}/person/${p.name}`}>{p.name}</Link> ({p.relatedTo.length} นิติบุคคล)
                          </div>
                        </li>
                      })
                    }
                  </ul>
                  }
                </div>
              </div>
            </div>
          }
          {this.props.params.personName && selectedObject &&
            <PoliticianCard politician={selectedObject} partyName={this.props.params.partyName}/>
          }
          {this.props.params.orgID && selectedObject &&
            <div className={partyStyle.orgContainer}>
              <h2 className={partyStyle.orgHeader}>{selectedObject.JP_TNAME}</h2>
              <h4 className={partyStyle.orgSubHeader}>เกี่ยวข้องกับ <Link to={`/p/${this.props.params.partyName}/person/${selectedObject.EventID}`}>{selectedObject.EventID}</Link></h4>

              <div>ประเภท: <b>{selectedObject.jptn}</b></div>

              <div className={partyStyle.orgDetails}>
                มีวัตถุประสงค์เพื่อ {selectedObject.OBJ_TNAME} โดยจดทะเบียนด้วยทุน {selectedObject.cpm / Math.pow(10, 6)} ล้านบาท
                ด้วยเลขที่นิติบุคคล {this.props.params.orgID} ณ ขณะนี้ สถานะคือ {selectedObject.stn}
              </div>

              <div className={partyStyle.orgFooter}>
                <div className="FooterLink">
                  <a href={config.url.credenBusinessPage.replace(/<ID>/, selectedObject._id)} target="_blank">ค้นหาเพิ่มเติมใน Creden.co</a>
                </div>
                <Link className="FooterLink" to={`/p/${this.props.params.partyName}`}>ปิดหน้าต่างนี้</Link>
              </div>
            </div>
          }
        </div>

        <div className={partyStyle.d3Container}>
          <RD3Component data={this.state.d3Obj} ref={(dom) => { this.d3Dom = dom }} />
        </div>
        <Legend/>
        <div className={partyStyle.clear}></div>
      </div>
    )
  }
}

export default Party