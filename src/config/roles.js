const allRoles = {
  guest: [],
  user: ['question'],
  manager: ['manager'],
  admin: ['getUsers', 'manageUsers', 'manager'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
