
export interface SpreadsheetData {
    spreadsheet_name: string;
    sheets: SheetData[];
}
  

export interface SheetData {
    name: string;
    rows: Row[];
    
}


export interface Row {
    cells:Cell[];
}


export interface Cell {
    content: any;
}
