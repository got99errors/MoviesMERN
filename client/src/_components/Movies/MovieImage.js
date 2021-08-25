import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieImageComp = ({ image }) => (
  <LazyLoadImage
    alt={image.alt}
    effect="blur"
    src={image.src} />
);

export default MovieImageComp;