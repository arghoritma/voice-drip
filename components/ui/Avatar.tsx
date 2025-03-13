/* eslint-disable @next/next/no-img-element */
interface AvatarProps {
  w?: number;
  src?: string;
}

export default function Avatar({ src, w = 10 }: AvatarProps) {
  return (
    <div className="avatar">
      <div className={`w-${w} rounded-full`}>
        <img loading="lazy" src={src} alt="Profile" />
      </div>
    </div>
  );
}
