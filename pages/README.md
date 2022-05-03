# Goal

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

- The "Show My Bus" mapping feature is not expected
