// @flow
import React, { PureComponent } from "react";

type Props = {
  onMeasure: (measure: Object) => void,
  children: React$Node,
  didUpdate: boolean
};

class Sizer extends PureComponent<Props> {
  static defaultProps = {
    onMeasure: (measure: Object): void => {},
    didUpdate: false
  };

  _elementRef: ?HTMLElement;

  componentDidUpdate(): void {
    const { onMeasure, didUpdate }: Props = this.props;
    if (didUpdate && this._elementRef) {
      onMeasure(this._elementRef.getBoundingClientRect());
    }
  }

  refCallback = (element: any): void => {
    const { onMeasure }: Props = this.props;
    if (element) {
      this._elementRef = element;
      onMeasure(element.getBoundingClientRect());
    }
  };

  render(): React$Node {
    // eslint-disable-next-line no-unused-vars
    const { onMeasure, children, didUpdate, ...props }: Props = this.props;
    return (
      <div {...props} ref={this.refCallback}>
        {children}
      </div>
    );
  }
}

export default Sizer;
