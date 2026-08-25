/**
 * Channel landing pages.
 *
 * Plain English: nobody searches for "AI Ad Engine" until they already know the
 * name. They search for the thing they want done, like "facebook ads south
 * africa". These pages exist to answer those searches honestly, and each one is
 * written differently so they read as three real pages rather than one page
 * with the platform name swapped out.
 *
 * Everything here is either a plain fact about how the advertising platform
 * works, or a claim the site already makes elsewhere. No results are promised
 * and no figures are invented.
 */

export type ChannelSlug =
  | "facebook-ads-south-africa"
  | "google-ads-south-africa"
  | "tiktok-ads-south-africa";

export type Channel = {
  slug: ChannelSlug;
  /** Short label used in navigation and the breadcrumb trail. */
  label: string;
  /** Title tag, kept short enough that the brand suffix still fits. */
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  standfirst: string;
  intent: string;
  placements: { name: string; body: string }[];
  reality: { title: string; body: string }[];
  suits: string[];
  faqs: { question: string; answer: string }[];
};

export const CHANNELS: Channel[] = [
  {
    slug: "facebook-ads-south-africa",
    label: "Facebook & Instagram ads",
    title: "Facebook & Instagram Ads in South Africa",
    metaDescription:
      "Run Facebook and Instagram ads for a South African business without living inside Ads Manager. One platform, priced in Rands from R599 a month, month-to-month.",
    eyebrow: "Facebook and Instagram",
    h1: "Facebook and Instagram ads, without living in Ads Manager.",
    standfirst:
      "Facebook and Instagram are one advertising system run by Meta, so a single campaign can appear on both. That is useful, and it is also why the setup screen has so many options that most business owners give up and press Boost instead.",
    intent:
      "Meta advertising is built around finding people who are not searching yet. You describe who you want to reach and what you are selling, and the system puts your ad in front of people who look like buyers while they scroll. It rewards good creative more than clever settings, which is exactly the part small businesses have the least time for.",
    placements: [
      {
        name: "Facebook Feed",
        body: "The main scroll. Still where most reach comes from for local businesses, and the placement most people picture when they think of a Facebook ad.",
      },
      {
        name: "Instagram Feed and Explore",
        body: "The same campaign, shown to a more visual audience. Strong for anything people want to look at before they buy.",
      },
      {
        name: "Reels, on both",
        body: "Short vertical video. Currently the cheapest attention on Meta, and the format that most rewards a good first three seconds.",
      },
      {
        name: "Stories",
        body: "Full screen and gone in a day. Good for offers with a deadline, and for reminding people who already know you.",
      },
    ],
    reality: [
      {
        title: "Ads Manager is built for agencies",
        body: "Campaign, ad set and ad are three separate layers with their own settings, and a mistake on any one of them quietly wastes budget. It is a professional tool, and it assumes you use it every day.",
      },
      {
        title: "Targeting is guesswork without data",
        body: "Interests, locations, age ranges, lookalikes. Every combination looks plausible on the screen, and there is no way to tell which is right until money has already been spent.",
      },
      {
        title: "Writing the ad is its own job",
        body: "Meta wants several versions of the headline and body text so it can find the one that works. Most owners write one, run it, and never test another.",
      },
      {
        title: "Boosting is not the same thing",
        body: "The Boost button is a stripped back version with far less control over who sees the ad, and almost no way to tell what worked.",
      },
    ],
    suits: [
      "Local service businesses that need the phone to ring",
      "Shops and salons with something worth photographing",
      "Anyone selling to a whole town or suburb rather than one search term",
      "Businesses that already have a Facebook page and no idea what to do with it",
    ],
    faqs: [
      {
        question: "Do I need a Facebook page to run Facebook ads?",
        answer:
          "Yes. Meta requires ads to run from a Facebook page. If you already have one you can use it as it is, and Instagram ads can run from the same setup.",
      },
      {
        question: "Is my Facebook ad budget included in the subscription?",
        answer:
          "No. Your AI Ad Engine subscription and your advertising spend are separate. The money for the ads themselves is billed to you by Meta.",
      },
      {
        question: "Can one campaign run on both Facebook and Instagram?",
        answer:
          "Yes. Facebook and Instagram are both Meta platforms, so a single campaign can be shown across both.",
      },
      {
        question: "How is this different from boosting a post?",
        answer:
          "Boosting is a simplified button with limited control and limited targeting. A proper campaign gives you control over who sees the ad, what it says and how the results are measured.",
      },
      {
        question: "Do I need to be good at design to advertise on Instagram?",
        answer:
          "No. AI Ad Engine is designed to simplify the campaign creation process, including writing the ads. On the Dominate plan our team helps build and launch the campaigns with you.",
      },
    ],
  },
  {
    slug: "google-ads-south-africa",
    label: "Google ads",
    title: "Google Ads Management in South Africa",
    metaDescription:
      "Get in front of South Africans already searching for what you sell. Google Search, Display and YouTube campaigns from one platform, from R599 a month, month-to-month.",
    eyebrow: "Google",
    h1: "Google ads, for people already looking for you.",
    standfirst:
      "Google is the opposite of social advertising. Nobody is scrolling. Somebody has typed what they want into a search box, and the only question left is whose name they see first.",
    intent:
      "This is demand that already exists. Someone searching for a plumber at nine at night is not being persuaded to want a plumber. That makes Google the highest intent channel most local businesses can buy, and it is also why the words people type matter more than the picture attached to the ad.",
    placements: [
      {
        name: "Search",
        body: "Text ads at the top of the results page. The bread and butter for any business people actively look for.",
      },
      {
        name: "Display",
        body: "Image ads across a very large network of websites and apps. Cheaper attention, used mostly to stay visible to people who already visited you.",
      },
      {
        name: "YouTube",
        body: "Video ads before and during other videos. Google owns YouTube, so it is bought and measured from the same place.",
      },
      {
        name: "Maps and local",
        body: "Where a search with local intent turns into directions and a phone call, which for many trades is the whole point.",
      },
    ],
    reality: [
      {
        title: "You are bidding, not buying",
        body: "Every search runs an auction. Your position depends on what you bid and on how relevant Google judges your ad and your page to be, which is not obvious from the outside.",
      },
      {
        title: "Keywords go wrong quietly",
        body: "Broad keyword settings will spend real money on searches that were never going to buy. Nothing warns you. It simply shows up as a budget that went nowhere.",
      },
      {
        title: "The landing page is part of the ad",
        body: "Google judges where the click lands, not only the ad text. A slow or vague page costs you both position and money.",
      },
      {
        title: "Reporting is not the same as understanding",
        body: "Google will happily show you clicks and impressions. Whether any of it turned into a customer is a separate question, and it is the only one that matters.",
      },
    ],
    suits: [
      "Trades and emergency services people search for by name",
      "Professional services with a clear, searchable offer",
      "Businesses competing against bigger names in the same town",
      "Anyone whose customers already know exactly what they need",
    ],
    faqs: [
      {
        question: "How is Google advertising different from Facebook advertising?",
        answer:
          "Google reaches people who are already searching for what you sell. Facebook and Instagram reach people who are not looking yet but match the kind of person who buys from you. Many businesses eventually use both.",
      },
      {
        question: "Do I need a website to run Google ads?",
        answer:
          "You need somewhere for the click to land. A website is the usual answer, and Google also takes into account how relevant and usable that page is.",
      },
      {
        question: "Is my Google ad budget included in the subscription?",
        answer:
          "No. Your AI Ad Engine subscription and your advertising spend are separate. The money for the ads themselves is billed to you by Google.",
      },
      {
        question: "Can I advertise in one city only?",
        answer:
          "Yes. Google campaigns can be limited by location, so a business serving one metro does not pay for clicks from the rest of the country.",
      },
      {
        question: "Do I need to understand keywords to get started?",
        answer:
          "No. AI Ad Engine is designed to simplify campaign creation and management. On the Dominate plan our team helps build and launch the campaigns with you.",
      },
    ],
  },
  {
    slug: "tiktok-ads-south-africa",
    label: "TikTok ads",
    title: "TikTok Ads for South African Businesses",
    metaDescription:
      "Advertise on TikTok without a content team. In-feed video campaigns run from the same platform as your Facebook, Instagram and Google ads. From R599 a month.",
    eyebrow: "TikTok",
    h1: "TikTok ads, without becoming a content creator.",
    standfirst:
      "TikTok is where attention is cheapest, and where a lot of South African businesses still are not advertising. That gap is the opportunity, and it closes a little every month.",
    intent:
      "TikTok cares less about who you target and more about whether people watch. The algorithm shows your video to a small group, measures whether they stayed, and decides from there. That makes it unusually fair to small businesses: a good video from a one person operation can outperform a polished one from a national brand.",
    placements: [
      {
        name: "In-feed video",
        body: "Your ad appears inside the For You feed, between the videos people came to watch. This is the main way businesses advertise on TikTok.",
      },
      {
        name: "Vertical, sound on",
        body: "Full screen and audio first, which is the opposite of most business video. What works here looks made for the platform rather than repurposed from a brochure.",
      },
      {
        name: "The first two seconds",
        body: "Where the whole thing is won or lost. TikTok gives every video a chance and then withdraws it quickly if nobody stays.",
      },
      {
        name: "Native over polished",
        body: "Something filmed on a phone in your workshop routinely beats something expensive. This is one of the few channels where that is genuinely true.",
      },
    ],
    reality: [
      {
        title: "Ads wear out faster here",
        body: "A video that keeps working on Facebook for months can be finished on TikTok in a fortnight. The channel needs a steady supply of new creative, not one perfect ad.",
      },
      {
        title: "It is a separate account to set up",
        body: "TikTok has its own business account, its own ad manager and its own way of counting things, on top of whatever you already run on Meta and Google.",
      },
      {
        title: "The audience assumption is usually wrong",
        body: "The idea that TikTok is only teenagers has been out of date for years. The buying age audience on it is now substantial, which is part of why the cost of reaching them keeps rising.",
      },
      {
        title: "Most businesses stall at the video",
        body: "Not at the targeting, not at the budget. They simply never make the video, and the account sits empty.",
      },
    ],
    suits: [
      "Businesses with something visual to show being made, fixed or done",
      "Products and services aimed at a younger buying audience",
      "Anyone finding Facebook more expensive every year",
      "Businesses willing to post something imperfect rather than nothing",
    ],
    faqs: [
      {
        question: "Do I need a TikTok following to advertise on TikTok?",
        answer:
          "No. Ads are shown to people based on what they watch, not on who already follows you. A brand new account can run ads.",
      },
      {
        question: "Is my TikTok ad budget included in the subscription?",
        answer:
          "No. Your AI Ad Engine subscription and your advertising spend are separate. The money for the ads themselves is billed to you by TikTok.",
      },
      {
        question: "Do I have to appear on camera?",
        answer:
          "No. Plenty of business advertising on TikTok shows the work, the product or the result rather than a person talking.",
      },
      {
        question: "Can I run TikTok ads alongside Facebook and Google?",
        answer:
          "Yes. AI Ad Engine covers Facebook, Instagram, Google and TikTok from one login, so campaigns are launched and watched in the same place.",
      },
      {
        question: "Is TikTok worth it for a local business?",
        answer:
          "It depends on your industry, your market and your offer. Individual results vary and nothing here is a guarantee, which is exactly why starting small and measuring matters more than committing a large budget upfront.",
      },
    ],
  },
];

export function channelBySlug(slug: string): Channel | undefined {
  return CHANNELS.find((channel) => channel.slug === slug);
}
