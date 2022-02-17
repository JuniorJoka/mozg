import getUser from './getUser';
import me from './me';

export default {
  me,
  users: getUser,
  user: getUser,
};
