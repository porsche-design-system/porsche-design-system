import { PText } from '@porsche-design-system/components-react/ssr';
import Image from 'next/image';
import Link from 'next/link';

type SearchRecommendationsProps = {
  onRecommendationClick: () => void;
};

export const SearchRecommendations = ({ onRecommendationClick }: SearchRecommendationsProps) => {
  const recommendations = [
    {
      name: 'Start Coding',
      imageSrc: 'assets/code.png',
      href: '/developing/introduction/#start-coding',
    },
    { name: 'Start Designing', imageSrc: 'assets/design.png', href: '/designing/introduction/#start-designing' },
    { name: 'Components', imageSrc: 'assets/components.png', href: '/components/introduction/' },
    { name: 'Styles & Tokens', imageSrc: 'assets/styles-tokens.png', href: '/styles/introduction/' },
    { name: 'Assets', imageSrc: 'assets/assets.png', href: '' },
    { name: 'Templates', imageSrc: 'assets/templates.png', href: '' },
    { name: 'Release Notes', imageSrc: 'assets/release-notes.png', href: '/news/changelog/' },
    { name: 'Feedback & Requests', imageSrc: 'assets/feedback.png', href: '' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-sm">
      {recommendations.map(({ name, href, imageSrc }, index) => (
        <Link
          key={index}
          href={href}
          className="py-4 px-6 bg-background-surface rounded-md flex items-center gap-4"
          onClick={onRecommendationClick}
        >
          {/*<div className="relative w-18 h-18">*/}
          {/*<Image*/}
          {/*  src={imageSrc}*/}
          {/*  layout="fill"*/}
          {/*  objectFit="contain"*/}
          {/*  alt={`${name} Image`}*/}
          {/*  className="transition-transform duration-300 ease-in-out"*/}
          {/*/>*/}
          {/*</div>*/}
          <PText size="medium">{name}</PText>
        </Link>
      ))}
    </div>
  );
};
