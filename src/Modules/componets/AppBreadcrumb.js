import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => pathname.includes(route.path))
    return currentRoute.name
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `#${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })

    if (breadcrumbs.pathname === '#/banner') {
      let crum2 = breadcrumbs[1];
      let i = crum2.pathname.split('/')[0];
      if (i === '##' && crum2.name === 'League') {
        breadcrumbs[1].name = 'Banner'
      }
    }
    return breadcrumbs
  }

  

  const breadcrumbs = getBreadcrumbs(currentLocation)
console.log(breadcrumbs)
console.log("currentLocation",currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
   <CBreadcrumbItem href="/">Home</CBreadcrumbItem>   
   
     {breadcrumbs.map((breadcrumb, index) => {
        return (

          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
