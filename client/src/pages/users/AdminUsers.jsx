import { Title } from '../Title';
import { UsersTable } from '../../components/users-table/UsersTable';

export function AdminUsers() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Vartotojai" />
        </div>
        <div className="col-12">
          <UsersTable />
        </div>
      </div>
    </div>
  )
}
