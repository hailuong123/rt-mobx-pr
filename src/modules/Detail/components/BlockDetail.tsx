
import * as React from 'react';
import { observer } from 'mobx-react';
import { getTimeMoment } from '../../../utility/formatTime';
import * as Utility from '../../../utility/utils';
// import Popup from '../../../resources/components/Popup';

interface Props {
  data: any;
}
interface State {}

@observer
class BlockDetail extends React.Component<Props, State> {

  render () {
    const { data } = this.props;

    return (
      <table className="tableDetail">
        <tbody>
          <tr>
            <td>TimeStamp</td>
            <td>{getTimeMoment(data.timestamp)}</td>
          </tr>
          <tr>
            <td>Transactions</td>
            <td>{data.transactions.length} Transactions</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td><a href={`/address/${data.hash}`}>{data.hash}</a></td>
          </tr> 
          <tr>
            <td>Parent Hash</td>
            <td><a href={`/address/${data.hash}`}>{data.parentHash}</a></td>
          </tr> 
          <tr>
            <td>Sha3Uncles</td>
            <td>{data.sha3Uncles}</td>
          </tr>  
          <tr>
            <td>Mined By</td>
            <td><a href={`/address/${data.miner}`}>{data.miner}</a></td>
          </tr>  
          <tr>
            <td>Difficulty</td>
            <td>{Utility.formatNumber(Number(data.difficulty))}</td>
          </tr>  
          <tr>
            <td>Total Difficulty</td>
            <td>{Utility.formatNumber(Number(data.totalDifficulty))}</td>
          </tr> 
          <tr>
            <td>Size</td>
            <td>{data.size} bytes</td>
          </tr> 
          <tr>
            <td>Gas Used</td>
            <td>{Utility.formatNumber(Number(data.gasUsed))}</td>
          </tr> 
          <tr>
            <td>Gas Limit</td>
            <td>{Utility.formatNumber(Number(data.gasLimit))}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{data.nonce}</td>
          </tr>
          <tr>
            <td>Block Reward</td>
            <td>-----</td>
          </tr>
          <tr>
            <td>Uncles Reward</td>
            <td>------</td>
          </tr>
          <tr>
            <td>Extra Data</td>
            <td>{data.extraData}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default BlockDetail as React.ComponentClass<Props>;
