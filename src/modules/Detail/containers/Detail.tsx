import * as React from 'react';
import { observer } from 'mobx-react';
import DetailContentComponent from '../components/DetailContent';
import { match as Match } from 'react-router';
import DetailStore from '../stores/DetailStore';
import AppStore from '../../App/stores/AppStore';
import globalStore from '../../App/stores/GlobalStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State { }

@observer
class DetailContainer extends React.Component<Props, State> {
  
  getData = (type: string, key: string) => {
    DetailStore.getDataDetail(type, key);
  }

  componentWillMount() {
    let hash = '';
    if (this.props.match && this.props.match.params) {
      hash = (this.props.match as any).params.hash;
    }
    const type = this.props.location.pathname.split('/')[1];
    
    if (type === '' || !type) {
      return;
    }

    AppStore.toggleLoading(true);

    this.getData(type, hash);

    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  render() {
    const { location } = this.props;
    
    const currentParam = location.pathname.split('/')[1];
    globalStore.setBreadscrumb(currentParam, ['home', currentParam]);

    return (
      <div>
        <DetailContentComponent {...this.props} currentParam={currentParam} data={DetailStore.dataDetail} />
      </div>
    );
  }
}

export default DetailContainer as React.ComponentClass<Props>;
