/* eslint-disable @next/next/no-img-element */
interface AvatarProps {
  className?: string;
  src?: string;
}

export default function Avatar({ className, src }: AvatarProps) {
  return (
    <img
      loading="lazy"
      src={src}
      alt="Profile"
      className={`w-10 rounded-full object-cover ${className}`}
    />
  );
}
