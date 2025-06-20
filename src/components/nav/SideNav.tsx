"use client";
import { PAGE_ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { GrFormClose, GrMenu } from "react-icons/gr";
import {
  TbCategory2,
  TbLayoutDashboard,
  TbLogout,
  TbLogs,
  TbReportSearch,
  TbSettings,
  TbTicket,
  TbUser,
} from "react-icons/tb";

interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      path: PAGE_ROUTES.DASHBOARD.href,
      name: "Dashboard",
      icon: <TbLayoutDashboard />,
    },
    { path: "/tickets", name: "Tickets", icon: <TbTicket /> },
    { path: "/create", name: "Create Tickets", icon: <TbTicket /> },
    { path: "/users", name: "Employees", icon: <TbUser /> },
    { path: "/reports", name: "Reports", icon: <TbReportSearch /> },
    { path: "/categories", name: "Categories", icon: <TbCategory2 /> },
    { path: "/audit-logs", name: "Audit Logs", icon: <TbLogs /> },
    { path: "/profile", name: "Profile", icon: <TbSettings /> },
  ];

  const bottomNav: NavItem[] = [
    { path: "/signin", name: "Log out", icon: <TbLogout /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-gray-600"
        onClick={toggleSidebar}
      >
        {isOpen ? <GrFormClose size={28} /> : <GrMenu size={24} />}
      </button>

      <div
        className={`fixed top-16 z-[99999] left-0 h-full bg-secondary-light text-white w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="mt-10">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex font-semibold items-center px-6 py-3 transition-colors duration-200
        ${
          isActive
            ? "bg-primary text-white"
            : "text-gray-900 hover:bg-stone-300"
        }`}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="w-full border-t border-gray-400">
          {bottomNav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-red-500 flex items-center px-6 py-3 transition-colors duration-200
                ${
                  pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-900 hover:bg-primary hover:text-white"
                }`}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
