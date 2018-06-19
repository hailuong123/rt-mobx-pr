
import * as React from 'react';
import { observer } from 'mobx-react';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';
import ImageView from '../../../resources/components/ImageView';

const imageErrorSrc = require(`../../../assets/images/token.png`);
interface Props {
  name: string;
  decimals: number;
  symbol: string;
  totalSupply: string;
  priceUsd?: string;
  priceBtc?: string;
  priceEth?: string;
  isUp?: boolean;
  priceChange?: string;
  imageName?: string;
  marketCap?: string;
}
interface State { }

@observer
class TokenContent extends React.Component<Props, State> {
  render() {
    const lang = globalStore.lang;
    return (
      <div className="col-sm-4">
        <div className="tokenItem">
          <ImageView
            src={this.getImgSrc(this.props.symbol)}
            className="imgLogoToken"
            srcOnError={imageErrorSrc}
          />
          <div className="infoToken">
            <h2>{this.props.symbol}</h2>
            <p>
              {this.props.name}<br />
              <span>{locale.price[lang]}</span> ${this.props.priceUsd} / ${this.props.priceUsd} Btc / ${this.props.priceEth} Eth<br />
              <span>%{locale.change[lang]}</span>
              {this.props.priceChange}%
                {this.props.isUp === true && <i className="fa fa-arrow-up" aria-hidden="true"></i>}
              {this.props.isUp === false && <i className="fa fa-arrow-up" aria-hidden="true"></i>}
              <br />
              <span>{locale.marketCap[lang]}</span> ${this.props.marketCap}
            </p>
          </div>
        </div>
      </div>
    );
  }

  getImgSrc = (token: string): string => {
    return `https://files.coinmarketcap.com/static/img/coins/128x128/${token}.png`;
  }
}

export default TokenContent as React.ComponentClass<Props>;
