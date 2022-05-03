This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Assumptions

1. Select a bus route from a list of available routes

- this is static, we can build time this

2. Select a direction for a bus route

- this is optimally static, we can build time this
- Build Limitation: directions are always 0 and 1, but 0 can be North or East, and 1 can be South or West.
  - For the purposes of performance, we're going to skip getting pretty-text on directions for each and merge as North/East and South/West
  - Recanting on this, we may as well fetch these at runtime on the client-side given the below. Then we can make the directions more clear.

3. For a given route and direction, display the stops
  - This is variable and will need to be fetched at runtime

4. Respond reasonably to browser back and forward buttons (for example, implement application routing)
  - To achieve this, I focused mostly on the page template and created an app shell with the core logic. Most of the pages simply request data and forward it through to the template.
  - in a similar responsive vein, this was developed small-view first. Necessary utility styles for breakpoints were added to scale up.

## Getting Started

After cloning, make sure the packages are installed

```bash
npm i
# or
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
npm test
# or
yarn test
```

* Complete coverage was pursued.
* Given more time, integration and visual regression tests would be pursued using libraries such as Cypress and/or Backstop.

![code coverage](/docs/code-coverage.png)

## Building

```bash
npm run build
# or
yarn build
```

## Snaps

**Loading**
![base](/docs/loading.png)

**Base**
![base](/docs/base.png)

**Small**
![base](/docs/res-sm.png)

**Medium**
![base](/docs/res-md.png)

**Large**
![base](/docs/res-lg.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
