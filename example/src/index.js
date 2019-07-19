import React from "react";
import ReactDOM from "react-dom";
import WilVirtualized from "../../lib/index.js";

class App extends React.Component {
  state = {
    data: Array(1000)
      .fill(null)
      .map((item, index) => `List ${index}`)
  };
  render() {
    return (
      <div className="App">
        <h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h2>
        <WilVirtualized
          scroller=".App"
          data={this.state.data}
          renderItem={(item, index) => {
            return (
              <div
                className="item"
                style={{
                  height: (index + 1) * 60 < 300 ? (index + 1) * 60 : 60
                }}
              >
                {item}
              </div>
            );
          }}
          onEndReached={() => {
            console.log("loadmore");
            if (this.state.data.length < 1200) {
              this.setState({
                data: [
                  ...this.state.data,
                  ...Array(50)
                    .fill(null)
                    .map((item, index) => `List load ${index}`)
                ]
              });
            }
          }}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
