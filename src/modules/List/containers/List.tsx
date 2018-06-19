import * as React from 'react';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import AppStore from '../../App/stores/AppStore';
import globalStore from '../../App/stores/GlobalStore';
import { match as Match } from 'react-router';
import  Breadcrumbs  from '../../../resources/components/Breadcrumbs';
import Pagination from '../components/Pagination';
import ListStore from '../stores/ListStore';
import TableView from '../../../resources/components/TableView';
import locale from '../resources/locale';
import { getTimeMoment } from '../../../utility/formatTime';
import { fromWei } from '../../../utility/web3.util.min';
import { getFee } from '../../../utility/utils';
import * as queryString from 'query-string';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State { 
  itemLimit: number;
  page_number: number;
}

@observer
class ListContainer extends React.Component<Props, State> {
  
  state = {
    itemLimit: 50,
    page_number: 1,
  };

  componentDidMount() {
    this.getData(this.state.itemLimit, +moment.utc(), 1);
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  getData = (limit: number, skip: number, sortBy: number) => {
    const query = queryString.parse(location.search);
    const type = this.props.location.pathname.split('/')[1];
    ListStore.readList(type, limit, skip, sortBy, query.block ? `blockNum=${query.block}` : undefined);
  }

  setPage = (e: any, skip: number, sortBy: number, pageNumber: number) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= ListStore.total) {
      this.getData(this.state.itemLimit, skip, sortBy);
      this.setState({
        page_number: pageNumber 
      });
    }
  }

  render() {
    const lang = globalStore.lang;
    const { location } = this.props;
    // const { params } = this.props.match;

    const currentParam = location.pathname.split('/')[1];
    globalStore.setBreadscrumb(currentParam, ['home', currentParam]);

    const list = ListStore.listblock;
    const total = ListStore.total;

    if (!list || list.length === 0) {
      return null;
    }

    const renderAddressLink = (value: string) => {
      return `/address/${value}`;
    };

    const renderTranxLink = (value: string, filterParam?: boolean) => {
      if (filterParam) {
        
        return `/transactions?block=${value}`; 
      }
      return `/transaction/${value}`;
    };

    const renderBlockLink = (value: string) => {
      return `/block/${value}`;
    };

    const headersBlock = [{
      text: locale.height[lang],
      className: '',
      onClick: (e: any) => {
        return;
      },
      renderLink: renderBlockLink,
      keyLink: 'hash',
      key: 'number'
    }, {
      text: locale.age[lang],
      key: 'age',
      renderText: getTimeMoment,
      classNameHeader: 'width15_per',
    }, {
      text: locale.txn[lang],
      renderLink: renderTranxLink,
      keyLink: 'number',
      paramLink: true,
      key: 'txn',
      classNameHeader: 'width5_per',
    }, {
      text: locale.uncles[lang],
      key: 'uncles',
      classNameHeader: 'width5_per',
    }, {
      text: locale.miner[lang],
      renderLink: renderAddressLink,
      className: 'hashText',
      classNameHeader: 'width30_per',
      key: 'miner'
    }, {
      text: locale.gasUsed[lang],
      key: 'gasUsed'
    }, {
      text: locale.gasLimit[lang],
      key: 'gasLimit'
    }, {
      text: locale.avgGasPrice[lang],
      key: 'gasPrice'
    }, {
      text: locale.reward[lang],
      key: 'reward'
    }] as ITableHeader[];

    const headersTranx = [{
      text: locale.txnHash[lang],
      className: 'hashText',
      classNameHeader: 'width20_per',
      onClick: (e: any) => {
        console.log(e);
        return;
      },
      renderLink: renderTranxLink,
      key: 'hash'
    }, {
      text: locale.block[lang],
      classNameHeader: 'width10_per',
      key: 'blockNumber',
      renderLink: renderBlockLink,
      filterParam: true,
      keyLink: 'blockHash'
    }, {
      text: locale.from[lang],
      className: 'hashText',
      classNameHeader: 'width20_per',
      renderLink: renderAddressLink,
      key: 'from'
    }, {
      text: locale.to[lang],
      className: 'hashText',
      classNameHeader: 'width20_per',
      renderLink: renderAddressLink,
      key: 'to'
    }, {
      classNameHeader: 'width10_per',
      text: locale.value[lang],
      key: 'value',
      renderText: (s: string) => { return fromWei(s, 8); }
    }, {
      classNameHeader: 'width10_per',
      text: locale.fee[lang],
      key: 'fee',
      getFieldData: 'gasUsed',
      renderText: (gasUsed: number) => { return gasUsed ? getFee(gasUsed) : '-'; }
    }
    ] as ITableHeader[];

    const headersAccount = [{
      text: locale.address[lang],
      className: 'hashText',
      classNameHeader: 'width20_per',
      renderLink: renderAddressLink,
      key: 'hash'
    }, ] as ITableHeader[];

    const getHeader = (type: string): any => {
      switch (type) {
        case 'accounts':
          return headersAccount;
        case 'transactions':
          return headersTranx;
        case 'blocks':
          return headersBlock;
        default:
          break;
      }
    };

    const dataTableBlock = {
      headers: getHeader(currentParam),
      title: '',
      data: list
    } as ITable;

    return (
      <section id="mainContent">
        <div className="innerContent">
          <Breadcrumbs />
          <div className="content container">
            <Pagination itemLimit={this.state.itemLimit} total={total} pageNumber={this.state.page_number} onClick={this.setPage} />
            <TableView dataTable={dataTableBlock} />
          </div>
        </div>
      </section>
    );
  }
}

export default ListContainer as React.ComponentClass<Props>;
