import fs from 'fs';
import util from 'util';

import { getUser } from '../../../helpers';

const readDir = util.promisify(fs.readdir);


// ***** (7) Dodan je name argument za "begin with" pretraživanje po imenu
export default async function users(root, { name }, { ctx }, info) {
  const files = await readDir('./data/users');

  // todo: (7) 3. can we accept a input variable into the graphql query to only show certain users? Maybe allowing
  //  filter by name to begin with.

  // todo: (8) 5. getting this list of all users is slow.  Would be really cool if it could return all the users
  //  in a more performant way.  Keeping in mind that the underlaying JSON files may get updated.

  const usersIds = files.filter(filename => filename.includes('.json'));
  const users = [];
  for (let i = 0; i < usersIds.length; i++) {
    users.push(await getUser(usersIds[i].replace('.json', ''), name));
  }

  if (name !== undefined) {
    const filteredUsers = users.filter(item => item !== null);
    return filteredUsers;
  }

  return users;
}
