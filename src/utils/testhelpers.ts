import faker from '@faker-js/faker';
import Community from '../modules/Community';
import Follower from '../modules/Follow';
import Join from '../modules/Join';
import User from '../modules/User';

export const newViewer = async () => {
  let username = faker.internet.userName('mozg');
  let password = faker.internet.password();
  let email = faker.internet.email();
  let id = faker.git.commitSha();
  const user = await User.create({
    id,
    username,
    email,
    password,
  });
  await user.save();
  return { username, password, email, id };
};

export const newCommunity = async (id: string) => {
  const name = faker.name.firstName();
  const description = faker.company.catchPhrase();
  const comm_id = faker.git.commitSha();

  const comm = await Community.create({
    id: comm_id,
    creator: id,
    name,
    description,
  });

  await comm.save();

  return { name, description, comm_id, creator: id };
};

export const newRelation = async (id: string, followee: string) => {
  const _id = faker.git.commitSha();
  const _id2 = faker.git.commitSha();

  const follow = await Follower.create({
    id: _id,
    followee: followee,
    follower: id,
    reciprocated: true,
  });

  const follow2 = await Follower.create({
    id: _id2,
    followee: id,
    follower: followee,
    reciprocated: true,
  });

  await follow.save();
  await follow2.save();
};

export const newJoin = async () => {
  const { id } = await newViewer();
  const { comm_id } = await newCommunity(id);
  const _id = faker.git.commitSha();

  const doc = await Join.create({ id: _id, comm_id, member: id });
  await doc.save();
  return { comm_id, mem_id: id };
};
