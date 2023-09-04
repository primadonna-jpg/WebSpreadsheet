import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { SpreadsheetData,SheetData,Row, Cell } from '../interfaces/spreadsheet';
import { SpreadsheetService } from '../services/spreadsheet.service';
import Handsontable from 'handsontable/base';
import { HotTableRegisterer } from '@handsontable/angular';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements AfterViewInit {
  sheetData!:SheetData;
  ngAfterViewInit() {
    
    this.loadSheetData(this.data);
  }
  
  
  data = [
    ['Mazda', 2001, 2000],
    ['Pegeout', 2010, 5000],
    ['Honda Fit', 2009, 3000],
    ['Honda CRV', 2010, 6000],
  ];
  
  constructor(private spreadsheetService:SpreadsheetService){};
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  
  hotSettings: Handsontable.GridSettings = {
    //data:this.data,
    rowHeaders:true,
    colHeaders:true,
    stretchH: 'all',
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: true,
    manualRowMove: true,
    manualColumnMove: true,
  };

  loadSheetData(data:any) {
    this.hotRegisterer.getInstance(this.id).loadData(data);
  }


/////
  convertSheetDataToArray(sheetData: SheetData): any[][] {
    const dataArray: any[][] = [];
  
    sheetData.rows.forEach((row) => {
      const rowData: any[] = [];
  
      row.cells.forEach((cell) => {
        rowData.push(cell.content);
      });
  
      dataArray.push(rowData);
    });
  
    return dataArray;
  }

//////////////////////////////////////////////////////////////////////////////////

  // getSpreadsheet(assignSpreadsheet:SpreadsheetData,id:number){
  //   const newSpreadsheet:SpreadsheetData = {spreadsheet_name:'',sheets:[]};
  //   this.spreadsheetService.getSpreadsheet(id).subscribe(
  //     response=>{
  //       const recivedData = response.spreadsheet;
  //       console.log(recivedData);
  //       newSpreadsheet.spreadsheet_name = recivedData.name;
  //       for(const sheet of recivedData.sheets){
  //         newSpreadsheet.sheets.push(sheet);
  //         for(let column_order =0;column_order<sheet.columns.length;column_order++){
  //           const column = sheet.columns[column_order];
  //           for(let row_order=0;row_order>column.cells.length;row_order++){
  //             const cell = column.cells[row_order];
  //           }
  //         }
  //       }
  //       this.display(newSpreadsheet);
  //       assignSpreadsheet = newSpreadsheet;
  //     },
  //     error=>{
  //       console.error(error.error);
  //     }
  //   );
  // }
  


  // display(spreadsheet: SpreadsheetData) {
  //   //console.log(spreadsheet.sheets[0].columns[0].cells[0].content);
  //   console.log(`Nazwa arkusza: ${spreadsheet.spreadsheet_name}`);
  //   for (const sheet of spreadsheet.sheets) {
  //     console.log(`- Nazwa sheet: ${sheet.name}`);
  //     for (const column of sheet.columns) {
  //       console.log(`  - Nazwa kolumny: ${column.name}, kolumn order:${column.order}`);
  //       for (const cell of column.cells) {
  //         console.log(`    - Zawartość komórki ${cell.row}): ${cell.content}`);
  //       }
  //     }
  //   }
  // }
  


  // createSpreadsheet(spreadsheetData:SpreadsheetData){
  //   this.spreadsheetService.createSpreadsheet(spreadsheetData).subscribe(
  //     response =>{
  //       console.log('created spreadsheet');
  //     },
  //     error =>{
  //       console.error(error.error);
  //     }
  //   )
  // }
  


  // updateSpreadsheet(spreadsheetData:SpreadsheetData, id:number){
  //   this.spreadsheetService.updateSpreadsheet(spreadsheetData,id).subscribe(
  //     response=>{
  //       console.log('updated');
  //     },
  //     error=>{
  //       console.error(error.error);
  //     }
  //   );
  // }
  


}