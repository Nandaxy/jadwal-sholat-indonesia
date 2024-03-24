export default function Sunrise() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 512 512"
    >
      <defs>
        <clipPath id="meteoconsSunrise0">
          <path
            fill="none"
            d="M512 306H304l-35.9-31.4a18.4 18.4 0 0 0-24.2 0L208 306H0V0h512Z"
          ></path>
        </clipPath>
        <symbol id="meteoconsSunrise1" viewBox="0 0 375 375">
          <circle
            cx={187.5}
            cy={187.5}
            r={84}
            fill="none"
            stroke="black"
            strokeMiterlimit={10}
            strokeWidth={15}
          ></circle>
          <path
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={15}
            d="M187.5 57.2V7.5m0 360v-49.7m92.2-222.5l35-35M60.3 314.7l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M57.2 187.5H7.5m360 0h-49.7"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="0 187.5 187.5; 45 187.5 187.5"
            ></animateTransform>
          </path>
        </symbol>
      </defs>
      <g clipPath="url(#meteoconsSunrise0)">
        <use
          width={375}
          height={375}
          href="#meteoconsSunrise1"
          transform="translate(68.5 104.5)"
        ></use>
      </g>
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18}
        d="M128 332h88l40-36l40 36h88"
      ></path>
    </svg>
  );
}
