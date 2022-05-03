import { render } from "@testing-library/react";
import Route, { getServerSideProps } from "../pages/route/[route]";

describe("Route", () => {
  it("should match default", () => {
    const { container } = render(<Route />);
    expect(container).toMatchSnapshot();
  });
});

describe("getServerSideProps", () => {
  it("should return the appropriate props", async () => {
    const context = { params: { route: 100 } };
    expect(await getServerSideProps(context as any)).toMatchSnapshot();
  });

  it('should return empty object without correct props', async () => {
    const context = { };
    expect(await getServerSideProps(context as any)).toMatchSnapshot();
  })
});
