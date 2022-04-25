import getUser from './getUser';
import getUsers from './getUsers';
import me from './me';

export default {
  me,
  users: getUsers,
  user: getUser,
};
