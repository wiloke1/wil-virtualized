declare module "wil-virtualized" {
  export interface WilVirtualizedProps {
    data: Array<any>;
    renderItem: (item: any, index: number) => React.ReactNode;
    scroller: string;
    containerClassName: string;
    onEndReached: () => void;
    onEndReachedThreshold: number;
  }

  export interface WilVirtualizedState {
    ready: boolean;
    data: Array<any>;
    start: number;
    end: number;
    measures: Array<Object>;
    prevMeasures: Array<Object>;
    containerHeight: number;
    containerTop: number;
    scrollerHeight: number;
    scrollerTop: number;
    isEndReached: boolean;
  }

  export default class WilVirtualized<ValidatorState extends object> {
    state: WilVirtualizedState;
    props: WilVirtualizedProps;
  }
}
