const config = {
    d3: {
        diameter: 600,
        circleMaxSize: 20,
        logoRadius: 100,
        politicianSymbolSize: 50,
        padding: 10,
        inactiveOpacity: 0.15,
        totalBubbles: 700
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

export {discretizeCPM, isSmallScreen, config}