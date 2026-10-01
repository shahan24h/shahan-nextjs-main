import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Book Distribution | Shahan Ahmed",

  description:
    "Submit your delivery address to receive a complimentary copy of Bangabandhu Sheikh Mujibur Rahman's The Unfinished Memoirs.",

  alternates: {
    canonical: "https://www.shahanahmed.com/package-address",
  },

  openGraph: {
    title: "Free Book Distribution: The Unfinished Memoirs",
    description:
      "We are distributing 50 complimentary copies. Submit your delivery address to receive the book free of charge.",
    url: "https://www.shahanahmed.com/package-address",
    siteName: "Shahan Ahmed",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.shahanahmed.com/package-book/book-cover.jpg",
        alt: "The Unfinished Memoirs book cover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Book Distribution: The Unfinished Memoirs",
    description:
      "Submit your delivery address to receive a complimentary copy of the book.",
    images: [
      "https://www.shahanahmed.com/package-book/book-cover.jpg",
    ],
  },
};

export default function PackageAddressLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}