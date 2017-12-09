import * as React from 'react';
import { compose, gql, graphql } from 'react-apollo';

import { ChartModalComponent } from '_client/components/chartModal/ChartModal';

class ChartModalComponentContainer extends React.Component<any, any> {
  public static dataValueReadQuery = gql`
    query readDataValuesByRange($serialNumber: String!, $range: Int!) {
      dataValues(serialNumber: $serialNumber, range: $range) {
        publishedDate,
        value
      }
    }
  `;

  public render() {
    const data = this.props.readDataValuesByRange ? this.props.readDataValuesByRange.dataValues : [];

    return (
      <ChartModalComponent open={this.props.open} serialNumber={this.props.serialNumber} data={data}/>
    );
  }
}

export const ChartModalContainer: any = compose(
  graphql(ChartModalComponentContainer.dataValueReadQuery, {
    name: 'readDataValuesByRange',
    options: {
      pollInterval: 10000
    },
    skip: (props) => props.serialNumber === ''
  })
)(ChartModalComponentContainer);
