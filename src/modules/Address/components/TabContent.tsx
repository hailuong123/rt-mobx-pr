
import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import TableView from '../../../resources/components/TableView';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';
import { fromWei } from '../../../utility/web3.util.min';
import { getFee } from '../../../utility/utils';
import { getTimeMoment } from '../../../utility/formatTime';
interface Props {
  dataList: object;
}
interface State {}

@observer
class TransactionAddress extends React.Component<Props, State> {

  render () {
    const lang = globalStore.lang;
    const { dataList } = this.props;

    const renderTranxLink = (value: string) => {
      return `/transaction/${value}`;
    };

    const renderBlockLink = (value: string) => {
      return `/block/${value}`;
    };

    const renderAddressLink = (value: string) => {
      return `/address/${value}`;
    };

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
        text: locale.age[lang],
        classNameHeader: 'width10_per',
        key: 'timestamp',
        renderText: getTimeMoment,
        filterParam: true,
        keyLink: 'blockHash'
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
        renderText: (gasUsed: number) => { return getFee(gasUsed); }
      }
    ] as ITableHeader[];

    const dataTable = {
      headers: headersTranx,
      title: '',
      data: dataList
    } as ITable;
    
    return (
      <div>
        {
          dataTable.data.length > 0 &&
          <>
            <Link to={''} className="viewAll">View All</Link>
            <TableView dataTable={dataTable} />
          </>
        }

        {
          !dataTable.data.length &&
          <p>Nothing data</p>
        }
        
      </div>
    );
  }
}

export default TransactionAddress as React.ComponentClass<Props>;
