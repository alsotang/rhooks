import * as React from "react";
import { useEffect } from "react";
import { cleanup, fireEvent, render } from "react-testing-library";
import { useConstructor, useDidMount, useDidUpdate, useForceRender, useInterval, useWillUnmount } from "../src/rhooks";

afterEach(cleanup);

describe("useConstructor", () => {
  it("should before didMount, and only run once", () => {
    let count = 0;

    const App = () => {
      useConstructor(() => {
        count += 1;
      });

      useEffect(() => {
        if (count === 0) {
          throw new Error("useConstructor should run before didMount");
        }
      }, []);

      return (<div></div>);
    };

    const { rerender } = render(<App />);
    rerender(<App />);
    rerender(<App />);

    expect(count).toEqual(1);
  });
});

describe("useDidMount", () => {
  it("should after useConstructor, and only run once", () => {
    let count = 0;

    const App = () => {
      useConstructor(() => {
        count += 1;
      });

      useDidMount(() => {
        if (count === 0) {
          throw new Error("useConstructor should run before didMount");
        }
        count += 1;
      });

      return (<div></div>);
    };

    const { rerender } = render(<App />);
    rerender(<App />);
    rerender(<App />);

    expect(count).toEqual(2);
  });
});

describe("useDidUpdate", () => {
  it("should run when update, but not mounted", () => {
    let updateCount = 0;
    let effectCount = 0;

    const App = () => {
      useDidUpdate(() => {
        updateCount++;
      });

      useEffect(() => {
        effectCount++;
      });

      return (<div></div>);
    };

    const { rerender } = render(<App />);
    rerender(<App />);
    rerender(<App />);

    expect(updateCount).toEqual(2);
    expect(effectCount).toEqual(3);
  });
});

describe("useWillUnmount", () => {
  it("should called when unmount", () => {
    let unmountCount = 0;
    const App = () => {
      useWillUnmount(() => {
        unmountCount++;
      });

      return (<div></div>);
    };

    const { unmount } = render(<App />);
    expect(unmountCount).toEqual(0);
    unmount();
    expect(unmountCount).toEqual(1);

  });
});

describe("useForceRender", () => {
  it("should render 5 times", () => {
    let renderCount = 0;
    let prevForceRender: () => void;
    const App = () => {
      renderCount++;
      const forceRender = useForceRender();

      if (prevForceRender) {
        expect(prevForceRender).toEqual(forceRender);
      }

      prevForceRender = forceRender;

      return (<div onClick={() => forceRender()}></div>);
    };

    const { container } = render(<App />);
    const div = container.querySelector("div");
    fireEvent.click(div);
    fireEvent.click(div);
    fireEvent.click(div);
    fireEvent.click(div);
    expect(renderCount).toEqual(5);
  });
});

describe("useInterval", () => {
  it("should ", (done) => {
    let count = 0;
    const App = () => {
      useInterval(() => {
        count++;
      }, 100);
      return <></>;
    };

    render(<App />);

    setTimeout(() => {
      expect(count).toEqual(5);
      done();
    }, 510);
  });
});
