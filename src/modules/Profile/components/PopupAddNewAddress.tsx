
import * as React from 'react';
import { observer } from 'mobx-react';
import Notification from '../../../resources/components/Notification';
import popOverStore from '../../App/stores/PopOverStore';
import Popup from '../../../resources/components/Popup';
import InputField from '../../../resources/components/InputField';
import CheckboxField from '../../../resources/components/CheckboxField';
import RadioField from '../../../resources/components/RadioField';
import globalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import ProfileStore from '../stores/ProfileStore';
import locale from '../resources/locale';

interface Props {
  userID: string;
  edit?: boolean;
  itemEdit: object;
}
interface State {}

@Popup
@observer
class PopupAddNewAddress extends React.Component<Props, State> {

  /* tslint:disable:no-string-literal */
  state = {
    ethAddress: this.props.itemEdit['address'] || '',
    description: this.props.itemEdit['description'] || '',
    dis_notif_email: this.props.edit ? this.props.itemEdit['options']['dis_notif_email'] : false,
    notif_txns: this.props.edit ? this.props.itemEdit['options']['notif_txns'] : false,
    notif_incoming_txn: this.props.edit ? this.props.itemEdit['options']['notif_incoming_txn'] : false,
    notif_outgoing_txn: this.props.edit ? this.props.itemEdit['options']['notif_outgoing_txn'] : false,
    required: true,
    checked: this.props.edit ? (this.props.itemEdit['options']['dis_notif_email'] ? 'dis_notif_email' 
                : this.props.itemEdit['options']['notif_txns'] ? 'notif_txns'
                : this.props.itemEdit['options']['notif_incoming_txn'] ? 'notif_incoming_txn'
                : this.props.itemEdit['options']['notif_outgoing_txn'] ? 'notif_outgoing_txn'
                : '') : ''
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.name === 'notif_email') {
      if (e.target.id !== this.state.checked) {
        this.setState({
          [this.state.checked]: false,
          [e.target.id]: true,
          checked: e.target.id
        });
      }
      if (!this.props.edit) {
        this.setState({
          [e.target.id]: e.target.checked
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({checked: e.target.id});
  }

  confirmRemove = (): any => {
    let localStg = AppStore.cookieUser;
    if (window.confirm('Are you sure you wish to delete this item?')) {
      ProfileStore.deleteWatchList(this.props.userID, this.props.itemEdit['_id'], localStg, 'PopupAddNewAddress');
      ProfileStore.getWatchList(localStg['_id'], localStg);
    }
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const { itemEdit } = this.props;
    if (this.state.ethAddress || itemEdit) {
      this.setState({
        required: true
      });
      let localStg = AppStore.cookieUser;
      let bodySubmit = {
        address: this.state.ethAddress,
        description: this.state.description,
        dis_notif_email: this.state.dis_notif_email,
        notif_txns: this.state.notif_txns,
        notif_incoming_txn: this.state.notif_incoming_txn,
        notif_outgoing_txn: this.state.notif_outgoing_txn,
        token: localStg['token']
      };

      if (this.props.edit) {
        ProfileStore.editWatchList(this.props.userID, this.props.itemEdit['_id'], bodySubmit, 'PopupAddNewAddress');
      } else {
        ProfileStore.setWatchList(this.props.userID, bodySubmit, 'PopupAddNewAddress');
      }

    } else {
      this.setState({
        required: false
      });
    }
  }

  componentWillMount() {
    ProfileStore.clearError();
  }

  render () {
    // const item = popOverStore.props;
    const { itemEdit } = this.props;
    const lang = globalStore.lang;
    
    if (ProfileStore.status) {
      popOverStore.close();
    }
    return (
      <div className="Inner_AddNewAddress">
          <Notification errors={ProfileStore.errors} componentDisplay="PopupAddNewAddress" />
          <form onSubmit={this.onSubmit}>
            {!this.props.edit && 
              <React.Fragment>
                <div className="controls-group">
                  <label>
                    {locale.eth_address_label[lang]}
                  </label>
                  <InputField 
                    name="ethAddress"
                    placeholder=""
                    value={this.state.ethAddress}
                    onChange={this.onChange}
                    error={!this.state.required ? locale.password_v[lang] : ''}
                    checked=""
                  />

                </div>
                <div className="controls-group">
                  <label>
                    {locale.description_label[lang]}
                  </label>
                  <InputField 
                    name="description"
                    placeholder=""
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <div className="controls-group">
                  <label htmlFor="">
                    {locale.notification_options_label[lang]}
                  </label>
                  <CheckboxField 
                    name="notif_email"
                    type="checkbox"
                    value="dis_notif_email"
                    forName="notif_incoming_txn"
                    onChange={this.onChange}
                  />
                  
                </div>
              </React.Fragment>
            }

            {this.props.edit && 
              <React.Fragment>
                <div className="controls-group">
                  <label>
                    {locale.eth_address_label[lang]}
                  </label>
                  <a href={`/address/${itemEdit['address']}`} className="hashText">{itemEdit['address']}</a>

                </div>
                <div className="controls-group">
                  <label>
                    {locale.description_label[lang]}
                  </label>
                  <InputField 
                    name="description"
                    placeholder=""
                    value={this.state.description}
                    onChange={this.onChange}
                  />

                </div>
                <div className="controls-group">
                  <label>
                    {locale.notification_options_label_edit[lang]}
                  </label>
                  <div className="groupOptions">
                      <div className="radioField">
                          <RadioField 
                            name="notif_email"
                            type="radio"
                            textLabel="Disable Email Notifications"
                            value="" 
                            forName="dis_notif_email"
                            onChange={this.onChange} 
                            checked={this.state.checked === 'dis_notif_email' ? true : false}
                          />
                      </div>
                      <div className="radioField">
                          <RadioField 
                            name="notif_email"
                            type="radio"
                            textLabel="Notify on Incoming & Outgoing Txns"
                            value="" 
                            forName="notif_txns"
                            onChange={this.onChange} 
                            checked={this.state.checked === 'notif_txns' ? true : false}
                          />
                      </div>
                      <div className="radioField">
                          <RadioField 
                            name="notif_email"
                            type="radio"
                            textLabel="Notify on Incoming (Receive) Ether Txn"
                            value="" 
                            forName="notif_incoming_txn"
                            onChange={this.onChange} 
                            checked={this.state.checked === 'notif_incoming_txn' ? true : false}
                          />
                      </div>
                      <div className="radioField">
                          <RadioField 
                            name="notif_email"
                            type="radio"
                            textLabel="Notify on Outgoing (Sent) Ether Txn"
                            value="" 
                            forName="notif_outgoing_txn"
                            onChange={this.onChange} 
                            checked={this.state.checked === 'notif_outgoing_txn' ? true : false}
                          />
                      </div>
                  </div>
                </div>
                
              </React.Fragment>
            }

            <div className="bottomPopup">
              {this.props.edit && 
                <button type="button" className="btnDelete float-left" onClick={this.confirmRemove}>{locale.button_delete[lang]}</button>
              }
              <button className="btnCancel" onClick={popOverStore.close}>{locale.button_cancel[lang]}</button>
              {!this.props.edit && 
                <button type="submit" className="btnAdd">{locale.button_add[lang]}</button>
              }
              {this.props.edit && 
                <button type="submit" className="btnAdd">{locale.button_edit[lang]}</button>
              }
            </div>

          </form>
      </div>
    );
  }
}

export default PopupAddNewAddress as React.ComponentClass<Props>;
