// import * as Plottable from 'plottable';
import * as React from 'react';
import { compose, gql, graphql } from 'react-apollo';

export class DashboardContainerComponent extends React.Component<any, any> {
  public static deviceListQuery = gql`
    {
      devices {
        name
      }
    }
  `;

  public componentDidMount() {
    // this.generateLineGraph();
  }

  public render() {
    console.log(this.props);
    return (
      <div>
        {/* <svg height={222} width={444} id='example' className='plottable'/> */}
      </div>
    );
  }

  // private generateLineGraph() {
  //   console.log('started');
  //   const xScale: any = new Plottable.Scales.Category();
  //   const yScale = new Plottable.Scales.Linear();

  //   const data = [
  //     { x: 1, y: 1 },
  //     { x: 2, y: 3 },
  //     { x: 3, y: 2 },
  //     { x: 4, y: 4 },
  //     { x: 5, y: 3 },
  //     { x: 6, y: 5 },
  //     { x: 7, y: -9 },
  //     { x: 8, y: -22 }
  //   ];

  //   const plot = new Plottable.Plots.Line();
  //   plot.addDataset(new Plottable.Dataset(data));
  //   plot.x((d) => d.x, xScale);
  //   plot.y((d) => d.y, yScale);
  //   plot.renderTo('svg#example');

  //   window.addEventListener('resize', function() {
  //     plot.redraw();
  //   });
  // }
}

export const DashboardContainer: any = compose(
  graphql(DashboardContainerComponent.deviceListQuery)
)(DashboardContainerComponent);
