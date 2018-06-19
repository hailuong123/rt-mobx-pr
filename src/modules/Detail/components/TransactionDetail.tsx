
import * as React from 'react';
import { observer } from 'mobx-react';
import CurrencyStore from '../../App/stores/CurrencyStore';
import { fromWei } from '../../../utility/web3.util.min';
import { getFee } from '../../../utility/utils';

interface Props {
  data: any;
}
interface State {}

@observer
class TransactionDetail extends React.Component<Props, State> {

  render () {
    const { data } = this.props;
    const convertToDollar = (Number(+fromWei(data.value)) * Number(CurrencyStore.Dollar));

    return (
        <table className="tableDetail">
          <tbody>
            <tr>
              <td>TxHash</td>
              <td>{data.hash}</td>
            </tr>
            <tr>
              <td>TxReceipt Status</td>
              <td>{data.status}</td>
            </tr> 
            <tr>
              <td>From</td>
              <td><a href={`/address/${data.from}`}>{data.from}</a></td>
            </tr> 
            <tr>
              <td>To</td>
              <td><a href={`/address/${data.to}`}>{data.to}</a></td>
            </tr>  
            <tr>
              <td>Value</td>
              <td>{fromWei(data.value)} Ether (${(convertToDollar).toFixed(2)})</td>
            </tr>  
            <tr>
              <td>Gas Limit</td>
              <td>-----</td>
            </tr>  
            <tr>
              <td>Gas Used By Txn</td>
              <td>{data.gasUsed}</td>
            </tr> 
            <tr>
              <td>Gas Price</td>
              <td>{fromWei(data.gasPrice)}</td>
            </tr> 
            <tr>
              <td>Actual Tx Cost/Fee</td>
              <td>{getFee(data.gasUsed)}</td>
            </tr> 
            <tr>
              <td>Cumulative Gas Used</td>
              <td>{data.cumulativeGasUsed}</td>
            </tr>
            <tr>
              <td>Nonce</td>
              <td>{data.nonce}</td>
            </tr>
            <tr>
              <td>Input Data</td>
              <td><textarea readOnly={true}>0x</textarea></td>
            </tr>
              
          </tbody>
        </table>
    );
  }
}

export default TransactionDetail as React.ComponentClass<Props>;
