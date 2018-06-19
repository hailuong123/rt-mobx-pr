
import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import GlobalStore from '../../modules/App/stores/GlobalStore';
import locale from '../translator/locale';

interface Props {
  dataTable: ITable;
}
interface State {}

@observer
class TableView extends React.Component<Props, State> {

  onNull = () => { return ''; };

  render () {
    const lang = GlobalStore.lang;
    const { dataTable } = this.props;
    return (
      <div className="tableList table-responsive">
        <table>
          <thead>
            <tr>
            {
              (dataTable.headers || []).map((column, index) => (
                <th className={column.classNameHeader} key={`header-${index}`}>{column.text}</th>
              ))
            }
            </tr>
          </thead>
          <tbody>
            {
              (dataTable.data || []).map((row, indexRow) => (
                <tr key={`col-${indexRow}`}>
                  {
                    (dataTable.headers || []).map((column, indexCol) => (
                    // <td onClick={dataTable.headers[indexCell].onClick || this.onClickNull}>
                    <td key={`row-${indexRow}-${indexCol}`}>
                      {dataTable.headers[indexCol].onClick &&
                        <Link className="actionDelete" 
                          onClick={(e) => {
                            e.preventDefault();
                            dataTable.headers[indexCol].onClick(e, row);
                          }}
                          to={''}
                        >
                          {(locale[column.key] || {})[lang]}
                        </Link> 
                      }

                      {
                        dataTable.headers[indexCol].renderLink !== undefined ? 
                        <React.Fragment>
                          <Link className={column.className} 
                            to={`${dataTable.headers[indexCol].renderLink(row[column.keyLink || column.key], column.paramLink)}`}>
                            {row[column.key]}
                          </Link> 
                          {dataTable.headers[indexCol].description && <span className="description">{row[column.description || '']}</span>}
                        </React.Fragment>
                        : 
                        <p>
                          {column.getFieldData !== undefined ? 
                              column.renderText(row[column.getFieldData]) : 
                              <>
                                {column.renderText !== undefined ? column.renderText(row[column.key]) : row[column.key]}
                              </>
                          }
                        </p>
                      }
                    </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
} 

export default TableView as React.ComponentClass<Props>;
