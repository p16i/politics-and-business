import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import style from './govspendingtutorial.css';

class GovSpendingTutorial extends React.Component {
    render() {
        const orgID = this.props.match.params.orgID;
        return (
            <div className={style.container}>
                <h1>การค้นหานิติบุคคลที่มีส่วนกับโครงการจัดซื้อจัดจ้างภาครัฐ <br/> บนเว็บ ภาษีไปไหน?</h1>
                <ul>
                    <li>
                        <span className={style.emoji}>
                        👉
                        </span>
                        {/* <div className={style.bulletCircle}>1</div> */}
                        คัดลอกเลขนิติบุคคล <b>{orgID}</b>
                        <CopyToClipboard text={orgID}>
                            <div className={style.copyButton}>คัดลอก</div>
                        </CopyToClipboard>
                    </li>
                    <li>
                        <span className={style.emoji}>
                        ✌️
                        </span>
                        เปิดเว็บ  <a href="https://govspending.data.go.th/budget?search=" target="_blank"><b>ภาษีไปไหน?</b></a>
                    </li>
                    <li>
                        <span className={style.emoji}>
                        🤟
                        </span>
                        เปิดการค้นหา <b>ขั้นสูง</b> และ นำเลขนิติบุคคลกรอกในช่อง <b>ผู้ชนะการเสนอราคา</b>
                        <br/>
                        <img src="assets/images/gov-spending-search.png" width="50%"/>
                    </li>
                </ul>
            </div>
        )
    }
}
export default GovSpendingTutorial