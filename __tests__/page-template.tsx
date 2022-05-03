import PageTemplate from "../components/page-template";
import { render } from "@testing-library/react";
import { SWRConfig } from "swr";

describe("PageTemplate", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  const fallback = {
    "https://svc.metrotransittest.org/nextripv2/routes": [
      { route_id: "901", agency_id: 0, route_label: "METRO Blue Line" },
    ],
  };

  afterEach(() => jest.resetAllMocks());
  it("should match failed request path", () => {
    const { container } = render(<PageTemplate />);

    expect(container).toMatchSnapshot();
  });

  it("should match loading", () => {
    useRouter.mockImplementation(() => ({
      query: {},
      asPath: "https://svc.metrotransittest.org/nextripv2/routes",
    }));

    const { container } = render(
      <SWRConfig
        value={{
          fallback: {
            "https://svc.metrotransittest.org/nextripv2/routes": false,
          },
        }}
      >
        <PageTemplate />
      </SWRConfig>
    );

    expect(container).toMatchSnapshot();
  });

  describe("successful request", () => {
    it("should match", () => {
      useRouter.mockImplementation(() => ({
        query: {},
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { container } = render(
        <SWRConfig value={{ fallback }}>
          <PageTemplate />
        </SWRConfig>
      );

      expect(container).toMatchSnapshot();
    });

    it("should match with all props", () => {
      useRouter.mockImplementation(() => ({
        query: {},
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const directions = [
        {
          direction_id: 0,
          direction_name: "Northbound",
        },
        {
          direction_id: 1,
          direction_name: "Southbound",
        },
      ];

      const { container } = render(
        <SWRConfig value={{ fallback }}>
          <PageTemplate directions={directions}>
            <div>My child</div>
          </PageTemplate>
        </SWRConfig>
      );

      expect(container).toMatchSnapshot();
    });

    it("should match with route data", () => {
      useRouter.mockImplementation(() => ({
        query: { route: "901", direction: 0 },
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { container } = render(
        <SWRConfig
          value={{
            fallback: {
              "https://svc.metrotransittest.org/nextripv2/routes": [
                {
                  route_id: "901",
                  agency_id: 0,
                  route_label: "METRO Blue Line",
                },
                {
                  route_id: "902",
                  agency_id: 0,
                  route_label: "METRO Green Line",
                },
                {
                  route_id: "906",
                  agency_id: 10,
                  route_label: "Airport Shuttle",
                },
                {
                  route_id: "903",
                  agency_id: 0,
                  route_label: "METRO Red Line",
                },
              ],
            },
          }}
        >
          <PageTemplate />
        </SWRConfig>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
