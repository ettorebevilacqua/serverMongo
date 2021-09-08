const allRoles = {
  guest: [],
  user: ['question'],
  manager: ['manager'],
  admin: ['admin', 'manager', "ownerUsers"],
  super:['super', 'admin', 'manager', "ownerUsers"]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
