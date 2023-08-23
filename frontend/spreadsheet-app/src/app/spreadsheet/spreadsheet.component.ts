import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { SpreadsheetData,SheetData,Column,Cell } from '../interfaces/spreadsheet';
import { SpreadsheetService } from '../services/spreadsheet.service';
@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent {
  spreadsheetData!:SpreadsheetData;
  sheetsData!:SheetData[];
  columns!:Column[];
  cells!:Cell[];
  cells2!:Cell[];
  constructor(private spreadsheetService:SpreadsheetService){
    this.cells = [
    {content:'zawartość komórki -kolumna0, wiersz0', row:0}, 
    {content:'zawartość komórki -kolumna0,wiersz1', row:1}
    ];
    this.cells2 = [
      {content:'kolumna1,wiersz0',row:0},
      {content:'kolumna1,wiersz1',row:1}
    ];
    this.columns = [
      {name:'A',cells:this.cells},
      {name:'B',cells:this.cells2}
    ];
    this.sheetsData = [
      {name:'sheet1',columns:this.columns}
    ];
    this.spreadsheetData={spreadsheet_name:'arkusz1',sheets:this.sheetsData};

    this.display(this.spreadsheetData);
    this.createspreadsheet(this.spreadsheetData);
  };

  

  display(spreadsheet: SpreadsheetData) {
    //console.log(spreadsheet.sheets[0].columns[0].cells[0].content);
    console.log(`Nazwa arkusza: ${spreadsheet.spreadsheet_name}`);
    for (const sheet of spreadsheet.sheets) {
      console.log(`- Nazwa arkusza: ${sheet.name}`);
      for (const column of sheet.columns) {
        console.log(`  - Nazwa kolumny: ${column.name}`);
        for (const cell of column.cells) {
          console.log(`    - Zawartość komórki (wiersz ${cell.row}): ${cell.content}`);
        }
      }
    }
  }

  createspreadsheet(spreadsheetData:SpreadsheetData){
    this.spreadsheetService.createSpreadsheet(spreadsheetData).subscribe(
      response =>{
        console.log('created spreadsheet');
      },
      error =>{
        console.error(error.error);
      }
    )
  }
  


}