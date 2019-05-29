import { CompanyIndex, getUser } from '../../helpers';


export default {
  // ***** (6) resolver za employees field u Company
  // ***** Zbog specifične JSON files baze ovaj proces bi trajao "beskonačno"
  // ***** Između ostalog i zato što companies JSON fileovi ne sadrže employees key (array),
  // ***** nego je vrza preko users JSON fileova koji imaju key company
  // ***** Zato sam kreirao primitivan ali učinkovit CompanyIndex koji se ovdje koristi
  employees: async (root, args, { ctx }, info) => {
    const employees = [];
    const { id } = root;
    const users = await CompanyIndex.get(id);

    if (users) {
      users.forEach(user => {
        employees.push(getUser(user))
      });
    }

    return employees;
  },
};
