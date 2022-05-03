import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Select from "./select";
import useSWR from "swr";

export interface NexTripRoute {
  route_id: string;
  agency_id: number;
  route_label: string;
}

export interface NexTripMapper {
  routes: Array<NexTripRoute>;
}

interface NexTripDirection {
  direction_id: number;
  direction_name: string;
}

interface NexTripDirections {
  directions: Array<NexTripDirection>;
}

interface PageTemplateProps
  extends Partial<NexTripMapper>,
    Partial<NexTripDirections> {
  children?: React.ReactNode;
}

export const fetcher = async (args: any) => {
  const res = await fetch(args)
  return res.json()
}

export default function PageTemplate(props: PageTemplateProps) {
  const { children, directions } = props;

  const { data, error } = useSWR(
    "https://svc.metrotransittest.org/nextripv2/routes",
    fetcher
  );
  const router = useRouter();

  const routeSelectProps = {
    id: "routes",
    description: "Choose a bus route:",
  };

  const directionSelectProps = {
    id: "directions",
    description: "Choose a direction:",
  };

  const routes: Array<NexTripRoute> = data;

  if (error) return <div>failed to load</div>;

  // Loading fallback
  if (!routes)
    return (
      <main className="m-1 m-sm-2 m-md-4 p-2 pb-5 grow grid bg-base rel rounded">
        <h1 className="fs-2 text-center fg-primary leading-none mb-1 cols-12">
          NexTrip: Metro Transit
        </h1>
        <h2 className="fs-1.5 text-center mb-2 fg-secondary leading-none border-b cols-12 mx-auto">
          Explore Minnesota
          <i className="block ml-.25 italic fs-1 fg-accent-primary">
            Without Worrying About the Traffic
          </i>
        </h2>
        <div className="cols-12 flex flex-col mx-auto">
          <Select className="shimmer" {...routeSelectProps} />
          <Select className="shimmer" {...directionSelectProps} />
        </div>
        <a
          href="https://www.metrotransit.org/nextrip"
          aria-label="Learn more about MetroTransit NexTrip"
          className="pointer abs t-.25 r-.75 h-2 w-4 shimmer"
        />
      </main>
    );

  const {
    query: { route, direction },
  } = router;

  const onRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push("/route/" + event.target.value);
  };

  const onDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    router.push(`/route/${route}/${value}`);
  };

  return (
    <>
      <Head>
        <title>NexTrip in NextJs Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-1 m-sm-2 m-md-4 p-2 pb-5 grow grid bg-base rel rounded">
        <h1 className="fs-2 text-center fg-primary leading-none mb-1 cols-12">
          NexTrip: Metro Transit
        </h1>
        <h2 className="fs-1.5 text-center mb-2 fg-secondary leading-none border-b cols-12 mx-auto">
          Explore Minnesota
          <i className="block ml-.25 italic fs-1 fg-accent-primary">
            Without Worrying About the Traffic
          </i>
        </h2>
        <div className="cols-12 flex flex-col mx-auto">
          <Select
            {...routeSelectProps}
            onChange={onRouteChange}
            defaultValue={route}
          >
            <option value="">Select an available route</option>
            {routes.length && routes.map(({ route_id, route_label }) => (
              <option key={route_id} value={route_id}>
                {route_label}
              </option>
            ))}
          </Select>
          <Select
            {...directionSelectProps}
            onChange={onDirectionChange}
            disabled={!directions}
            defaultValue={direction?.toString()}
          >
            <option value="">Select a direction</option>
            {directions?.map(({ direction_id, direction_name }) => (
              <option key={direction_id} value={direction_id}>
                {direction_name}
              </option>
            ))}
          </Select>
        </div>
        <div className="cols-12">{children}</div>
        <a
          aria-label="Learn more about MetroTransit NexTrip"
          href="https://www.metrotransit.org/nextrip"
          className="pointer abs t-.25 r-.75"
        >
          <Image src="/mn-logo.jpg" alt="MN Logo" width={64} height={32} />
        </a>
      </main>
      {/* TODO: classes and styles were made for dark mode flipping, but alas time */}
      {/* <footer className=""><input type="checkbox" id="dark-mode"/><label>Go </label></footer> */}
    </>
  );
}
