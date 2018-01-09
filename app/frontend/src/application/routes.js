import { routes as dashboard } from './dashboard'
import { routes as conection } from './conection'
import { routes as configemail } from './configemail'
import { routes as configSQL } from './configsql'
import { routes as schedule } from './schedule'

export default [ ...dashboard, ...conection, ...configemail, ...configSQL, ...schedule ]
