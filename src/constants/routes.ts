import { ALL } from "dns";

export type RouteType = {
  name: string;
  href: string | ((id: string) => string);
  sec: "public" | "protected" | "admin";
};

export const PAGE_ROUTES = {
  AUTH: {
    FORGOT_PASSWORD: { name: "Forgot Password", href: "/forgot-password" },
    SIGN_IN: { name: "Sign In", href: "/signin" },
  },
  DASHBOARD: { name: "Dashboard", href: "/dashboard", sec: "protected" },
  TICKETS: {
    ALL: { name: "Tickets", href: "/tickets", sec: "protected" },
    CREATE: {
      name: "Create Ticket",
      href: "/tickets/create",
      sec: "protected",
    },
    VIEW: {
      name: "View Ticket",
      href: (id: string) => `/tickets/${id}`,
      sec: "protected",
    },
    ASSIGNEES: {
      name: "Assignees",
      href: "/tickets/assignees",
      sec: "protected",
    },
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/account/login",
    FORGOT_PASSWORD: "/account/forget-password",
    FORGOT_PASSWORD_VERIFICATION:
      "/account/forget-password/verification",
  },
  PROFILE: {
    GET_PROFILE: "/user/account",
    UPDATE_PROFILE: "/user/update-profile",
    UPDATE_PROFILE_PICTURE: "/user/update-profile-photo",
    CHANGE_PASSWORD: "/user/change-password",
  },
  DASHBOARD: {
    TICKETS: "/dashboard/tickets",
    PLATFORM: "/dashboard/platform",
    FREQUENT_ISSUES: "/dashboard/frequent-issues",
    TICKET_ASSIGNEES: "/dashboard/ticket-assignees",
    DAILY_TICKET_OVERVIEW: "/dashboard/ticket-overview",
  },
  TICKETS: {
    ALL_TICKETS: "/tickets/all",
    CREATE_TICKET: "/tickets/create",
    POST_COMMENT: "/tickets/comment/create",
    TICKET_UPDATE: `/tickets/update`,
    TICKET_DETAILS: (id: string) => `/tickets/details/${id}`,
    TICKET_COMMENTS: (id: string) => `/tickets/${id}/comments`,

  },
  REPORTS: {
    ALL: "/reports/filters",
    ALL_REPORTS: "/reports/platform",
    ALL_REPORTS_BY_EMPLOYEES: "/reports/employee",
    ALL_REPORTS_BY_DATE: "/reports/date",
    ALL_REPORTS_PRIORITY: "/reports/priority",
    ALL_REPORTS_CATEGORY: "/reports/category",
  },
  ACCOUNT: {
    ALL_EMPLOYEES: "/employees",
    CHANGE_PASSWORD: "/user/change-password",
    ENABLE_DISABLE_USER: "/employees/disable-enable",
    ENABLE_FOR_PLATFORM_NOTIFICATION: "/tickets/enable-for-platform-notification",
  },
  CATEGORY: {
    CREATE: "/category/create",
    EDIT: "/category/edit",
    ALL_CATEGORIES: "/category/all",
    MAIN_CATEGORIES: "/category/main",
    SUB_CATEGORIES: (id: string) =>
      `/category/sub/${id}`,
  },
  SETTINGS: {
    ADD_EMPLOYEE: "/employees/create",
  },
  ROLES: "/user/roles",
  AUDIT_LOGS: "/reports/audit-logs"
} as const;
