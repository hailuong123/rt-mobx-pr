import * as React from 'react';
import * as moment from 'moment';
import locale from '../resources/locale';
import globalStore from '../../App/stores/GlobalStore';
import ListStore from '../stores/ListStore';

interface Props {
  itemLimit: number;
  total: number;
  pageNumber: number;
  onClick: Function;
}
interface State {}
export default class Pagination extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const lang = globalStore.lang;
    const { itemLimit, total, pageNumber, onClick } = this.props;
    let noBack = pageNumber <= 1 ? 'disable' : '';
    let noGo = pageNumber >= Math.ceil(total / itemLimit) ? 'disable' : '';
    if (total < itemLimit) {
      return <div></div>;
    }
    return (
      
        <div className="pagination">
            <ul>
              <li><a href="#" className={`first ${noBack}`} onClick={(e) => onClick(e, +moment.utc(), -1, 1)}><i className="fa fa-angle-double-left"></i></a></li>
              <li><a href="#" className={`prev ${noBack}`} onClick={(e) => onClick(e, ListStore.firstItemResponse, -1, pageNumber - 1)}><i className="fa fa-angle-left"></i></a></li>
              <li><span>{locale.page[lang]} {pageNumber} {locale.of[lang]} {Math.ceil(total / itemLimit)}</span></li>
              <li><a href="#" className={`next ${noGo}`} onClick={(e) => onClick(e, ListStore.lastItemResponse, 1, pageNumber + 1)}><i className="fa fa-angle-right"></i></a></li>
              <li><a href="#" className={`last ${noGo}`} onClick={(e) => onClick(e, 0, 1, Math.ceil(total / itemLimit))}><i className="fa fa-angle-double-right"></i></a></li>
            </ul>
        </div>
    );
  }
}
