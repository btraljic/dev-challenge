import fs from 'fs';
import util from 'util';
import BTCache from './BTCache';

const readFile = util.promisify(fs.readFile);

const UserBTCache = new BTCache(getUserData);


// ***** (7) Dodan je nameBeginWith argument za "begin with" pretraživanje po imenu
// ***** nameBeginWith je default '', ako postoji koristimo RegExp
// ***** (8) Data se učitava preko BTCache
export default async function getUser(id, nameBeginWith = '') {
  // const data = await readFile(`./data/users/${id}.json`, 'utf8');
  // return JSON.parse(data);
  const path = `./data/users/${id}.json`;
  const data = await UserBTCache.get(id, path);

  // ***** (7) RegExp case insensitive na početku imena
  if (nameBeginWith !== '') {
    const regex = new RegExp(`^${nameBeginWith}`, 'i');
    if (regex.exec(data.name) === null) {
      return null;
    }
  }

  return data;
}


// ***** (8) Cache getData funkcija
async function getUserData(path) {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data);
}


// ***** (8) Kod update usera, update i cachea jednostavnim clear-om (force read)
export function updateUserCache(key) {
  UserBTCache.clear(key);
}
