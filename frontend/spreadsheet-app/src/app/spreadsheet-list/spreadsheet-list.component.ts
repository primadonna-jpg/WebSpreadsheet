import { Component, OnInit } from '@angular/core';

import { SpreadsheetService } from '../services/spreadsheet.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-spreadsheet-list',
  templateUrl: './spreadsheet-list.component.html',
  styleUrls: ['./spreadsheet-list.component.css']
})
export class SpreadsheetListComponent implements OnInit{
  spreadsheets: any[] = [];
  constructor(private spreadsheetService:SpreadsheetService, private alertService:AlertService){}
  ngOnInit(): void {
    this.loadSpreadsheets();
  }
  loadSpreadsheets(){
    this.spreadsheetService.spreadsheetList().subscribe(
      response =>{
        this.spreadsheets = response.spreadsheets ;
      },
      error=>{
        this.alertService.setMessage(error.error.error);
        console.error('Błąd podczas pobierania arkuszy:', error);
      }
    );
  }

  deleteSpreadsheet(id:number){
    const confirmed = window.confirm('Are you sure to delete?');
    if (confirmed){

      this.spreadsheetService.deleteSpreadsheet(id).subscribe(
        response=>{
          //this.service._message = response.message;
          console.log("Usunięto")
          const index = this.spreadsheets.findIndex(s => s.id ===id);
          if(index !==-1){
            this.spreadsheets.splice(index,1);
          }
        },
        error=>{
          this.alertService._message = error.error.error;
        }
      )

    }

  }


  
  trackById(index: number, spreadsheet: any): number {
    return spreadsheet.id; 
  }


}

