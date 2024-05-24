import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import {
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface Comment {
  user: string;
  text: string;
  replies: Comment[];
  date: Date;
}

interface Post {
  id?: string;
  text: string;
  likes: string[];
  comments: Comment[];
  date: Date;
  user: string;
  imageUrl: string;
}

type User = {
  birthdate: string;
  email: string;
  image: string;
  username: string;
};

const Main: React.FC = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [postText, setPostText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<string[]>(new Array(posts.length).fill(''));
  const [editPostIndex, setEditPostIndex] = useState<number | null>(null);
  const [editPostText, setEditPostText] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean[]>(new Array(posts.length).fill(false));
  const [editingCommentIndex, setEditingCommentIndex] = useState<{
    postIndex: number;
    commentIndex: number;
  } | null>(null);

  const fetchPosts = async () => {
    const postCollection = collection(db, 'posts');

    const unsubscribe = onSnapshot(postCollection, (snapshot) => {
      const postList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          id: id,
          text: data.text,
          likes: data.likes,
          comments: data.comments,
          date: (data.date as Timestamp).toDate(),
          user: data.user,
          imageUrl: data.imageUrl,
        } as Post;
      });
      setPosts(postList);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const unsubscribe = await fetchPosts();
      return () => unsubscribe();
    };

    fetchAndSetPosts();
  }, []);

  const fetchUser = async (uid: string) => {
    const userDoc = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data() as User;
    } else {
      throw new Error('User does not exist');
    }
  };

  const handlePublish = async () => {
    let username = 'anonymous';
    let imageUrl = '';
    if (currentUser) {
      const user = await fetchUser(currentUser.uid);
      username = user.username;
      imageUrl = user.image;
    }

    const newPost: Post = {
      text: postText,
      likes: [],
      comments: [],
      date: new Date(),
      user: username,
      imageUrl: imageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      newPost.id = docRef.id;
      console.log('Documento escrito com ID: ', docRef.id);
    } catch (e) {
      console.error('Erro adicionando documento: ', e);
    }

    setPostText('');
  };

  const handleLike = async (index: number) => {
    if (!currentUser) return;
    const post = posts[index];
    if (post.id) {
      const postRef = doc(db, 'posts', post.id);
      const isLiked = post.likes.includes(currentUser.uid);
      if (isLiked) {
        await updateDoc(postRef, { likes: arrayRemove(currentUser.uid) });
      } else {
        await updateDoc(postRef, { likes: arrayUnion(currentUser.uid) });
      }
      const updatedPosts = posts.map((post, i) => {
        if (i === index) {
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((user) => user !== currentUser.uid)
              : [...post.likes, currentUser.uid],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    }
  };

  const handleComment = async (index: number, comment: string) => {
    const post = posts[index];
    if (post.id) {
      const postRef = doc(db, 'posts', post.id);
      let username = '';
      let imageUrl = '';

      if (currentUser) {
        const user = await fetchUser(currentUser.uid);
        username = user.username;
        imageUrl = user.image;
      }

      const newComment = {
        user: username,
        text: comment,
        replies: [],
        date: new Date(),
        imageUrl: imageUrl,
      };

      await updateDoc(postRef, { comments: arrayUnion(newComment) });

      const updatedPosts = posts.map((post, i) => {
        if (i === index) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      let newTextArray = [...commentText];
      newTextArray[index] = '';
      setCommentText(newTextArray);
      setEditingCommentIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setEditPostIndex(index);
    setEditPostText(posts[index].text);
  };

  const handleEditSubmit = async () => {
    if (editPostIndex !== null) {
      const post = posts[editPostIndex];
      if (post.id) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, { text: editPostText });

        const updatedPosts: Post[] = [...posts];
        updatedPosts[editPostIndex].text = editPostText;

        setPosts(updatedPosts);
        setEditPostIndex(null);
        setEditPostText('');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (typeof id !== 'string') {
      console.error('Invalid id: ', id);
      return;
    }

    try {
      await deleteDoc(doc(db, 'posts', id));
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleToggleComments = (index: number) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments);
  };

  const handleCommentEdit = async (postIndex: number, commentIndex: number, newText: string) => {
    const post = posts[postIndex];
    if (post.id) {
      const postRef = doc(db, 'posts', post.id);
      const updatedComments = post.comments.map((comment, i) => {
        if (i === commentIndex) {
          return { ...comment, text: newText };
        }
        return comment;
      });

      await updateDoc(postRef, { comments: updatedComments });

      const updatedPosts = posts.map((post, i) => {
        if (i === postIndex) {
          return { ...post, comments: updatedComments };
        }
        return post;
      });

      setPosts(updatedPosts);
      let newTextArray = [...commentText];
      newTextArray[postIndex] = '';
      setCommentText(newTextArray);
      setEditingCommentIndex(null);
    }
  };

  const handleCommentDelete = async (postIndex: number, commentIndex: number) => {
    const post = posts[postIndex];
    if (post.id) {
      const postRef = doc(db, 'posts', post.id);
      const updatedComments = post.comments.filter((comment, i) => i !== commentIndex);

      await updateDoc(postRef, { comments: updatedComments });

      const updatedPosts = posts.map((post, i) => {
        if (i === postIndex) {
          return { ...post, comments: updatedComments };
        }
        return post;
      });

      setPosts(updatedPosts);
    }
  };

  return (
    <ScrollView style={tw`p-4 bg-gray-900`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TextInput
          placeholder="No que você está pensando?"
          style={tw`flex-1 h-12 border-blue-500 border-b-2 rounded-lg p-4 mr-2 bg-gray-800 text-white`}
          value={editPostIndex !== null ? editPostText : postText}
          onChangeText={editPostIndex !== null ? setEditPostText : setPostText}
        />
        {editPostIndex !== null ? (
          <Button title="Salvar" onPress={handleEditSubmit} color="#4267B2" />
        ) : (
          <Button title="Publicar" onPress={handlePublish} color="#4267B2" />
        )}
      </View>
      {posts.map((post, index) => (
        <View key={index} style={tw`border border-gray-300 rounded-lg p-4 mb-4 bg-gray-800`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{
                  uri: post.imageUrl,
                }}
                style={tw`w-10 h-10 rounded-full mr-2`}
              />
              <View style={tw`flex-col`}>
                <Text style={tw`font-bold text-lg text-white`}>{post.user}</Text>
                <Text style={tw`text-sm text-white`}>
                  {new Date(post.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={tw`mr-2`}>
                <Icon name="edit" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => post.id && handleDelete(post.id)}>
                <Icon name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={tw`mb-4 text-lg text-white`}>{post.text}</Text>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                onPress={() => handleLike(index)}
                style={tw`flex-row items-center mr-4`}>
                <Icon name="heart-o" size={24} color="white" />
                <Text style={tw`ml-2 text-white`}>{`Curtir (${post.likes.length})`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleComments(index)}
                style={tw`flex-row items-center`}>
                <Icon name="comment-o" size={24} color="white" />
                <Text style={tw`ml-2 text-white`}>{`Comentários (${post.comments.length})`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <TextInput
              placeholder="Adicione um comentário..."
              value={commentText[index]}
              onChangeText={(text) => {
                let newTextArray = [...commentText];
                newTextArray[index] = text;
                setCommentText(newTextArray);
              }}
              style={tw`flex-1 mr-8 bg-gray-800 text-white`}
            />
            <TouchableOpacity
              onPress={() => {
                handleComment(index, commentText[index]);
                let newTextArray = [...commentText];
                newTextArray[index] = '';
                setCommentText(newTextArray);
              }}
              style={tw`flex-row items-center`}>
              <Text style={tw`ml-2 text-white`}>Comentar</Text>
            </TouchableOpacity>
          </View>
          {showComments[index] &&
            post.comments.map((comment, commentIndex) => (
              <View key={commentIndex} style={tw`border-t border-gray-300 pt-4`}>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                  <View style={tw`flex-row items-center`}>
                    <Image
                      source={{
                        uri: 'https://lh3.googleusercontent.com/a/ACg8ocKWBTvFy-1QkduBy44DbUkt5u6HyjYoX-3DTmoAfY0DLA=s288-c-no',
                      }}
                      style={tw`w-8 h-8 rounded-full mr-2`}
                    />
                    <View style={tw`flex-col`}>
                      <Text style={tw`font-bold text-base text-white`}>{comment.user}</Text>
                      <Text style={tw`text-xs text-white`}>
                        {new Date(comment.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                  <View style={tw`flex-row items-center`}>
                    <TouchableOpacity
                      onPress={() => handleCommentEdit(index, commentIndex, comment.text)}
                      style={tw`mr-2`}>
                      <Icon name="edit" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCommentDelete(index, commentIndex)}>
                      <Icon name="trash" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={tw`text-base text-white`}>{comment.text}</Text>
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Main;
