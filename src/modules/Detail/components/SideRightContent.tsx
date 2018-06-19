import * as React from 'react';
import { observer } from 'mobx-react';
import ListTransactions from './ListTransactions';

import { getTimeMoment } from '../../../utility/formatTime';

interface Props {
    data: any;
    currentParam?: string;
}
interface State {}

@observer
class RightSideContent extends React.Component<Props, State> {
  render () {
    const { data } = this.props;
    
    return (
      <div className="col-4">
        {this.props.currentParam === 'transaction' &&
          <div className="infoNode">
            <div className="headerTitle">
              <h2>Block</h2>
              <hr />
              <ul>
                <li>
                  <p><span>Height</span>{data.blockSimple.number}</p>
                  <p><span>Mined By</span><a href={`/address/${data.blockSimple.miner}`}>{data.blockSimple.miner}</a></p>
                  <p><span>TimeStamp</span>{getTimeMoment(data.blockSimple.timestamp)}</p>
                  <a href={`/block/${data.blockHash}`}>View Detail Block</a>
                </li>
              </ul>
            </div>
          </div>
        }
        {this.props.currentParam === 'block' && <ListTransactions data={data} />}
      </div>
    );
  }
}

export default RightSideContent as React.ComponentClass<Props>;