
import * as React from 'react';
import { observer } from 'mobx-react';
import TabContent from './TabContent';
import { filter } from 'lodash';
// import globalStore from '../../App/stores/GlobalStore';
// import locale from '../resources/locale';

interface Props {
  data: object;
}
interface State {}

@observer
class AddressContent extends React.Component<Props, State> {

  state = {
    tabSelected: '#transactions'
  };

  changeTab = (e: any) => {
    e.preventDefault();
    this.setState({
      tabSelected: (e.target.href).substring((e.target.href).indexOf('#'))
    });
  }

  render () {
    // const lang = globalStore.lang;
    const { data } = this.props;
    
    const normalTransaction = filter(data['tranx']['transactions'], { 'transactionType': 'normal' });
    const internalTransaction = filter(data['tranx']['transactions'], { 'transactionType': 'internal' });
    const tokenTranfer = filter(data['tranx']['transactions'], { 'transactionType': 'token_transfer' });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
              <div className="overview">
                <h2>Overview</h2>
                <ul>
                  <li><span>ETH Balance:</span>2,000,000.289942960513257758 Ether</li>
                  <li><span>ETH USD Value:</span>$1,997,460,289.57 (@ $998.73/ETH)</li>
                  <li><span>No Of Transactions:</span>447 txns</li>
                </ul>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="overview">
                  <h2>Misc</h2> 
                  <ul>
                    <li><span>Address Watch:</span><button className="addToWatchList">Add to watch list</button></li>
                    <li><span>Token Tracker:</span></li>
                  </ul>
              </div>
          </div>
        </div>

        <div className="tabDetailAddress">
            <ul>
              {
                normalTransaction &&
                <li><a href="#transactions" id="#transactions" onClick={this.changeTab} 
                      className={(this.state.tabSelected === '#transactions') ? 'active' : ''}>
                        Transactions
                    </a></li>
              }
              {
                internalTransaction &&
                <li><a href="#internal" onClick={this.changeTab}
                      className={(this.state.tabSelected === '#internal') ? 'active' : ''}>
                        Internal Transaction
                  </a></li>
              }
              {
                tokenTranfer &&
                <li><a href="#token" onClick={this.changeTab}
                      className={(this.state.tabSelected === '#token') ? 'active' : ''}>
                        Token transfers
                  </a></li>
              }
            </ul>

            <div className="contentTab">
                {
                  this.state.tabSelected === '#transactions' &&
                  <TabContent dataList={normalTransaction} />
                }
                {
                  this.state.tabSelected === '#internal' &&
                  <TabContent dataList={internalTransaction} />
                }
                {
                  this.state.tabSelected === '#token' &&
                  <TabContent dataList={tokenTranfer} />
                }
            </div>
        </div>
      </div>
    );
  }
}

export default AddressContent as React.ComponentClass<Props>;
