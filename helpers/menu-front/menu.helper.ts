export const getManuFront = ( role: string = 'USER_ROLE' ) => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Inicio', url: '/' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        //{ title: 'Users', url: 'users' },
        { title: 'Sedes', url: 'sedes' },
        { title: 'Almacén', url: 'hardware' },
      ]
    }
  ];

  if ( role === 'ADMIN_ROLE' ) {
    menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' })
  }

  return menu;
}
