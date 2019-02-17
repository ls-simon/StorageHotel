import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import ReactTable from "react-table";
import {makeOrderLinesData} from './../../handlers/dataHandlers/adminOrderDataHandler'

class CheckBoxTable extends Component {
    
    constructor(props) {
        super(props) 
        let orderLines
        this.props.selectedOrder ? orderLines = this.setOrderLinesAsSelected() : orderLines = []
        this.state = {
            selectAll: -1,
            packed: {},
            orderLines: orderLines
        }
    }
    toggleSelectAll() {
        
        let packedItem = {};
        
        if (this.state.selectAll === 0) {
            this.state.data.forEach(x => {
                packedItem[x.productName] = true;
            });
        }
        
        this.setState({
            packed: packedItem,
            allPacked: this.state.allPacked === 0 ? 1 : 0
        });
    }
    
    getCheckBoxColumn() {
        
        const checkBoxColumn = {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
                console.log("cell original", original);
                
                return (
                    <input
                    type="checkbox"
                    className="checkbox"
                    checked={this.state.packed[original.id] === true}
                    onChange={() => this.toggleRow(original.id)}
                    />
                    );
                },
                Header: x => {
                    return (
                        <input
                        type="checkbox"
                        className="checkbox"
                        checked={this.state.selectAll === 1}
                        ref={input => {
                            if (input) {
                                input.indeterminate = this.state.selectAll === 2;
                            }
                        }}
                        onChange={() => this.toggleSelectAll()}
                        />
                        );
                    }
                }
                return checkBoxColumn;
            }
            
            toggleRow (productName) {
                
                const packedItem = Object.assign({}, this.state.packed);
                console.log(packedItem);
                
                packedItem[productName] = !this.state.packed[productName];
                this.setState({
                    packed: packedItem,
                    selectAll: 2
                });
            }

            setOrderLinesAsSelected() {
                if (this.props.products, this.props.selectedOrder) {
                    console.log(this.props.products, this.props.selectedOrder)
                    let orderLines = makeOrderLinesData(this.props.selectedOrder, this.props.products)
                    return orderLines
                    
                } else {
                    return []
                }
                }
            

            render() {

                    let checkBoxTableColumns = this.props.columns
                    checkBoxTableColumns.push(this.getCheckBoxColumn());
                    
                    return ( 
                        <ReactTable data={this.setOrderLinesAsSelected()}
                        columns={checkBoxTableColumns} 
                        showPagination={false} 
                        className="-striped -highlight"
                        style={{height: "100%"}}
                        />
                        )
                   
               
            }
            }
            
            const mapStateToProps = (state) => {
                return {
                   selectedOrder: state.orderReducer.selectedOrder
                }
            }
            export default connect(mapStateToProps)(CheckBoxTable)