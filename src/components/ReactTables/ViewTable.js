import React, {Component} from "react"
import ReactTable from 'react-table';

class ViewTable extends Component {
    render() {
        
        var {data, columns} = this.props

        return (
            <ReactTable
                data={data} 
                columns={columns} 
                showPagination={false} 
                className="-striped -highlight"
                style={{height: "50vh"}}
                />
        )
    }
}

export default ViewTable