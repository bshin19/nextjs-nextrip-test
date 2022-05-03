import { render } from "@testing-library/react";
import Stops, { getServerSideProps } from "../pages/route/[route]/[direction]";

describe("Stops", () => {
  it("should match minimum config", () => {
    const { container } = render(<Stops />);

    expect(container).toMatchSnapshot();
  });

  it("should match with stops", () => {
    const { container } = render(
      <Stops
        stops={[
          { place_code: "901", description: "MN State Capitol" },
          { place_code: "48", description: "Mall of America" },
        ]}
      />
    );

    expect(container).toMatchSnapshot();
  });
});

describe("getServerSideProps", () => {
  const context = { params: { route: 100, direction: 0 } };
  it("should return the appropriate props", async () => {
    expect(await getServerSideProps(context as any)).toMatchSnapshot();
  });
});
