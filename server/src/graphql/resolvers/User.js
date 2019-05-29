import { getUser, getCompany, convert16to62 } from '../../helpers';

// todo: (9) 5. it would be nicer to return a base62 value for the id field instead of a base16 uuid.
// ideally this would be implemented without changing the underlaying data, in a reusable way.
// Sending data to the client side should convert a base16 uuid to a base62 string, and inputting
// into the graphql api should convert a base62 string back to a base16 uuid

export default {
  // ***** (9) id se konvertira iz uuid16 u base62 i šalje clientu
  // ***** Za to je napravljena funkcija convert16to62
  id: async (root, args, { ctx }, info) => {
    const { id } = root;
    const base62 = convert16to62(id);

    return base62;
  },


  friends: async (root, args, { ctx }, info) => {
    const { friends } = root;
    let retFriends = [];

    if (friends) {
      retFriends = friends.map(id => getUser(id, '').then(user => user));
    }

    return retFriends;
  },


  // ***** (3) resolver za company field u Useru
  company: async (root, args, { ctx }, info) => {
    const { company } = root;

    if (company) {
      return getCompany(company);
    }

    return null;
  }
};
