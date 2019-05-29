import fs from 'fs';
import util from 'util';

import { getUser } from '.';
const readDir = util.promisify(fs.readdir);


// ***** (6) resolver za employees field u Company
// ***** Zbog specifične JSON files baze ovaj proces bi trajao "beskonačno"
// ***** Između ostalog i zato što companies JSON fileovi ne sadrže employees key (array),
// ***** nego je vrza preko users JSON fileova koji imaju key company
// ***** Zato sam kreirao ovaj primitivan ali učinkovit CompanyIndex
class CompanyIndex {
  // --------------------------------------------------------------------------
  constructor(getUser) {
    console.log('CompanyIndex constructor')
    this.getUserFn = getUser;
    this.usersCompanies = {};

    this.set();
  }

  // --------------------------------------------------------------------------
  set = async () => {
    const files = await readDir('./data/users');

    try {
      files
        .filter(filename => filename.includes('.json'))
        .forEach(filename => {
          this.getUserFn(filename.replace('.json', ''))
            .then(user => {
              const { id, company } = user;

              if (company !== null) {
                if (this.usersCompanies[company]) {
                  const { users } = this.usersCompanies[company];
                  this.usersCompanies[company].users = [...users, id];
                } else {
                  this.usersCompanies[company] = {
                    users: [id],
                  };
                }
              }
            })
        });
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------------------------
  get = (key) => {
    if (this.usersCompanies[key]) {
      return Promise.resolve(this.usersCompanies[key].users);
    } else {
      return null;
    }
  }
}

export default new CompanyIndex(getUser);
