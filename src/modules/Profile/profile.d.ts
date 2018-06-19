
interface IProfileHeader {
  text: string;
  renderText?: any;
  key: string;
  renderLink?: any;
  classNameHeader?: string;
  className?: string;
  onClick?: any;
  paramLink?: boolean;
  filterParam?: boolean;
  description?: string;
}

interface IProfileResponse {
  title: string;
  headers: IProfileHeader[];
  data: any[];
}

interface IProfileError {
  text?: string;
}
