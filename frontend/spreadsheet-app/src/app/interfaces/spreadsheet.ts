
export interface SpreadsheetData {
    spreadsheet_name: string;
    sheets: SheetData[];
}
  

export interface SheetData {
name: string;
columns: Column[];
}


export interface Column {
    name: string;
    //order:number;
    cells: Cell[];
}


export interface Cell {
row: number;
content: string;
}
