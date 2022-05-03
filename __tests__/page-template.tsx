import PageTemplate, { fetcher } from "../components/page-template";
import { fireEvent, render } from "@testing-library/react";
import { SWRConfig } from "swr";

describe("PageTemplate", () => {
  let useRouter: any, windowFetchSpy;

  const fallback = {
    "https://svc.metrotransittest.org/nextripv2/routes": [
      { route_id: "901", agency_id: 0, route_label: "METRO Blue Line" },
    ],
  };

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

  beforeEach(
    () => (useRouter = jest.spyOn(require("next/router"), "useRouter"))
  );

  afterEach(() => jest.restoreAllMocks());

  it("should match failed request path", () => {
    let swrSpy = jest.spyOn(require("swr"), "default");
    swrSpy.mockReturnValue({ error: true });

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

      const { container } = render(<PageTemplate />);

      expect(container).toMatchSnapshot();
    });

    it('should render with empty routes array', () => {
      let swrSpy = jest.spyOn(require("swr"), "default");
      swrSpy.mockReturnValue({ data: { routes: [] }});

      useRouter.mockImplementation(() => ({
        query: {},
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { container } = render(<PageTemplate />);

      expect(container).toMatchSnapshot();
    })

    it("should match with all props", () => {
      useRouter.mockImplementation(() => ({
        query: {},
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { container } = render(
        <SWRConfig value={{ fallback }}>
          <PageTemplate directions={directions}>
            <div>My child</div>
          </PageTemplate>
        </SWRConfig>
      );

      expect(container).toMatchSnapshot();
    });

    it('should invoke onRouteChange with the expected args', () => {
      
      const onRouteChangeListener = jest.fn()
      useRouter.mockImplementation(() => ({
        query: {},
        push: onRouteChangeListener,
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { getAllByRole } = render(
        <SWRConfig value={{ fallback }}>
          <PageTemplate directions={directions}/>
        </SWRConfig>
      );

      expect(onRouteChangeListener).not.toHaveBeenCalled()

      fireEvent.change(getAllByRole('combobox')[0])

      expect(onRouteChangeListener).toHaveBeenCalledWith('/route/')

    })

    it('should invoke onDirectionChange with the expected args', () => {
      
      const onDirectionChange = jest.fn()
      const route = 'wow'
      useRouter.mockImplementation(() => ({
        query: { route },
        push: onDirectionChange,
        asPath: "https://svc.metrotransittest.org/nextripv2/routes",
      }));

      const { getAllByRole } = render(
        <SWRConfig value={{ fallback }}>
          <PageTemplate directions={directions}/>
        </SWRConfig>
      );

      expect(onDirectionChange).not.toHaveBeenCalled()

      fireEvent.change(getAllByRole('combobox')[1])

      expect(onDirectionChange).toHaveBeenCalledWith(`/route/${route}/`)

    })

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

// just covering the code that exists here, given more time would expand on functionality and what codes we're looking for
describe("fetcher", () => {
  it("should fetch and parse json", async () => {
    expect(
      await fetcher("https://svc.metrotransittest.org/nextripv2/routes")
    ).toMatchSnapshot();
  });
});
