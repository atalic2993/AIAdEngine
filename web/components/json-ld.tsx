/**
 * Structured data.
 *
 * Plain English: a hidden block of machine-readable facts about the page. It is
 * how a search engine learns that R599 is a price, that a paragraph is the
 * answer to a question, and that AI Ad Engine is a company in South Africa,
 * instead of guessing from the visible text.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // The content is built by us from typed objects, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
