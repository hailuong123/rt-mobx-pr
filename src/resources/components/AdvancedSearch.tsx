import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import * as moment from 'moment';

import Popup from './Popup';
import InputField from './InputField';
import Calendar from './CalendarField';

import globalStore from '../../modules/App/stores/GlobalStore';
import locale from '../translator/locale';
import popOverStore from '../../modules/App/stores/PopOverStore';
import filterStore from '../../modules/App/stores/FilterStore';

interface Props {
  blockFrom: string;
  blockTo: string;
}
interface State {
  blockFrom: string;
  blockTo: string;
}

@Popup
@observer
export default class AdvancedSearch extends React.Component<Props, State> {
  @observable type: string = 'Block';
  @observable data: object = {};

  @action changeType = (e: any) => {
    this.type = e.target.value;
    this.data = {};
  }
  
  onChangeDate = (date: any, name: string) => {
    const dateChanged = +moment(date).utc();
    this.data[name] = dateChanged;
  }
  
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.data[e.target.name] = e.target.value;
  }

  render () {

    const { blockFrom, blockTo } = this.props;
    const lang = globalStore.lang;

    return (
      <div className="advancedSearchWrapper">
          <div className="overlay" onClick={() => popOverStore.close()}></div>
          <div className="contentSearchAdv">
            <h4>Advanced Search <a href="#" className="doneFilter" 
                  onClick={(e: any) => {
                    e.preventDefault();
                    filterStore.setDataFilter(this.type, this.data);
                    popOverStore.close();
                  }}>DONE</a></h4>
            <hr />
            <div className="row">
              <div className="col">
                <label className="group">Search By</label>
                <div className="controls controls-select">
                  <select onChange={
                    (e: any) => {
                      this.changeType(e);
                    }
                  }>
                    <option>Block</option>
                    <option>Transactions</option>
                    <option>Token</option>
                  </select>
                </div>
              </div>
              <div className="col-8">

                {/* BLOCK */}

                {this.type === 'Block' && <div className="">
                  <div className="">
                    <label className="group">Age</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <Calendar 
                            onChangeDate={this.onChangeDate}
                            name="age[from]"
                            onChange={this.onChange}
                          />
                          <span className="calendarIcon"></span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <Calendar
                            onChangeDate={this.onChangeDate}
                            name="age[to]"
                            onChange={this.onChange}
                          />
                          <span className="calendarIcon"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label className="group">No Of Transactions</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="NoOfTransactions[from]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="NoOfTransactions[to]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>}

                {/* TRANSACTIONS */}
                {this.type === 'Transactions' && <div className="">
                  <div className="">
                    <label className="group">Age</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="age[from]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="age[to]"
                            className="txt"
                            value={blockTo}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label className="group">Value</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="value[from]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="value[to]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>}

                {/* TOKEN */}
                {this.type === 'Token' && <div className="">
                  <div className="">
                    <label className="group">Market Cap</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="marketcap[from]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="marketcap[to]"
                            className="txt"
                            value={blockTo}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label className="group">Price</label>
                    <div className="row">
                      <div className="col-6 paddingLeft0">
                        <label>From</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="price[from]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>To</label>
                        <div className="controls">
                          <InputField
                            type="text"
                            name="price[to]"
                            className="txt"
                            value={blockFrom}
                            placeholder={locale.blockFrom[lang]}
                            onChange={this.onChange}
                          />
                          <span className="currencyIcon">$</span>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>}

              </div>
            </div>
          
          </div>
      </div>
    );
  }
} 
