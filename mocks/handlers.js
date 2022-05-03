import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://svc.metrotransittest.org/nextripv2/routes",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          { route_id: "901", agency_id: 0, route_label: "METRO Blue Line" },
          { route_id: "902", agency_id: 0, route_label: "METRO Green Line" },
          { route_id: "906", agency_id: 10, route_label: "Airport Shuttle" },
          { route_id: "903", agency_id: 0, route_label: "METRO Red Line" },
        ])
      );
    }
  ),
  rest.get(
    "https://svc.metrotransittest.org/nextripv2/stops/*",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          { place_code: "122", description: "Minnetonka" },
          { place_code: "101", description: "MN Zoo" },
        ])
      );
    }
  ),
  rest.get(
    "https://svc.metrotransittest.org/nextripv2/directions/*",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          { direction_id: "0", direction_name: "Northbound" },
          { direction_id: "1", direction_name: "Southbound" },
        ])
      );
    }
  ),
];
