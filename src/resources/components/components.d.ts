
  interface ITable {
    title: string;
    headers: ITableHeader[];
    data: any[];
  }

  interface ITableHeader {
    text: string;
    renderText?: any;
    key: string;
    renderLink?: any;
    classNameHeader?: string;
    keyLink?: string;
    className?: string;
    onClick?: any;
    paramLink?: boolean;
    filterParam?: boolean;
    getFieldData?: string;
    description?: string;
    // onClick?: React.MouseEventHandler<any>;
  }
  
  interface ITableRow {
    // cells: ITableCell[]
    cells: any[]
  }
  
  interface ITableCell {
    text: string;
    link?: string;
  }