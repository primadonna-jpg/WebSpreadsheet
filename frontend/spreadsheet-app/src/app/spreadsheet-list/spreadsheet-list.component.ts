import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-spreadsheet-list',
  templateUrl: './spreadsheet-list.component.html',
  styleUrls: ['./spreadsheet-list.component.css']
})
export class SpreadsheetListComponent implements OnInit{
  spreadsheets: any[] = [];
  constructor(private service:SharedService){}
  ngOnInit(): void {
    this.loadSpreadsheets();
  }
  loadSpreadsheets(){
    this.service.shpreadsheetList().subscribe(
      response =>{
        this.spreadsheets = response.spreadsheets ;
      },
      error=>{
        this.service.setMessage(error.error.error);
        console.error('Błąd podczas pobierania arkuszy:', error);
      }
    );
  }

  deleteSpreadsheet(id:number){
    const confirmed = window.confirm('Are you sure to delete?');
    if (confirmed){

      this.service.spreadsheetDelete(id).subscribe(
        response=>{
          //this.service._message = response.message;
          console.log("Usunięto")
          const index = this.spreadsheets.findIndex(s => s.id ===id);
          if(index !==-1){
            this.spreadsheets.splice(index,1);
          }
        },
        error=>{
          this.service._message = error.error.error;
        }
      )

    }

  }


  
  trackById(index: number, spreadsheet: any): number {
    return spreadsheet.id; 
  }


}

