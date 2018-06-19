
import * as React from 'react';
import { observer } from 'mobx-react';
// import Popup from '../../../resources/components/Popup';
// import AdvancedSearch from '../../../resources/components/AdvancedSearch';
import AutoComplete from '../../../resources/components/Autocomplete';
// import popOverStore from '../../App/stores/PopOverStore';
import filterStore from '../../App/stores/FilterStore';
import HomeStore from '../stores/HomeStore';

interface Props {}
interface State {
    type?: string;
    keyword?: string;
    autoCompleteOpen?: boolean;
}

@observer
class HomeContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            keyword: '',
            autoCompleteOpen: false
        };
    }
    
    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick);
    }
    
    componentWillUnmount () {
        document.body.removeEventListener('click', this.handleBodyClick);
    }

    handleBodyClick = () => {
        this.setState({
            autoCompleteOpen: false
        });
    }

    onChange = (e: any) => {
        this.setState({
            autoCompleteOpen: (e.target.value === '') ? false : true,
            keyword: e.target.value
        });
        if (e.target.value !== '') {
            HomeStore.readResultSearch(e.target.value);
        }
    }

    render () {
        const { type, data } = filterStore;
        const dataSearch = HomeStore.searchData;
        return (
            <section id="search">
                <div className="container">
                    <form id="searchType">
                        <div className="innerForm">
                            
                            {/*<p className="advancedSearch">
                                <a href="#" onClick={(e: any) => { 
                                    e.preventDefault();
                                    if (!popOverStore.isOpen ) { 
                                        popOverStore.open(this, this.props); 
                                    } else { 
                                        popOverStore.close();
                                    }
                                }}>Advanced Search <i className="fa fa-angle-down"></i></a></p>*/}
                            <div className="inputSearch">
                                <input type="text" name="keyword" onChange={this.onChange} className="txt txtKeyword" placeholder="Search by Address / Txhash / Block / Token / Ens" autoComplete="off" />
                            </div>

                            <button className="btnGo btnSubmit">Go</button>
                            <div className="resultFilter">
                                {type === 'Block' && <p>Search by: <span>{type}</span> - Age: (<span>from {data['age[from]']} to {data['age[to]']}</span>) - No of transactions: (<span>from {data['NoOfTransactions[from]']} to {data['NoOfTransactions[to]']}</span>)</p>}
                                {type === 'Transactions' && <p>Search by: <span>{type}</span> - Age: (<span>from {data['age[from]']} to {data['age[to]']}</span>) - Value: (<span>from ${data['value[from]']} to ${data['value[to]']}</span>)</p>}
                                {type === 'Token' && <p>Search by: <span>{type}</span> - Market Cap: (<span>from ${data['marketcap[from]']} to ${data['marketcap[to]']}</span>) - Price: (<span>from ${data['price[from]']} to ${data['price[to]']}</span>)</p>}
                                {type && <a href="#" className="removeFilter" 
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    filterStore.removeFilter();
                                                }
                                            }><i className="fa fa-trash"></i> Remove filter</a>}
                            </div>
                        </div> 
                        {/*popOverStore.isOpen && <AdvancedSearch blockFrom="" blockTo="" />*/}
                        {this.state.autoCompleteOpen &&
                            <AutoComplete dataSearch={dataSearch} currentText={this.state.keyword || ''} />
                        }
                    </form>
                </div>
            </section>
        );
    }

}

export default HomeContent as React.ComponentClass<Props>;
