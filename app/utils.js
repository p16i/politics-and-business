const config = {
    d3: {
        diameter: 550,
        circleMaxSize: 50,
        logoRadius: 200,
        politicianSymbolSize: 50,
        padding: 3,
        inactiveOpacity: 0.15,
    },
    colorSchemes: {
        businessType: {
            2: '#F2E546',
            3: '#E8562B',
            5: '#6F3889',
            7: '#1793CD'
        }
    },
    availableParties: [
        'พลังประชารัฐ',
        'เพื่อไทย',
        'ประชาธิปัตย์',
        'อนาคตใหม่',
        'เพื่อแผ่นดิน',
    ],
    url: {
        credenBusinessPage: 'https://creden.co/creditscore/business/main.html#/company?id=<ID>&tab=general',
        credenPersonSearch: 'https://creden.co/creditscore/business/main.html#/search?search=<name>',
    }
}

function discretizeCPM(cpm){
    cpm = cpm / Math.pow(10, 6)
    if(cpm < 1) {
        return 3
    } else if (cpm < 10){
        return 8
    } else if (cpm >= 10){
        return 15
    }
}

export {discretizeCPM, config}