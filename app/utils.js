const config = {
    d3: {
        diameter: 550,
        circleMaxSize: 50,
        logoRadius: 200,
        politicianSymbolSize: 40,
        padding: 3,
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

    ]
}

function discretizeCPM(cpm){
    cpm = cpm / Math.pow(10, 6)
    if(cpm < 1) {
        return 3
    } else if (cpm < 10){
        return 8
    } else if (cpm < 100){
        return 15
    }
}

export {discretizeCPM, config}