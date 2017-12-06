// @flow
import { LIKE, UNLIKE_BY_ID, UNLIKE_BY_TARGET } from './type';

const like = (path: string, targetId: string, onEnd: ?Function) => ({
  type: LIKE,
  path,
  targetId,
  onEnd,
});

const unlikeById = (id: string, onEnd: ?Function) => ({
  type: UNLIKE_BY_ID,
  id,
  onEnd,
});

const unlikeByTarget = (path: string, targetId: string, onEnd: ?Function) => ({
  type: UNLIKE_BY_TARGET,
  path,
  targetId,
  onEnd,
});

export { like, unlikeById, unlikeByTarget };
