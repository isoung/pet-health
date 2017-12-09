// import * as Plottable from 'plottable';
import * as React from 'react';
import { compose, gql, graphql } from 'react-apollo';

import { DeviceList } from '_client/components/deviceList/DeviceList';

export class DashboardContainerComponent extends React.Component<any, any> {
  public static deviceListQuery = gql`
    {
      devices {
        name,
        serialNumber
      }
    }
  `;

  public componentDidMount() {
    // this.generateLineGraph();
  }

  public render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <DeviceList devices={this.props.data.devices}/>
    );
  }
}

export const DashboardContainer: any = compose(
  graphql(DashboardContainerComponent.deviceListQuery)
)(DashboardContainerComponent);
