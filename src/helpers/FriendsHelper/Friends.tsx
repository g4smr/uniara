import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, auth } from '../../services/firebase';

type User = {
  id: string;
  username: string;
  image: string;
  email: string;
};

export const handleSearch = async (search: string): Promise<User | null> => {
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where('email', '==', search));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as User)[0];
  return user;
};

export const handleAddFriend = async (searchResult: User | null) => {
  if (searchResult) {
    const currentUserID = auth.currentUser?.uid;
    if (!currentUserID) {
      console.error('User not authenticated');
      return;
    }
    const userRef = doc(db, 'users', currentUserID);
    await updateDoc(userRef, {
      friends: arrayUnion(searchResult.id),
    });
  }
};

export const handleRemoveFriend = async (id: string, friends: User[]): Promise<User[]> => {
  const currentUserID = auth.currentUser?.uid;
  if (!currentUserID) {
    console.error('User not authenticated');
    return friends;
  }
  const userRef = doc(db, 'users', currentUserID);
  await updateDoc(userRef, {
    friends: arrayRemove(id),
  });
  return friends.filter((friend) => friend.id !== id);
};

export const fetchFriends = async (): Promise<User[]> => {
  const currentUserID = auth.currentUser?.uid;
  if (!currentUserID) {
    console.error('User not authenticated');
    return [];
  }
  const userRef = doc(db, 'users', currentUserID);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  const userFriends = userData ? userData.friends : [];
  const friends = await Promise.all(
    userFriends.map(async (friendID: string) => {
      const friendRef = doc(db, 'users', friendID);
      const friendSnap = await getDoc(friendRef);
      return { id: friendSnap.id, ...friendSnap.data() } as User;
    })
  );
  return friends;
};
