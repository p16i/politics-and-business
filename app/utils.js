const config = {
    d3: {
        diameter: 600,
        circleMaxSize: 50,
        logoRadius: 200,
        politicianSymbolSize: 50,
        padding: 10,
        inactiveOpacity: 0.15,
    },
    colorSchemes: {
        orgColorRange: ['#ED354F', '#920A1D'],
        polColorRange: ['#88CFFA', '#1265FB']
    },
    url: {
        credenBusinessPage: 'https://creden.co/creditscore/business/main.html#/company?id=<ID>&tab=general',
        credenPersonSearch: 'https://creden.co/creditscore/business/main.html#/search?search=<name>',
    }
}

function discretizeCPM(cpm){
    // return 1;
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