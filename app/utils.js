import availableParties from './availableParties';
import _ from 'lodash';

const config = {
    d3: {
        diameter: 600,
        circleMaxSize: 20,
        logoRadius: 100,
        politicianSymbolSize: 50,
        padding: 10,
        inactiveOpacity: 0.15,
        totalBubbles: 700,
        maxOrgColorScale: 10000000,
        maxPolColorScale: 10,
    },
    colorSchemes: {
        orgColorRange: ['#ED354F', '#920A1D'],
        polColorRange: ['#88CFFA', '#1265FB']
    },
    url: {
        credenBusinessPage: 'https://creden.co/creditscore/business/main.html#/company?id=<ID>&tab=general',
        credenPersonSearch: 'https://creden.co/creditscore/business/main.html#/search?search=<name>',
    },
    availableParties: _.orderBy(availableParties.map(p => {
        return {
            value: p,
            label: p,
            icon: `//elect.in.th/candidates/statics/party-logos/${p.trim()}.png`
        }
    }), ['value'])
}

const totalProjectDesc = (n) => {
    if ( n >= 100 ){
        return 'อย่างน้อย 100'
    } else {
        return n
    }
}

const totalProjectMoneyDec = (n, amount) => {
    if ( n >=100 ) {
        //* todo friendly number */
        return  `อย่างน้อย ${amount}`
    } else {
        console.log('do nothing')
        //* todo friendly number */
        return  amount
    }
}

const projectNumbering = {
    total: totalProjectDesc,
    amount: totalProjectMoneyDec
}

function discretizeCPM(cpm){
    // return 1;
    cpm = cpm / Math.pow(10, 6)
    if(cpm < 1) {
        return 1
    } else if (cpm < 10){
        return 5
    } else if (cpm >= 10){
        return 15
    }
}

function isSmallScreen(){
    return window.innerWidth < 1280;
}

export {discretizeCPM, isSmallScreen, config, projectNumbering}