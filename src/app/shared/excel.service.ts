import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log(worksheet);
     worksheet['A2'].s = {
      fill: {
        patternType: 'none', // none / solid
        fgColor: {rgb: 'FF000000'},
        bgColor: {rgb: 'FFFFFFFF'}
      },
      font: {
        name: 'Times New Roman',
        sz: 16,
        color: {rgb: '#FF000000'},
        bold: true,
        italic: false,
        underline: false
      },
      border: {
        top: {style: 'thin', color: {auto: 1}},
        right: {style: 'thin', color: {auto: 1}},
        bottom: {style: 'thin', color: {auto: 1}},
        left: {style: 'thin', color: {auto: 1}}
      }
    };
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }


  // generateExcel() {
  //   //
  //   // Excel Title, Header, Data
  //   const title = 'Car Sell Report';
  //   const header = ['Year', 'Month', 'Make', 'Model', 'Quantity', 'Pct'];
  //   const data = [
  //     [2007, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10]
  //   ];
  //   // Create workbook and worksheet
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet('Car Data');
  //   // Add Row and formatting
  //   const titleRow = worksheet.addRow([title]);
  //   titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
  //   worksheet.addRow([]);
  //   const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
  //   // Blank Row
  //   worksheet.addRow([]);
  //   // Add Header Row
  //   const headerRow = worksheet.addRow(header);
  //
  //   // Cell Style : Fill and Border
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFFFFF00' },
  //       bgColor: { argb: 'FF0000FF' }
  //     };
  //     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  //   });
  //   // worksheet.addRows(data);
  //   // Add Data and Conditional Formatting
  //   data.forEach(d => {
  //     const row = worksheet.addRow(d);
  //     const qty = row.getCell(5);
  //       let color = 'FF99FF99';
  //       if (+qty.value < 500) {
  //         color = 'FF9999';
  //       }
  //       qty.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: color }
  //       };
  //     }
  //   );
  //   worksheet.getColumn(3).width = 30;
  //   worksheet.getColumn(4).width = 30;
  //   worksheet.addRow([]);
  //   // Footer Row
  //   const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
  //   footerRow.getCell(1).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'FFCCFFE5' }
  //   };
  //   footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  //   // Merge Cells
  //   worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  //   // Generate Excel File with given name
  //   workbook.xlsx.writeBuffer().then((data1) => {
  //     const blob = new Blob([data1], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     fs.saveAs(blob, 'CarData.xlsx');
  //   });
  // }
}
