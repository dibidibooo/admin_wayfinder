export default [
  {
    header: 'Apps',
    icon: 'PackageIcon',
    children: [
      {
        title: 'Email',
        route: 'apps-email',
        icon: 'MailIcon',
      },
      {
        title: 'Calendar',
        route: 'apps-calendar',
        icon: 'CalendarIcon',
      },
      {
        title: 'User',
        icon: 'UserIcon',
        children: [
          {
            title: 'List',
            route: 'apps-users-list',
          },
          {
            title: 'View',
            route: { name: 'apps-users-view', params: { id: 21 } },
          },
          {
            title: 'Edit',
            route: { name: 'apps-users-edit', params: { id: 21 } },
          },
        ],
      },
    ],
  },
]
