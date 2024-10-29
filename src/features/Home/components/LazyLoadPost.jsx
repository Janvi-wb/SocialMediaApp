/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import Post from './Post';

const LazyLoadPost = ({ post }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(ref.current);
          }
        });
      },
      { threshold: 1 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible && <Post key={post._id} post={post} />}
    </div>
  );
};

export default LazyLoadPost;
