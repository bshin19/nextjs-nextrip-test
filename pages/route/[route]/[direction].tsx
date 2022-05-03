import { GetServerSideProps, NextPage } from "next";

interface NexTripStop {
  place_code: string;
  description: string;
}

interface NexTripStops {
  stops?: Array<NexTripStop>;
}

const Stops: NextPage<NexTripStops> = (props) => {
  const { stops } = props;

  return (
    <>
      <h3 className="text-center fg-secondary">Stops along route:</h3>
      <ul className="grid flex-wrap gap-1 list-none grid-implicit-rows-even break-word hyphens">
        {stops?.map(({ place_code, description }, i) => (
          <li
            key={place_code}
            className="bg-primary fg-inverse border p-.25 cols-12 cols-sm-6 cols-md-4 rounded flex align-center"
          >
            <div className="fs-1 fs-md-2">{"🚏"}</div>
            <span>
              {i + 1}. {description}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

/**
 * This gets called on every request of this page
 * `directions` gets fed to PageTemplate
 * `stops does as well, but is only used for the StopsComponent, currently
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params = {} } = context;

  const { route, direction } = params

  if (route === undefined || direction === undefined) return { props: { } };

  // Call the metrotransit api for our needed data
  // Given more time I'd figure out a way to skip this extra requests
  const res = await fetch(
    `https://svc.metrotransittest.org/nextripv2/stops/${route}/${direction}`
  );
  const directionsRes = await fetch(
    `https://svc.metrotransittest.org/nextripv2/directions/${route}`
  );

  const directions = await directionsRes.json();
  const stops = await res.json();

  // Pass data to the page via props
  return { props: { directions, stops } };
};

export default Stops;
