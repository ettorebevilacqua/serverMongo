const allRoles = {
  guest: [],
  user: ['question'],
  manager: ['manager', 'ownerUsers'],
  admin: ['getUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
