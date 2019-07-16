import React, { Component } from 'react';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as fs from "file-saver";

const sortOrder = ['', '', ''];
const search = [];
class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder,
      search,
      tableData: this.props.rowData,
    }
  }



  componentDidMount() {
  }


  generateExcel=()=> {
   
    const data=this.props.rowData.map((x)=>{
      let tmp=[];
      this.props.xLFieldName.map((y)=>{
        tmp.push(x[y]);
        return '';
      });
      return tmp;
    });
    const title = this.props.xLTitle;
    const header = this.props.xLFieldHeader;
    let workbook= new Excel.Workbook();
    let worksheet = workbook.addWorksheet(title);
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    
    titleRow.alignment = { vertical: "middle", horizontal: "center" };
    worksheet.addRow([]);

    worksheet.mergeCells("A1:D2");
    //Blank Row
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" }
      };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center"
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });

    data.forEach((d, ind) => {
      //let row =
       worksheet.addRow(d);
      //let qty = row.getCell(5);
    });
    for (var i = 1; i <= 24; i++) {
      worksheet.getColumn(i).width = 12;
    }

    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(["This is system generated excel sheet."]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFCCFFE5" }
    };
    footerRow.getCell(1).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    footerRow.getCell(1).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    workbook.xlsx.writeBuffer().then(data => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      fs.saveAs(
        blob,
        title +
          "_" +
          new Date()
         // , "dd-MMM-yyyy HH:mm:ss")
           +
          ".xlsx"
      );
    });
  }


  sortByOrder = (value) => {
    let direction;
    const newSortOrder = this.state.sortOrder.map((item, j) => {
      if (j === value) {
        if (this.state.sortOrder[value] === '') { direction = 'asc'; return 'asc'; }
        if (this.state.sortOrder[value] === 'asc') { direction = 'des'; return 'des'; }
        if (this.state.sortOrder[value] === 'des') { direction = 'asc'; return 'asc'; }

      }
      return '';
    });
    this.setState({ sortOrder: newSortOrder });
    let fld = this.props.fieldName[value];
    if (direction === 'asc') { this.state.tableData.sort((a, b) => a[fld].localeCompare(b[fld])); }
    if (direction === 'des') { this.state.tableData.sort((a, b) => b[fld].localeCompare(a[fld])); }
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log('filter:', name, ',value:', value);
    let tmp = this.props.rowData.filter((item => {
      return item[name].toLowerCase().search(
        value.toLowerCase()) !== -1;
    }));
    console.log(tmp);
    this.setState({ tableData: tmp });
  }

  updateIdValue=(id)=>{
    console.log("id:",id);
  }
  render() {
    const { tableHeader,
      //rowData,
      fieldName
    } = this.props;

    return (
      <>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="table-responsive mt-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {
                      tableHeader.map((i, ind) =>
                        <th key={ind} onClick={() => this.sortByOrder(ind)}>
                          {(this.state.sortOrder[ind] === '') ? null : ((this.state.sortOrder[ind] === 'asc') ? <i className="fa fa-sort-up" ></i> : (this.state.sortOrder[ind] === 'des') ? <i className="fa fa-sort-down" ></i> : null)}{i}
                        </th>)
                    }
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {
                      tableHeader.map((x, ind) => (
                        <td className="tbl-srh-row" key={x}>
                          <span className="tbl-srh-icon"><i className="fa fa-search" aria-hidden="true"></i></span><input type="text" onChange={this.handleChange} name={fieldName[ind]}
                            className="form-control" placeholder={x} />
                        </td>))
                    }


                    <td className="tbl-srh-row">{(this.props.xLNeed===true)?<button onClick={this.generateExcel}><i className="fa fa-download"></i></button>:''}</td>

                  </tr>

                  {
                    (this.state.tableData === null) ? null : (this.state.tableData.map((j, idx) =>
                      <tr key={idx} >{
                        fieldName.map((x, ind) =>
                          <td key={ind} >{
                            j[x]
                          }
                          </td>)
                      }
                        <td >
                          {(this.props.editFnNeed===true)?<button type="button"  onClick={() => {this.props.editFn(j.id)}}
                            className="btn btn-rounded btn-icons btn-inverse-warning">
                            <i className={this.props.editFnClass}></i>
                          </button>:null}
                          {(this.props.deleteFnNeed===true)?<button type="button" onClick={() => {this.props.deleteFn(j.id)}}
                            className="btn btn-rounded btn-icons btn-inverse-danger"
                            >
                            <i className={this.props.deleteFnClass}></i>
                          </button>:null}
                                                 
                        </td>
                      </tr>)
                    )
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }





}

export default Datatable;