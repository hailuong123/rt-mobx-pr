import * as React from 'react';
import { observer } from 'mobx-react';
import popOverStore from '../../modules/App/stores/PopOverStore';

interface Props {
  store: any;
}

export default function Popup(Component: any) {
  @observer
  class PopupComponent extends React.Component<Props, {}> {
    render() {
      return (
        <div className="popup">
          <div className="overlay" onClick={popOverStore.close}></div>
          <div className="contentPop">
              <div>
                {popOverStore.title && <h2>{popOverStore.title} <span onClick={popOverStore.close} className="fa fa-times close"></span></h2>}
              </div>
              
              <Component {...this.props} />
              {popOverStore.isOpenRightPanel &&
                <div className="flex-container"><popOverStore.rightComponent /></div>
              }
          </div>
        </div>
      );
    }

    onClose = () => {
      if ((this.props.store || {}).closePopup) {
        this.props.store.onClosePopup();
      }
      popOverStore.close();
    }
  }
  return PopupComponent as any;
}
