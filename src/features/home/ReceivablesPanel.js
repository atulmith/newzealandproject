import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Panel} from 'primereact/panel';

import * as actions from './redux/actions';

export class ReceivablesPanel extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
        super();
        this.state = {};
        // this.carservice = new CarService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onInvoiceSelect = this.onInvoiceSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.updateSelectedInvoice=this.updateSelectedInvoice.bind(this);
        this.setDiscountCalc=this.setDiscountCalc.bind(this);
    }
    componentDidMount() {
        this.props.actions.getListOfInvoices();
        var mydata=[{clientname:'1', invoiceId: '2019', invoiceduedate: 'Cadbury', invoiceamount: 'red',discountoffered:0},{clientname:'2', invoiceId: '2018', invoiceduedate: 'Honda', invoiceamount: 'blue'}];
        this.setState({invoices:mydata});
    }

    save() {
      this.props.actions.doSave(this.props.home.invoice,this.newInvoice);
        // let invoices = [...this.state.invoices];
        // if(this.newInvoice)
        //     invoices.push(this.state.invoice);
        // else
        //     invoices[this.findSelectedInvoiceIndex()] = this.state.invoice;

        // this.setState({invoices:invoices, selectedInvoice:null, invoice: null, displayDialog:false});
    }

    delete() {
      this.props.actions.doDelete();
        // let index = this.findSelectedInvoiceIndex();
        // this.setState({
        //     invoices: this.state.invoices.filter((val,i) => i !== index),
        //     selectedInvoice: null,
        //     invoice: null,
        //     displayDialog: false});
    }

    findSelectedInvoiceIndex() {
        // return this.state.invoices.indexOf(this.state.selectedInvoice);
        return this.props.home.invoices.indexOf(this.props.home.selectedInvoice);
    }

    updateSelectedInvoice(param){
        this.setState({discper:0});
        this.props.actions.updateSelectedInvoice(param);
        this.props.actions.findSelectedInvoiceIndex();
    }

    updateProperty(property, value) {
        // let invoice = this.state.invoice;
        // invoice[property] = value;
        // this.setState({invoice: invoice});
        let invoice=this.props.home.invoice;
        invoice[property] = value;
        this.props.actions.updateInvoice(invoice);
    }

    onInvoiceSelect(e){
        this.newInvoice = false;
        // this.setState({
        //     displayDialog:true,
        //     invoice: Object.assign({}, e.data)
        // });
        this.props.actions.doDisplayDialog(true);
        this.props.actions.updateInvoice(Object.assign({}, e.data));
    }

    addNew() {
        this.newInvoice = true;
        // this.setState({
        //     invoice: {clientname:'', invoiceId: '', invoiceduedate: '', invoiceamount: ''},
        //     displayDialog: true
        // });
        var invoice= {clientname:'', invoiceId: '', invoiceduedate: '', invoiceamount: 0,discountoffered:0};
        this.props.actions.doDisplayDialog(true);
        this.props.actions.updateInvoice(invoice);
        
    }

    calculateShowDiscount(){
      if(this.props.home.invoices && this.props.home.invoices.length>0 ){
        let discountablerecv= this.props.home.invoices.reduce((acc,currvalue)=>{
          if(currvalue.discountoffered>0){
            return acc+currvalue.invoiceamount;
          }
          return acc;
        },0);

        let discountoffered= this.props.home.invoices.reduce((acc,currvalue)=>{
          if(currvalue.discountoffered>0){
            return acc+Number(currvalue.discountoffered);
          }
          return acc;
        },0);

        

        return (
          <React.Fragment>
            <div className="p-grid">
              <div className="p-col-4"><h3>Discounted Receivables</h3></div>
              <div className="p-col-8" style={{textAlign:'left'}}> <h3> Discount Offered</h3></div>
              <div className="p-col-4"><h2>${discountablerecv}</h2></div>
              <div className="p-col-8" style={{textAlign:'left'}}><h2>${discountoffered}</h2></div>

            </div>
          </React.Fragment>
        )
      }
      return null;
    }
    
    setDiscountCalc(){

      
      let invobj=this.props.home.invoice;
      if(invobj){
        let invamt=Number(invobj.invoiceamount);
        let discamt=Number(invobj.discountoffered);

        let discper=discamt/invamt;
        this.discper=parseFloat(discper*100).toFixed(1);

        // this.setState({discper:discper});

        return discper;
      }
      
    }
    

  render() {

    // if(this.props.home.)
    let msg=this.calculateShowDiscount();
    
    this.setDiscountCalc();

    let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Receivables Panel!</div>;

    let footer = <div className="p-clearfix" style={{width:'100%'}}>
        <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
    </div>;

    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            
            <Button label="Save" icon="pi pi-check" onClick={this.save}/>
        </div>;
    return (
      <div className="home-receivables-panel">
        <Panel header="Receivables">
        {msg}

         <DataTable value={this.props.home.invoices} paginator={true} rows={15}  header={header} 
                               selectionMode="single" selection={this.props.home.selectedInvoice} onSelectionChange={e => this.updateSelectedInvoice(e.value)}
                               onRowSelect={this.onInvoiceSelect}>
                        <Column field="clientname" header="Client" sortable={true} />
                        <Column field="invoiceId" header="Invoice ID" sortable={true} />
                        <Column field="invoiceduedate" header="Due Date" sortable={true} />
                        <Column field="invoiceamount" header="Amount" sortable={true} />
                        <Column field="discountoffered" header="Discount" sortable={true} />
                    </DataTable>
        </Panel>

                  <Dialog visible={this.props.home.displayDialog} style={{width: '50vw'}} header="Create Offer" modal={true} footer={dialogFooter} onHide={() => this.props.actions.doDisplayDialog(false)}>
                        {
                            this.props.home.invoice && 
                            <React.Fragment>
                            <div className="p-grid" >
                                <div className="p-col-4"><b>Client</b></div>
                                <div className="p-col-4"><b>Invoice ID</b></div>
                                <div className="p-col-4"><b>Due Date</b></div>
                                  <div className="p-col-4"><label> {this.props.home.invoice.clientname} </label></div>
                                <div className="p-col-4"><label>{this.props.home.invoice.invoiceId}</label></div>
                                <div className="p-col-4"><label>{this.props.home.invoice.invoiceduedate}</label></div>

                           </div>
                           <div className="p-grid p-fluid">
                                <div className="p-col-4"><h3>Invoice Amount</h3></div>
                                <div className="p-col-8" style={{textAlign:'left'}}> 
                                  <h3> Discount Amount
                                  </h3>
                                </div>
                                <div className="p-col-4">
                                  <h2>${this.props.home.invoice.invoiceamount}</h2>
                                </div>
                                <div className="p-col-4" style={{textAlign:'left'}}>
                                  <h2>
                                    <InputText id="iddiscountoffered" onChange={(e) => {this.updateProperty('discountoffered', e.target.value)}} value={this.props.home.invoice.discountoffered}/>
                                    <label>{this.discper} % discount </label>
                                    <Button style={{float:'left'}} label="Set Discount" icon="pi pi-plus" onClick={this.setDiscountCalc}/>  
                                  </h2>
                                </div>
                           </div>
                            
                            </React.Fragment>
                        }
                    </Dialog>  
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivablesPanel);
