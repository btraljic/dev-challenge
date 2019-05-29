import { getUser, convert62to16  } from '../../../helpers';


  // ***** (9) id se konvertira iz base62 u uuid16 i šalje od clienta
  // ***** Za to je napravljena funkcija convert62to16
  // ***** Ista funkcionalnost se može koristiti i za company.id
  // ***** Ostavljena je mogućnost korištenja uuid16 if (id16.length !== 36)...
  export default async function user(root, { id }, { ctx }, info) {
  let id16 = id;

  if (id16.length !== 36) {
    id16 = convert62to16(id);
  }

  return getUser(id16);
}
