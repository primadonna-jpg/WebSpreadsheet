import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { SpreadsheetData,Row, Cell, Sheet } from '../interfaces/spreadsheet';
import { SpreadsheetService } from '../services/spreadsheet.service';
import Handsontable from 'handsontable/base';
import { HotTableRegisterer } from '@handsontable/angular';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'handsontable/helpers/dom';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements AfterViewInit {
  constructor(private spreadsheetService:SpreadsheetService, private route:ActivatedRoute){};
 
  spreadsheetId!:number;
  spreadsheetData:SpreadsheetData|null = null;
  activeSheetIndex: number = 0;
  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.spreadsheetId = +params['id']; // 'id'  nazwa parametru zdefiniowana w routerLink
    });
    if(this.spreadsheetId !== null){
      this.getSpreadsheet(this.spreadsheetId);
    }
    
  }
  
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
 
  addSheet(){
    if(this.spreadsheetData){
      let emtpyData:any=[];
      for(let i=0;i<20;i++){
        let rowData:any=[];
        for(let j=0;j<20;j++){
          rowData.push('');
        }
        emtpyData.push(rowData);
      }
      const sheetOrder = this.spreadsheetData.sheets.length + 1;
      const emptySheet:Sheet = {name:`sheet${sheetOrder}`, sheetData:emtpyData};
      this.spreadsheetData.sheets.push(emptySheet);
    }
  }
  
  loadSheetData(data:any) {
    this.hotRegisterer.getInstance(this.id).loadData(data);
  }
  switchSheet(sheetIndex:number){

    console.log(sheetIndex);
    this.activeSheetIndex = sheetIndex;
    this.loadSheetData(this.spreadsheetData?.sheets[this.activeSheetIndex].sheetData);
  }
  // saveSheetData(){
  //   const instance = this.hotRegisterer.getInstance(this.id);
  //   const newData = instance.getData();
  //   if (instance){

  //     if(this.spreadsheetData?.sheets){
  //       if(this.activeSheetIndex<this.spreadsheetData.sheets.length){
  //         this.spreadsheetData.sheets[this.activeSheetIndex].sheetData = newData;
  //         console.log(this.spreadsheetData.sheets);
  //       }
  //     }
  //   }

  // }

  getSpreadsheet(id:number){
    
    this.spreadsheetService.getSpreadsheet(id).subscribe(
      response=>{
        const receivedSpreadsheet = response.spreadsheet;
        const sheetsList = [];
        
        for ( const sheet of receivedSpreadsheet.sheets){
          const dataArray :any[][]= [];
          for(const row of sheet.rows){
            const rowData:any[]=[];
            for(const cell of row.cells){
              rowData.push(cell.content);
            }
            dataArray.push(rowData);
          }
          const sheetObj:Sheet = {name:sheet.name ,sheetData:dataArray};
          sheetsList.push(sheetObj);
        }
        this.spreadsheetData = { spreadsheet_name: receivedSpreadsheet.name, sheets: sheetsList }
        
        if (this.spreadsheetData.sheets.length > 0){
          //this.createInstances();
          this.loadSheetData(this.spreadsheetData.sheets[this.activeSheetIndex].sheetData);
        }
      },
      error=>{
        console.error(error.error);
      }
    );
  }
  //////////////CONTEXT-MENU/////////////////
  contextMenuVisible: boolean = false;

  
  showContextMenu(event: MouseEvent, sheetIndex:number) {
    this.switchSheet(sheetIndex);
    event.preventDefault(); // Zapobiega domyślnemu menu kontekstowemu przeglądarki
    this.contextMenuVisible = true;

    const contextMenu = document.querySelector('.context-menu') as HTMLElement;
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';
  }

  hideContextMenu() {
    this.contextMenuVisible = false;
  }

  deleteSheet() {
    if(this.activeSheetIndex !==-1 && this.spreadsheetData!==null){
      this.spreadsheetData.sheets.splice(this.activeSheetIndex,1);
    }
    console.log('usuwanie');
    this.contextMenuVisible = false;
  }


  ////////////LISTA SHEETS/////////////////
  // constructor(private spreadsheetService:SpreadsheetService, private route:ActivatedRoute){
  //   this.hotContainer = new ElementRef(null);
  // };
// @ViewChild('hotContainer', { read: ElementRef }) hotContainer: ElementRef;
// hotInstances: Handsontable[] = [];
// createInstances() {
//   if(this.hotContainer){
//     if (this.spreadsheetData) {
//       this.spreadsheetData.sheets.forEach((sheet, index) => {
//         const instanceId = `hotInstance${index + 1}`;
//         const container = document.createElement('div');
//         container.id = instanceId;
//         this.hotContainer.nativeElement.appendChild(container);

//         const instanceSettings = { ...this.hotSettings };
//         instanceSettings.data = sheet.sheetData;

//         const instance = new Handsontable(container, instanceSettings);
//         this.hotInstances.push(instance);
//       });
//     }
//   }
// }

// allData: any[][] = [];
// saveData() {
//   // Czyszczenie tablicy allData przed każdym zapisem
//   this.allData = [];

//   // Pobierz dane z wszystkich instancji Handsontable
//   this.hotInstances.forEach(instance => {
//     const data = instance.getData();
//     this.allData.push(data);
//   });

  
//   console.log('Saved data from all instances:', this.allData);
// }
//////////////////////////////////////////////////////////////////////////////////

    
    // convertSheetDataToArray(sheetData: SheetData): any[][] {
    //   const dataArray: any[][] = [];
    
    //   sheetData.rows.forEach((row) => {
    //     const rowData: any[] = [];
    
    //     row.cells.forEach((cell) => {
    //       rowData.push(cell.content);
    //     });
    
    //     dataArray.push(rowData);
    //   });
    
    //   return dataArray;
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
  


  createSpreadsheet(){
    if(this.spreadsheetData){
      this.spreadsheetService.createSpreadsheet(this.spreadsheetData).subscribe(
        response =>{
          console.log('created spreadsheet');
        },
        error =>{
          console.error(error.error);
        }
      )
    }
    
  }
  


  updateSpreadsheet(){
    if (this.spreadsheetData && this.spreadsheetId){

      this.spreadsheetService.updateSpreadsheet(this.spreadsheetData,this.spreadsheetId).subscribe(
        response=>{
          console.log('updated');
        },
        error=>{
          console.error(error.error);
        }
      );
    }
  }
  


}