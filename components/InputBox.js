import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      });

      if (imageToPost) {
        const imageRef = ref(storage, `posts/${docRef.id}`);
        uploadString(imageRef, imageToPost, 'data_url').then((snapshot) => {
          getDownloadURL(imageRef).then((url) => {
            setDoc(
              doc(db, 'posts', docRef.id),
              {
                postImage: url,
              },
              { merge: true }
            );
          });
        });

        removeImage();
      }
    } catch (e) {
      console.log('error adding doc:', e);
    }

    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex sm:space-x-4 p-4 items-center'>
        <div className='hidden sm:inline-flex'>
          <Image
            className='rounded-full'
            src={session.user.image}
            width={40}
            height={40}
            layout='fixed'
            alt='pfp'
          />
        </div>

        <form className='flex flex-1'>
          <input
            type='text'
            ref={inputRef}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:ouline-none'
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type='submit' onClick={sendPost}></button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'
          >
            <img
              src={imageToPost}
              alt='selected-image'
              className='h-10 object-contain'
            />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>

      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='hidden sm:inline-flex sm:text-sm xl:text-base'>
            Live Video
          </p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-400' />
          <p className='hidden sm:inline-flex sm:text-sm xl:text-base'>
            Photo/Video
          </p>
          <input
            ref={filePickerRef}
            hidden
            onChange={addImageToPost}
            type='file'
          />
        </div>

        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='hidden sm:inline-flex sm:text-sm xl:text-base'>
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
