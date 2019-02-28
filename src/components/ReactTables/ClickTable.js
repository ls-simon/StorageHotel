import React,{Component} from "react"
import ReactTable from 'react-table';
import {connect} from 'react-redux'
import {setItemAsSelectedAction} from './../../redux/actions/tableActions'

class ClickTable extends Component {
    constructor(props) {
        super(props)

        this.state = { selected: null};
    }

  

    render() {
        var {columns, data} = this.props

        
        return(
            <ReactTable
                            data={data} 
                            columns={columns} 
                            showPagination={false} 
                            className="-striped -highlight"
                            getTrProps={(_state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                    
                                    this.setState({selected: rowInfo.index})
                                    this.props.setItemAsSelected(rowInfo.original)
                                    
                                    },
                                    style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                    }
                                }
                                } else {
                                    return {}
                                }
                            }}
                            style={{height: "60vh"}}
                        />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setItemAsSelected: (payload) => dispatch(setItemAsSelectedAction(payload))
    }
}
export default connect(null, mapDispatchToProps)(ClickTable)