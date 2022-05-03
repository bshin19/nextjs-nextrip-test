import { render } from "@testing-library/react";
import Home from "../pages";

describe("Home", () => {
  it("should match default", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
