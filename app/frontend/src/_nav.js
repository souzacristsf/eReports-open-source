export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Opções',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Conexao',
      url: '/conection',
      icon: 'icon-settings',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'Configurar E-mail',
      url: '/config/email',
      icon: 'icon-envelope',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'Agendar Envio',
      url: '/schedule',
      icon: 'icon-chart',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'Cadastrar Consulta',
      url: '/config/sql',
      icon: 'icon-docs',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    }
  ]
}
