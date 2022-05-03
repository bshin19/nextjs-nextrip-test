import type { GetServerSideProps, NextPage } from "next";

/**
 * A selector for the direction the user wishes to go
 */
const Route: NextPage = () => null;

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  // Fetch data from external API
  const res = await fetch(
    `https://svc.metrotransittest.org/nextripv2/directions/${params?.route}`
  );

  const directions = await res.json();
  // Pass data to the page via props
  return { props: { directions } };
};

export default Route;
