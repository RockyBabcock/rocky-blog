import type { FriendGroup, FriendLink } from './types';

export interface GroupedFriendSection {
  group: FriendGroup | null;
  friends: FriendLink[];
}

export function groupFriendLinks(friends: FriendLink[], groups: FriendGroup[]): GroupedFriendSection[] {
  if (!groups.length) {
    return [{ group: null, friends }];
  }

  const groupMap = new Map<string, FriendLink[]>();
  for (const g of groups) {
    groupMap.set(g.id, []);
  }
  const ungrouped: FriendLink[] = [];

  for (const friend of friends) {
    if (friend.group && groupMap.has(friend.group)) {
      groupMap.get(friend.group)!.push(friend);
    } else {
      ungrouped.push(friend);
    }
  }

  const sections: GroupedFriendSection[] = groups.map((group) => ({
    group,
    friends: groupMap.get(group.id) ?? [],
  }));

  if (ungrouped.length > 0) {
    sections.push({ group: null, friends: ungrouped });
  }

  return sections;
}
