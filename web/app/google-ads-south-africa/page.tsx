import { ChannelLanding, channelMetadata } from "@/components/channel-landing";
import { channelBySlug } from "@/lib/channels";

const channel = channelBySlug("google-ads-south-africa")!;

export const metadata = channelMetadata(channel);

export default function Page() {
  return <ChannelLanding channel={channel} />;
}
