import * as Plottable from 'plottable';
import * as React from 'react';
import * as CSSModules from 'react-css-modules';

declare var $: any;

interface IChartModalComponent {
  open: boolean;
  serialNumber: number;
  data: [{ publishedDate: number, value: number }];
}

const styles = require('./_ChartModal.scss');
@CSSModules(styles)
export class ChartModalComponent extends React.Component<IChartModalComponent, any> {
  constructor(props?: any) {
    super(props);

    this.generateLineGraph = this.generateLineGraph.bind(this);
  }

  public render() {
    return (
      <div className='modal' id='modal1' styleName='modal'>
        <div>
          <svg id='example' className='plottable'/>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    if (this.props.data !== undefined) {
      this.generateLineGraph();
    }
  }

  public componentDidUpdate() {
    if (this.props.data !== undefined) {
      this.generateLineGraph();
    }
  }

  private generateLineGraph() {
    $('#example').empty();
    const xScale: any = new Plottable.Scales.Time();
    const yScale = new Plottable.Scales.Linear();

    const xAxis = new Plottable.Axes.Time(xScale, 'bottom');
    const yAxis = new Plottable.Axes.Numeric(yScale, 'left');

    const data = this.props.data.map((value, index) => {
      return { x: value.publishedDate, y: value.value };
    });

    const plot = new Plottable.Plots.Line();
    plot.datasets([new Plottable.Dataset(data)]);
    plot.x((d) => d.x, xScale);
    plot.y((d) => d.y, yScale);

    const areaChart = new Plottable.Components.Table([[null, null], [yAxis, plot], [null, xAxis]]);
    areaChart.renderTo('svg#example');

    window.addEventListener('resize', function() {
      plot.redraw();
    });
  }
}
