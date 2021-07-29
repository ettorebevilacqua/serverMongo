const allRoles = {
  guest: [],
  user: ['question'],
  manager: ['manager', 'ownerUsers'],
  admin: ['admin', 'manager'],
  super:['super', 'admin', 'manager']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
