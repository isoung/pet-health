import * as React from 'react';
import { compose, gql, graphql } from 'react-apollo';

import { NewDeviceFormModal } from '_client/components/newDeviceFormModal/NewDeviceFormModal';
import { DashboardContainerComponent } from '_client/containers/dashboard/DashboardContainer';

declare var $: any;

class NewDeviceFormComponent extends React.Component<any, any> {
  public static createDeviceQuery = gql`
    mutation createDevice($serialNumber: String!, $name: String!) {
      createdDevice: createDevice(deviceCreate: {serialNumber: $serialNumber, name: $name}) {
        serialNumber,
        name
      }
    }
  `;

  constructor(props?: any) {
    super(props);

    this.createDevice = this.createDevice.bind(this);
  }

  public render() {
    const loading = this.props.data ? this.props.data.loading : false;
    // console.log(this.props);
    return (
      <NewDeviceFormModal createDevice={this.createDevice} loading={loading}/>
    );
  }

  private async createDevice(serialNumber: string, name: string) {
    try {
      const res = await this.props.createDevice({
        variables: {
          serialNumber: serialNumber,
          name: name
        },
        refetchQueries: [{
          query: gql`${DashboardContainerComponent.deviceListQuery}`
        }]
      });

      // {
      //   variables: {
      //     serialNumber: serialNumber,
      //     name: name
      //   },
      //   options: {
      //     refetchQueries: [{
      //       query: gql(DashboardContainerComponent.deviceListQuery)
      //     }],
      //   }
      // }
      if (!res) {
        throw new Error();
      }

      $('#newDeviceFormModal').modal('close');
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const NewDeviceFormContainer: any = compose(
  graphql(NewDeviceFormComponent.createDeviceQuery, {
    name: 'createDevice'
  })
)(NewDeviceFormComponent);
