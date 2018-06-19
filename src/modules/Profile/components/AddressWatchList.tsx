
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import PopupAddNewAddress from './PopupAddNewAddress';
import TableView from '../../../resources/components/TableView';
import popOverStore from '../../App/stores/PopOverStore';
import profileStore from '../stores/ProfileStore';
import globalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import locale from '../resources/locale'; 
import Notification from '../../../resources/components/Notification';
import * as Utility from '../../../utility/utils';
import { fromWei } from '../../../utility/web3.util.min';

interface Props {}
interface State {}

@observer
class AddressWatchList extends React.Component<Props, State> {
  state = {
    userID: '',
    edit: false,
    itemEdit: {}
  };

  componentWillMount() {
    profileStore.success_update('');
    profileStore.clearError();
    this.loadWatchList();
  }
  
  loadWatchList = () => {
    /* tslint:disable:no-string-literal */
    let localStg = AppStore.cookieUser;
    profileStore.getWatchList(localStg['_id'], localStg);
    this.setState({
      userID: localStg['_id']
    });
  }

  popupAddNewAddress = () => {
    let title = locale.title_add_new_watch_list[globalStore.lang]; 
    popOverStore.open(PopupAddNewAddress, this.props);
    this.setState({
      edit: false,
      itemEdit: ''
    });
    popOverStore.setTitle(title);
  }

  popupEditAddressWatchList = (item: string) => {
    let title = locale.title_edit_watch_list[globalStore.lang];
    popOverStore.open(PopupAddNewAddress, this.props);
    this.setState({
      edit: true,
      itemEdit: item
    });
    popOverStore.setTitle(title);
  }
  
  changeWei = (text: any) => {
    return Utility.formatNumber(Number(fromWei(text)));
  }

  renderOptions = (options: object) => {
    var optionResult: string = '';
    Object.keys(options).map((key): any => {
      if (options[key]) {
        return optionResult = key;
      }
    });
    return (optionResult === 'dis_notif_email' || optionResult === '') ? 'Disabled' : 'Enabled';
  }

  render () {
    const lang = globalStore.lang;
    const list = profileStore.data || [];
    const renderAddressLink = (value: string) => {
      return `/address/${value}`;
    };

    // config Header table
    const headersWatchList = [
      {
        key: 'address',
        text: 'Address',
        renderLink: renderAddressLink,
        className: 'hashText',
        classNameHeader: 'width40_per',
        description: 'description'
      },
      {
        key: 'balance',
        text: 'Balance',
        className: 'balance',
        classNameHeader: 'width30_per',
        renderText: this.changeWei
      },
      {
        key: 'options',
        text: 'Notification',
        className: 'Notification',
        classNameHeader: 'width15_per',
        renderText: this.renderOptions
      },
      {
        key: 'action',
        text: 'Action',
        className: 'action text-right',
        classNameHeader: 'width15_per text-right',
        onClick: (e: any, item: any) => {
          this.popupEditAddressWatchList(item);
        }
      }
    ] as IProfileHeader[];

    // config data interfage
    const dataSource = {
      title: 'Profile',
      headers: headersWatchList,
      data: list
    };

    return (
      <React.Fragment>
        <div className="overviewInfo">
          <h2 className="titlePartProfile">
            {locale.title_watch_list[lang]}
          </h2>
          <div className="innerInfoAccount watchList">
            <button className="addWatchList" onClick={this.popupAddNewAddress}>
              <i className="fa fa-plus"></i> {locale.add_watch_list[lang]}
            </button>
            
            {profileStore.success && 
              <p className="successNote">{profileStore.success}</p>
            }
            <Notification errors={profileStore.errors} componentDisplay="AddressWatchList" />
            {list.length > 0 && <TableView dataTable={dataSource} />}
            {list.length === 0 && <p>Not data</p>}
          </div>
        </div>

        {popOverStore.isOpen && <PopupAddNewAddress {...this.state} />}
      </React.Fragment>
    );
  }
}

export default AddressWatchList as React.ComponentClass<Props>;
