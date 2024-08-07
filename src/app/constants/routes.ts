export const routes = {
  home: "/",
  login: "/login",
  logout: "/logout",
  register: "/register",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",
  users: "/users",
  userCreate: "/user/create",
  user: (id: string | number) => `/user/${id}`,
  notFound: "/404",
  error: "/500",
};
