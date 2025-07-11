'use client';

import { type HTMLChakraProps, chakra } from '@chakra-ui/react';
import { useId } from 'react';

export const Logo = (props: HTMLChakraProps<'svg'>) => {
  const id = useId();

  return (
    <chakra.svg width={"33px"} height={"28px"} fill="none" {...props}>
      <path
        fill={`url(#a_${id})`}
        d="m32.174 13.917-7.143-1.325-.818 1.419-2.012 3.492-5.224 9.067c-.228.398-.831.234-.831-.225v-8.448a.897.897 0 0 0-.721-.88l-8.139-1.604-7.285-1.335c.011.38.1.757.27 1.106l6.013 10.46A4.681 4.681 0 0 0 10.347 28l11.53-.015a4.681 4.681 0 0 0 4.056-2.364l5.885-10.288c.25-.437.369-.928.356-1.416Z"
      />
      <path
        fill={`url(#b_${id})`}
        d="m8.106 13.987 2.015-3.505 5.193-9.034c.228-.398.832-.235.832.225v8.443c0 .43.302.8.722.882l8.163 1.594 7.143 1.325a2.704 2.704 0 0 0-.357-1.28L25.924 2.36A4.681 4.681 0 0 0 21.865 0h-11.57a4.681 4.681 0 0 0-4.063 2.366L.357 12.652l-.038.071c-.225.423-.331.89-.318 1.355l7.285 1.335.82-1.426Z"
      />
      <defs>
        <linearGradient
          id={`a_${id}`}
          x1="31.502"
          x2="0.58"
          y1="20.213"
          y2="20.499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3585A3" />
          <stop offset="1" stopColor="#00DEAE" />
        </linearGradient>
        <linearGradient
          id={`b_${id}`}
          x1="1.558"
          x2="29.029"
          y1="7.896"
          y2="7.182"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3585A3" />
          <stop offset="1" stopColor="#00DEAE" />
        </linearGradient>
      </defs>
    </chakra.svg>
  );
};
