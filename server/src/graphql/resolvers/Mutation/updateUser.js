import { setUser, convert62to16 } from '../../../helpers';


export default async function User(root, { user }, { ctx }, info) {
  // todo: (4) 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // todo: (5) 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.

  // ***** (9) id se konvertira iz base62 u uuid16 i šalje od clienta
  // ***** Za to je napravljena funkcija convert62to16
  // ***** Ostavljena je mogućnost korištenja uuid16 if (user16.id.length !== 36)...
  const user16 = { ...user };

  if (user16.id.length !== 36) {
    user16.id = convert62to16(user.id);
  }

  await setUser(user16);

  return true;
}
