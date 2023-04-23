import { AdminHome } from './pages/AdminHome/AdminHome'
import { AdminHomePage } from './pages/AdminHomePage/AdminHomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { SignUpPage } from './pages/LoginPage/SignUpPage'
import { useRoutes } from 'react-router-dom'
import { AdminHomeLayout } from './pages/AdminHome/AdminHomeLayout'
import { NotFound } from './pages/NotFoundPage/NotFound'
import HomepageLayout from './pages/HomePage/HomePage'
import { Dashboard } from './pages/NewDashboard/Dashboard'

export function RouteConfigExample() {
    return useRoutes([
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            path: '/signup',
            element: <SignUpPage />,
        },
        {
            path: '/search',
            element: <HomepageLayout />,
            children: [
                {
                    index: true,
                    element: <AdminHome />,
                },
            ],
        },
        {
            path: '/dashboard',
            element: <HomepageLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
            ],
        },
        {
            path: `/search-1`,
            element: <HomepageLayout />,
            children: [
                {
                    index: true,
                    element: <AdminHomePage />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ])
}
