
export interface SpreadsheetData {
    
    spreadsheet_name: string;
    sheets: Sheet[];
}
  

export interface Sheet {
    name: string;
    sheetData:any[][];
    
}


export interface Row {
    cells:Cell[];
}


export interface Cell {
    content: any;
}
