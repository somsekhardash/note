import React from 'react'
import { Link, Outlet } from "react-router-dom";

export const AdminHomeLayout = () => {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">dashboard</Link></li>
      </ul>
    </nav>

    <Outlet />
  </>
  )
}
