import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // /
  route("shader", "routes/shader/index.tsx", [
    route(":slug", "routes/shader/$slug.tsx"), // /shader/:slug
  ]),
] satisfies RouteConfig;
