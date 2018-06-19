import * as React from 'react';
const ScrollArea = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';

import { fromWei } from '../../../utility/web3.util.min';

interface Props {
    data: any;
}

class ListTransactions extends React.Component<Props, {}> {

  render () {
    const { data } = this.props; 
    return (
      <div className="infoNode listTransactions">
        <div className="headerTitle">
          <h2>Transactions Of Block <a href={`/transactions?block=${data.number}`}>View All</a></h2>
          <hr />
          <ScrollArea>
            <ul>
              {(data.transactionsSimple || []).map((item: any, index: number) => (
                <li key={index}>
                <p><span>TxHash</span><a href={`/address/${item.hash}`}><span className="hashID">{item.hash}</span></a></p>
                <p className=""><span>From</span><a href={`/address/${item.from}`}><span className="hashID">{item.from}</span></a></p>
                <p className=""><span>To</span><a href={`/address/${item.to}`}><span className="hashID">{item.to}</span></a></p>
                <p className="width_50 float-left"><span>Value</span>{fromWei(item.value)} Ether</p>
              </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    );
  }
}

export default ListTransactions as React.ComponentClass<Props>;