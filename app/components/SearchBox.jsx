import React from 'react';

import ReactAutocomplete from 'react-autocomplete';
import * as partyStyle from './party.css'


import Img from 'react-image'

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchValue: '' }
        this.handleSearchSelect = this.handleSearchSelect.bind(this)
    }

    handleSearchSelect(selectedOption) {
        this.props.history.push(`/p/${this.props.partyName}/person/${selectedOption}`)
        this.setState({ searchValue: '' })
    }

    render() {
        return (
            <ReactAutocomplete
                items={this.props.politicians}
                shouldItemRender={(item, input) => {
                    return item.name.indexOf(input) > -1 || item.province_name.indexOf(input) > -1
                }}
                getItemValue={item => item.name}
                inputProps={{
                    className: partyStyle.searchBox,
                    placeholder: "ค้นหาจากชื่อ ส.ส.​ หรือ จังหวัด",
                    onBlur: () => this.setState({ searchValue: '' })
                }}
                renderItem={(item, highlighted) =>
                    <div
                        key={item.name}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                        className={partyStyle.searchDisplayItem}
                    >
                        <div className={partyStyle.searchImageContainer}>
                            <Img src={item.image} className={partyStyle.searchImage} />
                        </div>
                        <div>
                            <b>{item.name}</b> <br/>
                            {item.desc}
                        </div>
                    </div>
                }
                value={this.state.searchValue}
                onChange={e => this.setState({ searchValue: e.target.value })}
                onSelect={this.handleSearchSelect}
                wrapperStyle={{
                    backgroundColor: 'red'
                }}
            />
        )
    }
}

module.exports = SearchBox