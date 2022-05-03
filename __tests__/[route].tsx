import { render } from "@testing-library/react";
import Route, { getServerSideProps } from "../pages/route/[route]";

describe("Route", () => {
  it("should match default", () => {
    const { container } = render(<Route />);
    expect(container).toMatchSnapshot();
  });
});

describe("getServerSideProps", () => {
  const context = { params: { route: 100 } };
  it("should return the appropriate props", async () => {
    expect(await getServerSideProps(context as any)).toMatchSnapshot();
  });
});
