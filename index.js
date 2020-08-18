import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Filter,
  Inject
} from "@syncfusion/ej2-react-grids";
import { categoryData } from "./data";
import { SampleBase } from "./sample-base";

import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from "./property-pane";
export class Filtering extends SampleBase {
  state = { logs: [] };

  onActionBegin = args => {
    if (args.requestType == "filtering") {
      const columns = args.columns.map(predicate => predicate.properties.field);
      // Here I have the info about the filtered columns
      this.setState({
        logs: [
          ...this.state.logs,
          "Action 'filtering' triggered " + JSON.stringify(columns)
        ]
      });
    }
  };

  onDataBind = () => {
    const filterInfo = this.gridInstance.getFilterUIInfo();
    // Here I DON'T have the info about the filtered columns
    this.setState({
      logs: [
        ...this.state.logs,
        "dataBind triggered " + JSON.stringify(filterInfo)
      ]
    });
  };

  render() {
    return (
      <div className="control-pane">
        <div className="col-lg-9 control-section row">
          <GridComponent
            dataSource={categoryData}
            allowPaging={true}
            ref={grid => (this.gridInstance = grid)}
            pageSettings={{ pageSize: 5 }}
            allowFiltering={true}
            dataBound={this.onDataBind}
            actionBegin={this.onActionBegin}
            enablePersistence={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="ProductName"
                headerText="Product Name"
                width="150"
              />
              <ColumnDirective
                field="UnitsInStock"
                headerText="Units In Stock"
                width="150"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Filter, Page]} />
          </GridComponent>
        </div>

        <div>
          <b>Log:</b>
          {this.state.logs.map((logRow, id) => (
            <div key={id}>&gt; {logRow}</div>
          ))}
        </div>
      </div>
    );
  }
}

render(<Filtering />, document.getElementById("sample"));
