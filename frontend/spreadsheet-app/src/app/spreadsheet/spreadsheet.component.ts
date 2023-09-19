import { Component, OnInit, AfterViewInit, ViewChild, } from '@angular/core';
import { SpreadsheetData, Sheet } from '../interfaces/spreadsheet';
import { SpreadsheetService } from '../services/spreadsheet.service';
import Handsontable from 'handsontable/base';
import { HotTableRegisterer } from '@handsontable/angular';
import { ActivatedRoute } from '@angular/router';
import { HyperFormula } from 'hyperformula';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements AfterViewInit,OnInit {
  constructor(private spreadsheetService:SpreadsheetService, private route:ActivatedRoute){};

  spreadsheetId:number|null= null;
  spreadsheetData:SpreadsheetData|null = null;
  activeSheetIndex: number = 0;
  spreadsheetExist:boolean = true;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spreadsheetId = params['id'] ? +params['id'] : null;// 'id'  nazwa parametru zdefiniowana w routerLink
    });
    if(this.spreadsheetId !== null){
      this.getSpreadsheet(this.spreadsheetId);
    }
    else{
      this.spreadsheetExist = false;
      const sheet:Sheet = {name:'sheet1',sheetData:this.emptyData()};
      this.spreadsheetData={spreadsheet_name:'new file', sheets:[sheet]};
    }
    //w oninit ponieważ w afterviewinit zmienianie wartości zmiennej po inicjalizacji komponentu
    // tworzy problemy z cyklem wykrywania zmian
  }
  ngAfterViewInit() {
    if(!this.spreadsheetExist){
      this.loadSheetData(this.spreadsheetData?.sheets[this.activeSheetIndex].sheetData);
    }
   //w AfterViewinit ponieważ instancjia handsontable wcześniej nie istnieje
   //więc nie można jej załadować 
  }

  ///HYPER FORMULA//////
   hyperformulaInstance = HyperFormula.buildEmpty({
     // to use an external HyperFormula instance,
     // initialize it with the `'internal-use-in-handsontable'` license key
     licenseKey: 'internal-use-in-handsontable',
   });
  ///Handsontable instance settings////
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
    // startCols:20,
    // startRows:20,
    formulas: {
      engine: this.hyperformulaInstance,
    },
  };

  
////
  emptyData(){
    let emtpyData:any=[];
    for(let i=0;i<20;i++){
      let rowData:any=[];
      for(let j=0;j<20;j++){
        rowData.push('');
      }
      emtpyData.push(rowData);
    }
    return emtpyData;
  }
  addSheet(){
    if(this.spreadsheetData){
      const data = this.emptyData();
      const sheetOrder = this.spreadsheetData.sheets.length + 1;
      const emptySheet:Sheet = {name:`sheet${sheetOrder}`, sheetData:data};
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
  ////// Editing sheet name//////////////////////

  editedSheetName: string = '';
  isEditingSheetName: boolean = false;

  startEditingSheetName() {
    this.isEditingSheetName = true;
    this.editedSheetName = this.spreadsheetData?.sheets[this.activeSheetIndex]?.name || '';
  }

  stopEditingSheetName() {
    if (this.editedSheetName.trim() !== '' && this.spreadsheetData) {
      this.spreadsheetData.sheets[this.activeSheetIndex].name = this.editedSheetName;
    }
    this.isEditingSheetName = false;
    this.editedSheetName = '';
  }

  ////////////Editing spreadsheet name//////////////
  isEditingName: boolean = false; 

  startEditingName() {
    this.isEditingName = true;
  }

  stopEditingName() {
    this.isEditingName = false;
    
  }
  

  
  ///////////////////


  createSpreadsheet(){
    if(this.spreadsheetData){
      this.spreadsheetService.createSpreadsheet(this.spreadsheetData).subscribe(
        response =>{
          console.log("created spreadsheet id: "+response.spreadsheet_id);
          this.spreadsheetId = response.spreadsheet_id;
          this.spreadsheetExist = true;
          console.log(this.spreadsheetId);
          
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