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
      "Facebook and Instagram share Meta's advertising system, so one campaign can appear across both. The setup offers detailed choices for audiences, placements and delivery, which is useful but easy to overcomplicate.",
    intent:
      "Meta ads can introduce your offer to people while they scroll, before they search for it. Start with the customer, service area and offer, then test the message and creative against the enquiries that reach your CRM.",
    placements: [
      {
        name: "Facebook Feed",
        body: "A familiar scroll placement for local offers, service-area campaigns and products that benefit from a clear image or short video.",
      },
      {
        name: "Instagram Feed and Explore",
        body: "Visual feed and discovery placements that can share the same campaign. Useful when people want to see the product, venue or result before enquiring.",
      },
      {
        name: "Reels, on both",
        body: "Short vertical video across Facebook and Instagram. A clear opening helps people understand the offer before they scroll on.",
      },
      {
        name: "Stories",
        body: "Full-screen vertical ads between Stories. Useful for timely offers, reminders and simple routes to enquire or buy.",
      },
    ],
    reality: [
      {
        title: "The setup has several layers",
        body: "Campaign, ad set and ad each have their own choices. Keeping the objective, audience, budget and creative aligned takes care.",
      },
      {
        title: "Targeting needs a clear service area",
        body: "Locations, age ranges and audience signals can produce many plausible combinations. Start with who can actually buy from you, then learn from measured enquiries.",
      },
      {
        title: "Creative still needs testing",
        body: "Headlines, body copy, images and video give you several variables to test. One version rarely tells you enough about what customers respond to.",
      },
      {
        title: "Boosting offers fewer choices",
        body: "Boosting a post is a simplified route. A full campaign gives you more control over objectives, audiences, placements and measurement.",
      },
    ],
    suits: [
      "Local service businesses that need the phone to ring",
      "Shops and salons with something worth photographing",
      "Anyone selling to a whole town or suburb rather than one search term",
      "Businesses with a Facebook page that are ready to turn attention into enquiries",
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
          "Boosting is a simplified route with fewer choices. A full campaign gives you more control over the audience, message, placement and measurement.",
      },
      {
        question: "Do I need to be good at design to advertise on Instagram?",
        answer:
          "No. AI assistance helps shape the campaign and copy. On the Dominate plan, our team also helps build and launch the campaign with you.",
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
      "Google Search reaches people after they type a need into a search box. The job is to match their wording, location and next step with a relevant ad and landing page.",
    intent:
      "Search campaigns respond to demand that already exists. Someone searching for an emergency plumber in Durban needs a useful answer, not an introduction to plumbing. The search terms, service area and route to call or book all matter.",
    placements: [
      {
        name: "Search",
        body: "Text ads that can appear with search results. Useful when customers already know the service or product they need.",
      },
      {
        name: "Display",
        body: "Image ads across websites and apps in Google's network. They can support awareness or reconnect with people who previously visited your site.",
      },
      {
        name: "YouTube",
        body: "Video ads before and during other videos. Google owns YouTube, so it is bought and measured from the same place.",
      },
      {
        name: "Maps and local",
        body: "Local campaign features can help nearby searchers move towards directions, a call or a booking when the setup supports them.",
      },
    ],
    reality: [
      {
        title: "You are bidding, not buying",
        body: "Every search runs an auction. Your position depends on what you bid and on how relevant Google judges your ad and your page to be, which is not obvious from the outside.",
      },
      {
        title: "Keywords go wrong quietly",
        body: "Broad matching can include searches you did not expect. Search terms need review so irrelevant clicks do not keep using budget.",
      },
      {
        title: "The landing page is part of the ad",
        body: "Google considers the page behind the ad, and customers do too. A slow or vague page makes it harder for a click to become an enquiry or booking.",
      },
      {
        title: "Reporting is not the same as understanding",
        body: "Clicks and impressions show activity. Connecting enquiries to the CRM and pipeline shows whether that activity produced a useful next step.",
      },
    ],
    suits: [
      "Trades and emergency services people search for by service and location",
      "Professional services with a clear, searchable offer",
      "Businesses competing against bigger names in the same town",
      "Anyone whose customers already know exactly what they need",
    ],
    faqs: [
      {
        question: "How is Google advertising different from Facebook advertising?",
        answer:
          "Google Search can reach people while they look for what you sell. Facebook and Instagram can introduce an offer while people scroll. The right mix depends on your customer and campaign goal.",
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
          "Google campaigns can be limited by location. A business serving one metro can focus spend on people in that area, with location settings reviewed carefully.",
      },
      {
        question: "Do I need to understand keywords to get started?",
        answer:
          "No. AI assistance helps shape the campaign and copy. On the Dominate plan, our team also helps build and launch the campaign with you.",
      },
    ],
  },
  {
    slug: "tiktok-ads-south-africa",
    label: "TikTok ads",
    title: "TikTok Ads for South African Businesses",
    metaDescription:
      "Plan and manage TikTok ads for a South African business alongside Facebook, Instagram and Google. One platform, from R599 a month, month-to-month.",
    eyebrow: "TikTok",
    h1: "TikTok ads, connected to the rest of your advertising.",
    standfirst:
      "TikTok places short vertical video in the feed people already watch. For a South African business, the question is whether the offer can be shown clearly in a format that feels at home there.",
    intent:
      "Delivery responds to signals such as watch time and engagement as well as your campaign settings. Give people a clear reason to keep watching, then judge the channel by the enquiries or online sales it adds to the pipeline.",
    placements: [
      {
        name: "In-feed video",
        body: "Your ad appears inside the For You feed, between the videos people came to watch. This is the main way businesses advertise on TikTok.",
      },
      {
        name: "Vertical, sound-friendly",
        body: "Full-screen video designed for vertical, sound-friendly viewing. The message should still make sense quickly and feel made for the feed.",
      },
      {
        name: "The first two seconds",
        body: "An early hook helps people understand why they should keep watching. Show the problem, product or result without a long introduction.",
      },
      {
        name: "Made for the feed",
        body: "Simple footage can suit the format when it is clear and relevant. Production quality does not replace a useful offer and message.",
      },
    ],
    reality: [
      {
        title: "Creative needs refreshing",
        body: "Short-form video can lose attention as people see it repeatedly. Plan several useful angles instead of relying on one perfect ad.",
      },
      {
        title: "It is a separate account to set up",
        body: "TikTok has its own advertising account, ad manager and reporting setup, on top of whatever you already run on Meta and Google.",
      },
      {
        title: "Audience fit needs evidence",
        body: "Age alone does not decide whether TikTok fits. Your offer, location and the enquiries or sales the campaign produces are better guides.",
      },
      {
        title: "Video production can become the bottleneck",
        body: "The campaign still needs footage, a clear opening and a next step. A repeatable process makes testing new versions easier.",
      },
    ],
    suits: [
      "Businesses with something visual to show being made, fixed or done",
      "Products and services with an offer people can understand quickly",
      "Businesses adding another channel alongside Facebook, Instagram or Google",
      "Businesses willing to post something imperfect rather than nothing",
    ],
    faqs: [
      {
        question: "Do I need a TikTok following to advertise on TikTok?",
        answer:
          "No. Paid campaigns do not require an established organic following, although your account and ads still need to meet TikTok's requirements.",
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
