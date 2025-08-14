const SolanaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.74686 3.3333C6.42533 3.3333 6.16669 3.59195 6.16669 3.91348L6.16669 6.8833C6.16669 7.20483 6.42533 7.46348 6.74686 7.46348H9.71669C10.0382 7.46348 10.3 7.20483 10.3 6.8833L10.3 3.91348C10.3 3.59195 10.0382 3.3333 9.71669 3.3333H6.74686ZM4.41669 9.1933C4.09516 9.1933 3.83651 9.45195 3.83651 9.77348L3.83651 12.7433C3.83651 13.0648 4.09516 13.3235 4.41669 13.3235H7.38651C7.70804 13.3235 7.96669 13.0648 7.96669 12.7433L7.96669 9.77348C7.96669 9.45195 7.70804 9.1933 7.38651 9.1933H4.41669ZM10.9333 8.6133C10.6118 8.6133 10.3531 8.87195 10.3531 9.19348L10.3531 12.1633C10.3531 12.4848 10.6118 12.7435 10.9333 12.7435H13.9031C14.2247 12.7435 14.4833 12.4848 14.4833 12.1633L14.4833 9.19348C14.4833 8.87195 14.2247 8.6133 13.9031 8.6133H10.9333ZM17.2531 3.3333C16.9316 3.3333 16.673 3.59195 16.673 3.91348V6.8833C16.673 7.20483 16.9316 7.46348 17.2531 7.46348H20.223C20.5445 7.46348 20.8031 7.20483 20.8031 6.8833V3.91348C20.8031 3.59195 20.5445 3.3333 20.223 3.3333H17.2531ZM14.4333 14.5533C14.1118 14.5533 13.8531 14.812 13.8531 15.1335V18.1033C13.8531 18.4248 14.1118 18.6835 14.4333 18.6835H17.4031C17.7247 18.6835 17.9833 18.4248 17.9833 18.1033V15.1335C17.9833 14.812 17.7247 14.5533 17.4031 14.5533H14.4333ZM8.56669 14.0333C8.24516 14.0333 7.98651 14.292 7.98651 14.6135V17.5833C7.98651 17.9048 8.24516 18.1635 8.56669 18.1635H11.5365C11.858 18.1635 12.1167 17.9048 12.1167 17.5833V14.6135C12.1167 14.292 11.858 14.0333 11.5365 14.0333H8.56669Z" fill="#A955F7"/>
  </svg>
);

const WifLogo = () => (
    <img src="https://placehold.co/24x24/1a1f2e/ffffff?text=WIF" alt="WIF" className="rounded-full w-full h-full" />
);

const BonkLogo = () => (
    <img src="https://placehold.co/24x24/1a1f2e/ffffff?text=BONK" alt="BONK" className="rounded-full w-full h-full" />
);

const WenLogo = () => (
    <img src="https://placehold.co/24x24/1a1f2e/ffffff?text=WEN" alt="WEN" className="rounded-full w-full h-full" />
);

const ChevronDown = () => (
  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ArrowDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1 text-gray-400 group-hover:text-purple-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

export {SolanaLogo, WifLogo, BonkLogo, WenLogo, ChevronDown, ArrowDown, ExternalLinkIcon};
