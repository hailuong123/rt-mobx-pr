import * as React from 'react';
import { observer } from 'mobx-react';
import AppStore from '../../modules/App/stores/AppStore';

interface Props {
  dataSearch: ISearchResponse;
  currentText: string;
}

interface State {}

@observer
export default class AutoComplete extends React.Component<Props, State> {
  
  render () {
    let dataSearch = this.props.dataSearch;
    let { currentText } = this.props;
    if (dataSearch && currentText !== dataSearch.textSearch) {
      return null;
    }

    if (dataSearch) {
      delete dataSearch.textSearch;
    }
    return (
      <div id="autoComplete">
        <div className="innerResultSearchKeyword">
            {AppStore.isLoading && <div className="loading"><span className="icon-loading">Loading....</span></div>}

            {Object.keys(this.props.dataSearch || {}).map((key: string, index: number) => (
                <div key={index}>
                    {this.props.dataSearch[key].length > 0 &&
                        <div className="type" key={key}>
                          {
                            this.props.dataSearch[key].length > 0 && 
                              <h2>
                                {key === 'token' && <i className="fa fa-superpowers"></i>}
                                {key === 'transaction' && <i className="fa fa-file-text-o"></i>}
                                {key === 'block' && <i className="fa fa-cubes"></i>}
                                {key}
                              </h2>
                          }
                            
                            <ul>
                              {(this.props.dataSearch[key] || []).map((data: ISearch, indexItem: number) => (                        
                                <li key={indexItem}>
                                  {key === 'token' &&
                                    <a href={`/token/${data.key}`}>{data.text}
                                        <span>{data.key}</span>
                                    </a>
                                  }
                                  {key === 'transaction' &&
                                    <a href={`/transaction/${data.key}`}>{data.text}
                                        <span>{data.key}</span>
                                    </a>
                                  }
                                  {key === 'block' &&
                                    <a href={`/block/${data.key}`}>{data.text}
                                        <span>{data.key}</span>
                                    </a>
                                  }
                                </li>
                              ))}
                            </ul>
                        </div>
                    }
                </div>
              ))}

        </div>
      </div>
    );
  }
}