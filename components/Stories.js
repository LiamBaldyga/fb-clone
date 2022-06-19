import React from 'react';
import StoryCard from './StoryCard';

const stories = [
  {
    name: 'Gwynne Shotwell',
    src: 'https://bit.ly/3HALTM0',
    profile: 'https://bit.ly/3MXj2CI',
  },
  {
    name: 'Elon Musk',
    src: 'https://links.papareact.com/4zn',
    profile: 'https://links.papareact.com/kxk',
  },
  {
    name: 'Jeff Bezos',
    src: 'https://links.papareact.com/k2j',
    profile: 'https://links.papareact.com/f0p',
  },
  {
    name: 'Mark Zuckerberg',
    src: 'https://links.papareact.com/xql',
    profile: 'https://links.papareact.com/snf',
  },
  {
    name: 'Bill Gates',
    src: 'https://links.papareact.com/4u4',
    profile: 'https://links.papareact.com/zvy',
  },
];

const Stories = () => {
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
      {stories.map((story) => (
        <StoryCard
          name={story.name}
          src={story.src}
          profile={story.profile}
          key={story.name}
        />
      ))}
    </div>
  );
};

export default Stories;
