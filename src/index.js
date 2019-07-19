// @flow
import React, { Component } from "react";
import Sizer from "./Sizer";

type Props = {
  data: Array<any>,
  renderItem: (item: any, index: number) => React$Node,
  scroller: string,
  containerClassName: string,
  onEndReached: () => void,
  onEndReachedThreshold: number
};

type State = {
  ready: boolean,
  data: Array<any>,
  start: number,
  end: number,
  measures: Array<Object>,
  prevMeasures: Array<Object>,
  containerHeight: number,
  containerTop: number,
  scrollerHeight: number,
  scrollerTop: number,
  isEndReached: boolean
};

export default class WilVirtualized extends Component<Props, State> {
  static defaultProps = {
    renderItem: (item: any, index: number): React$Node => null,
    scroller: null,
    containerClassName: "",
    onEndReached: (): void => {},
    onEndReachedThreshold: 50
  };

  state = {
    ready: false,
    data: [],
    start: 0,
    end: 0,
    measures: [],
    prevMeasures: [],
    containerHeight: 0,
    containerTop: 0,
    scrollerHeight: 0,
    scrollerTop: 0,
    isEndReached: false
  };

  $scroller = null;

  _timeoutDebounce = null;

  _addToQueue = null;

  _top = 0;

  $container: ?HTMLElement;

  async componentDidMount(): Promise<void> {
    const { scroller }: Props = this.props;
    this.$scroller =
      scroller === "window" ? window : document.querySelector(scroller);
    await this._setData();
    this._setScrollerMeasure();
    this._setStateAfterDataMount();

    if (this.$scroller) {
      this.$scroller.addEventListener("scroll", this._handleScroll);
      window.addEventListener("resize", this._handleWindowResize);
    }
  }

  async componentDidUpdate(prevProps: Props, prevState: State): Promise<void> {
    const { data }: Props = this.props;
    if (data.length > prevState.data.length) {
      await this._setData();
      await this._setIsEndReached(true);
      this._setScrollerMeasure();
      this._updateContainerHeight();
      this._setIsEndReached(false);
    }
  }

  componentWillUnmount(): void {
    if (this.$scroller) {
      this.$scroller.removeEventListener("scroll", this._handleScroll);
    }
    window.removeEventListener("resize", this._handleWindowResize);
    clearTimeout(this._addToQueue);
  }

  _debounce = (cb: Function, time: number = 300): void => {
    clearTimeout(this._timeoutDebounce);
    this._timeoutDebounce = setTimeout(async (): Promise<void> => {
      cb();
    }, time);
  };

  _setContainerRef = (c: any): void => {
    this.$container = c;
  };

  _setData = async (): Promise<void> => {
    const { data }: Props = this.props;
    await this.setState({
      data
    });
  };

  _setIsEndReached = async (value: boolean): Promise<void> => {
    await this.setState({
      isEndReached: value
    });
  };

  _getContainerHeightReached = (): number => {
    const { measures, prevMeasures }: State = this.state;
    return measures.reduce(
      (num: number, item: Object, index: number): number => {
        const min: number = prevMeasures.length - 1;
        const max: number = measures.length - 1;
        return min <= index && index <= max ? num + item.height : num;
      },
      0
    );
  };

  _updateContainerHeight = (): void => {
    const { containerHeight }: State = this.state;
    const reachedHeight: number = this._getContainerHeightReached();
    this.setState({
      containerHeight: containerHeight + reachedHeight
    });
  };

  _setStateAfterDataMount = (): void => {
    this._addToQueue = setTimeout((): void => {
      const scrollTop: number = 0;
      const end: number = this._getEndIndex(scrollTop);
      if (this.$container) {
        const {
          top,
          height
        }: { [string]: number } = this.$container.getBoundingClientRect();
        this.setState({
          containerHeight: height,
          containerTop: top,
          start: 0,
          end,
          ready: true
        });
      }
    }, 0);
  };

  _getStartIndex = (scrollTop: number): number => {
    const { measures, scrollerTop, containerTop }: State = this.state;
    return measures.reduce(
      (num: number, item: Object, index: number): number => {
        const { top, height }: { [string]: number } = measures[index];
        const isBefore: boolean =
          Math.trunc(scrollTop + scrollerTop - containerTop) >= Math.trunc(top);
        const isAfter: boolean =
          Math.trunc(scrollTop + scrollerTop - containerTop) <=
          Math.trunc(top + height);
        return isBefore && isAfter ? index : num;
      },
      0
    );
  };

  _getEndIndex = (scrollTop: number): number => {
    const {
      measures,
      scrollerHeight,
      scrollerTop,
      containerTop
    }: State = this.state;
    return (
      measures.reduce((num: number, item: Object, index: number): number => {
        const { top, height }: { [string]: number } = measures[index];
        const fixer: number = 10;
        const isBefore: boolean =
          Math.trunc(scrollTop + scrollerHeight + scrollerTop - containerTop) >=
          Math.trunc(top);
        const isAfter: boolean =
          Math.trunc(scrollTop + scrollerHeight + scrollerTop - containerTop) <=
          Math.trunc(top + height + fixer);
        return isBefore && isAfter ? index : num;
      }, 0) + 1
    );
  };

  _setScrollerMeasure = async (): Promise<void> => {
    const { scroller }: Props = this.props;
    if (this.$scroller && !!scroller) {
      if (scroller === "window") {
        await this.setState({
          scrollerHeight: window.innerHeight,
          scrollerTop: 0
        });
        return;
      }
      this.$scroller = document.querySelector(scroller);
      const { top, height }: { [string]: number } = this.$scroller
        ? this.$scroller.getBoundingClientRect()
        : {
            top: 0,
            height: 0
          };
      await this.setState({
        scrollerHeight: height,
        scrollerTop: top
      });
    }
  };

  _handleWindowResize = (): void => {
    this._debounce(
      async (): Promise<void> => {
        await this._setScrollerMeasure();
        this._updateStartIndexAndEndIndex();
      }
    );
  };

  _handleMeasures = (measure: Object): void => {
    const { measures, data }: State = this.state;
    if (measures.length < data.length) {
      this.setState(
        ({ measures }: State): $Shape<State> => {
          this._top = this._top + measure.height;
          return {
            measures: [
              ...measures,
              {
                top: this._top - measure.height,
                height: measure.height
              }
            ],
            prevMeasures: measures
          };
        }
      );
    }
  };

  _getScrollTop = (): number => {
    const { scroller }: Props = this.props;
    const doc: Object = document.documentElement;
    const windowScrollTop: number =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (scroller === "window") {
      return windowScrollTop;
    }
    return this.$scroller ? this.$scroller.scrollTop : 0;
  };

  _updateStartIndexAndEndIndex = async (): Promise<void> => {
    const scrollTop: number = this._getScrollTop();
    const start: number = this._getStartIndex(scrollTop);
    const end: number = this._getEndIndex(scrollTop);
    this.setState({
      start,
      end
    });
  };

  _handleScroll = (): void => {
    const { onEndReached, onEndReachedThreshold }: Props = this.props;
    const {
      containerHeight,
      containerTop,
      scrollerHeight,
      scrollerTop
    }: State = this.state;
    const scrollTop: number = this._getScrollTop();
    const condition: boolean =
      Math.trunc(scrollTop - containerTop) + onEndReachedThreshold >=
      Math.trunc(containerHeight - scrollerHeight - scrollerTop);
    this._updateStartIndexAndEndIndex();
    this._debounce((): void => {
      if (condition) {
        onEndReached();
      }
    }, 50);
  };

  _checkVisible = (index: number): boolean => {
    const { start, end, ready }: State = this.state;
    return ready ? start <= index && index < end : true;
  };

  _getItemStyles = (index: number): Object => {
    const { measures, ready }: State = this.state;
    return ready && measures[index]
      ? {
          position: "absolute",
          width: "100%",
          height: measures[index].height,
          top: Math.trunc(measures[index].top)
        }
      : {};
  };

  _renderItem = (item: any, index: number): React$Node => {
    const { renderItem }: Props = this.props;
    const { isEndReached }: State = this.state;
    const visible: boolean = this._checkVisible(index);
    const style: Object = this._getItemStyles(index);
    return (
      visible && (
        <Sizer
          key={index}
          onMeasure={this._handleMeasures}
          style={style}
          didUpdate={isEndReached}
        >
          {renderItem(item, index)}
        </Sizer>
      )
    );
  };

  render(): React$Node {
    const { containerClassName }: Props = this.props;
    const { data, containerHeight }: State = this.state;
    return (
      <div
        ref={this._setContainerRef}
        style={{ position: "relative", minHeight: containerHeight }}
        className={containerClassName}
      >
        {data.map(this._renderItem)}
      </div>
    );
  }
}
