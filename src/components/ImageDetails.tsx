import React from 'react'

type ImageDetailsProps = {
  images: {
    id: string;
    domain: string;
    path: string;
    filename: string;
  }[];
};

const ImageDetails = ({ images }: ImageDetailsProps) => {
  const isSingleImage = images.length === 1;

  return (
    <div className={`grid ${isSingleImage ? "" : "md:grid-cols-2"} overflow-x-auto w-full max-h-[500px]`}>
      {images.map((image) => (
        <img
          key={image.id}
          src={`https://${image.domain}${image.path}${image.filename}`}
          alt={image.filename}
          className="md:max-w-[550px] md:max-h-[400px] mx-auto px-3"
        />
      ))}
    </div>
  );
};

export default ImageDetails;