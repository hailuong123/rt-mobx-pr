import * as React from 'react';
import { observer } from 'mobx-react';
import globalStore from '../../App/stores/GlobalStore';

interface Props {
}

interface State { }

@observer
class EtherPriceComponent extends React.Component<Props, State> {
  render() {
    const etherPrice = globalStore.etherPrice || {};
    return (
      <div>
        <p className="currentPrice">
          <span className="iconEther"></span> ${etherPrice.priceUsd || '-'} @ ${etherPrice.priceBtc || '-'} BTC/ETH
          (<span>{etherPrice.isUp ? '+' : '-'}{etherPrice.percent || '-'}%</span>)
          <i className={`fa fa-arrow-${etherPrice.isUp ? 'up' : 'down'}`} aria-hidden="true"></i>
        </p>
      </div>
    );
  }
}

export default EtherPriceComponent as React.ComponentClass<Props>;
