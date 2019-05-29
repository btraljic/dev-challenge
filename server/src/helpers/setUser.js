import fs from 'fs';
import util from 'util';
import { getUser, updateUserCache } from '.';

const writeFile = util.promisify(fs.writeFile);


export default async function setUser(user) {
  try {
    const userData = await getUser(user.id);

    // ***** (5) update umjesto overwrite-a
    await writeFile(`./data/users/${user.id}.json`, JSON.stringify({
      ...userData,
      ...user
    }));

    // ***** (8) update cachea nakon snimanja
    updateUserCache(user.id);
    return true;
  } catch (error) {
    console.log(error);
    // ***** (4) error može biti i write, nas zanima samo ako ne postoji file - open
    if (error.syscall === 'open') {
      /* ***** Potencijalno moguće orištenje Apollo UserInputError
      throw new UserInputError(
        'Failed to updateUser due to validation errors', {
          validationErrors: {
            id: "Not a valid User ID",
          }
        }
      );
      */

      // ***** JS Error - odlučio sam se za njega
      throw new Error(`Not a valid User ID ${user.id}`);
    }
    console.log(user.id, error);
  }
}
