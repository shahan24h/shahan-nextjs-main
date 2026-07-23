import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowDown,
  ExternalLink,
  MessageSquare,
  Clock3,
  Scale,
  Network,
} from "lucide-react";

export const metadata = {
  title: "Gender, Language & Sentiment in r/survivor | Shahan Ahmed",
  description:
    "An interactive computational social science analysis of gender-related discussion and sentiment in the Survivor Reddit community from 2019–2025.",
};


const VizFrame = ({
  src,
  title,
  height = 760,
}: {
  src: string;
  title: string;
  height?: number;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-700 bg-white shadow-2xl">
      <iframe
        src={src}
        title={title}
        className="w-full border-0"
        style={{ height: `${height}px` }}
        loading="lazy"
      />
    </div>
  );
};


export default function SurvivorGenderSentimentPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">

      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="relative overflow-hidden px-4 pb-20 pt-28">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute right-[10%] top-36 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">

          <Link
            href="/case-studies"
            className="mb-12 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>


          <div className="mx-auto max-w-4xl text-center">

            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.28em] text-blue-300">
              Computational Social Science
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Gender, Language & Sentiment
              <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                in r/survivor
              </span>
            </h1>

            <p className="mx-auto mb-5 max-w-3xl text-lg leading-relaxed text-gray-300">
              Exploring how gender-related discussions differ from general
              Survivor discussions on Reddit from 2019 through 2025.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              {[
                "217,846 Matched Records",
                "2019–2025",
                "RoBERTa Sentiment",
                "Reddit",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
                >
                  {item}
                </span>
              ))}

            </div>

          </div>
        </div>
      </section>



      {/* ==================================================== */}
      {/* RESEARCH QUESTION */}
      {/* ==================================================== */}

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-8 md:p-12">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
              Research Question
            </p>

            <h2 className="text-2xl font-bold leading-relaxed md:text-3xl">
              Are gender-related discussions in r/survivor more negative than
              otherwise general Survivor discussions, after matching records
              by year and record type?
            </h2>

          </div>

        </div>
      </section>



      {/* ==================================================== */}
      {/* ROADMAP */}
      {/* ==================================================== */}

      <section className="px-4 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-blue-300">
              Analytical Roadmap
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Four questions guide the analysis
            </h2>

          </div>


          <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-3 shadow-2xl">

            <Image
              src="/survivor-sentiment/visual_analysis_roadmap.png"
              alt="Sentiment analysis roadmap"
              width={2000}
              height={900}
              className="h-auto w-full rounded-2xl"
              priority
            />

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* 01 LANGUAGE */}
      {/* ==================================================== */}

      <section
        id="language"
        className="border-t border-gray-800 px-4 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 grid gap-8 md:grid-cols-[220px_1fr]">

            <div>
              <span className="text-6xl font-black text-blue-500/30">
                01
              </span>

              <div className="mt-4 flex items-center gap-2 text-blue-300">
                <MessageSquare size={18} />
                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Language
                </span>
              </div>
            </div>


            <div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                What are people talking about?
              </h2>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
                The first analysis identifies the most frequently matched
                gender-related terms and examines the sentiment associated
                with each term.
              </p>

            </div>

          </div>


          <VizFrame
            src="/survivor-sentiment/top15_gender_terms_sentiment_interactive.html"
            title="Top 15 Gender-Related Terms"
            height={900}
          />


          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-7">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
              Key Finding
            </p>

            <p className="text-lg leading-relaxed text-gray-200">
              Gender-related terms do not share a single sentiment profile.
              Some terms, such as{" "}
              <strong className="text-white">toxic</strong>, are strongly
              associated with negative sentiment, while others appear in more
              positive or neutral contexts.
            </p>

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* 02 TIME */}
      {/* ==================================================== */}

      <section
        id="time"
        className="border-t border-gray-800 bg-gray-900/40 px-4 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 grid gap-8 md:grid-cols-[220px_1fr]">

            <div>
              <span className="text-6xl font-black text-cyan-500/30">
                02
              </span>

              <div className="mt-4 flex items-center gap-2 text-cyan-300">
                <Clock3 size={18} />
                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Time
                </span>
              </div>
            </div>


            <div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                How does sentiment change over time?
              </h2>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
                Sentiment distributions are compared across years from
                2019 through 2025 rather than relying only on a single
                overall average.
              </p>

            </div>

          </div>


          {/* Currently static ridgeline */}

          <div className="overflow-hidden rounded-2xl border border-gray-700 bg-white p-2 shadow-2xl">

            <Image
              src="/survivor-sentiment/survivor_sentiment_ridgeline_2019_2025.png"
              alt="Ridgeline distribution of sentiment from 2019 through 2025"
              width={1800}
              height={1200}
              className="h-auto w-full"
            />

          </div>


          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-7">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Key Finding
            </p>

            <p className="text-lg leading-relaxed text-gray-200">
              The distribution of sentiment shifts across years, showing that
              the emotional character of discussion is not constant over the
              2019–2025 period.
            </p>

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* 03 COMPARISON */}
      {/* ==================================================== */}

      <section
        id="comparison"
        className="border-t border-gray-800 px-4 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 grid gap-8 md:grid-cols-[220px_1fr]">

            <div>
              <span className="text-6xl font-black text-purple-500/30">
                03
              </span>

              <div className="mt-4 flex items-center gap-2 text-purple-300">
                <Scale size={18} />

                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Comparison
                </span>
              </div>
            </div>


            <div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Is gender-related discussion different?
              </h2>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
                Gender-related records are compared with an equally sized
                general Survivor sample matched by year and record type.
              </p>

            </div>

          </div>


          {/* TEMPORARY INTERACTIVE COMPARISON */}
          {/* Replace with dumbbell HTML once generated */}

          <VizFrame
            src="/survivor-sentiment/ternary_sentiment_heatmap.html"
            title="Gender-Related and General Sentiment Comparison"
            height={800}
          />


          <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-7">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-purple-300">
              Key Finding
            </p>

            <p className="text-lg leading-relaxed text-gray-200">
              Gender-related discussion is not substantially more negative.
              Compared with matched general discussion, it shows{" "}
              <strong className="text-white">less neutral sentiment</strong>{" "}
              and{" "}
              <strong className="text-white">more positive sentiment</strong>.
            </p>

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* 04 CONTEXT */}
      {/* ==================================================== */}

      <section
        id="context"
        className="border-t border-gray-800 bg-gray-900/40 px-4 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 grid gap-8 md:grid-cols-[220px_1fr]">

            <div>

              <span className="text-6xl font-black text-emerald-500/30">
                04
              </span>

              <div className="mt-4 flex items-center gap-2 text-emerald-300">

                <Network size={18} />

                <span className="text-sm font-bold uppercase tracking-[0.22em]">
                  Context
                </span>

              </div>

            </div>


            <div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Where do those differences appear?
              </h2>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
                The final analysis follows records across discussion group,
                record type, and sentiment classification.
              </p>

            </div>

          </div>


          <VizFrame
            src="/survivor-sentiment/parallel_categories_sentiment.html"
            title="Discussion Group, Record Type, and Sentiment"
            height={800}
          />


          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-7">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Key Finding
            </p>

            <p className="text-lg leading-relaxed text-gray-200">
              Comments contain a higher share of negative sentiment and a
              lower share of neutral sentiment than submissions in both
              gender-related and general discussions.
            </p>

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* ADDITIONAL EXPLORATIONS */}
      {/* ==================================================== */}

      <section className="border-t border-gray-800 px-4 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Additional Explorations
            </p>

            <h2 className="text-3xl font-bold">
              Explore the data further
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <a
              href="/survivor-sentiment/animated_survivor_sentiment_map.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-700 bg-gray-900 p-6 transition hover:border-blue-500"
            >

              <ExternalLink
                size={20}
                className="mb-5 text-blue-400"
              />

              <h3 className="mb-2 text-lg font-bold">
                Animated Sentiment Map
              </h3>

              <p className="text-sm text-gray-400">
                Explore how emotional balance changes across years.
              </p>

            </a>


            <a
              href="/survivor-sentiment/survivor_sentiment_sankey_interactive.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-700 bg-gray-900 p-6 transition hover:border-purple-500"
            >

              <ExternalLink
                size={20}
                className="mb-5 text-purple-400"
              />

              <h3 className="mb-2 text-lg font-bold">
                Sentiment Sankey
              </h3>

              <p className="text-sm text-gray-400">
                Explore flows across discussion group, record type, and sentiment.
              </p>

            </a>


            <a
              href="/survivor-sentiment/ternary_sentiment_heatmap.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-700 bg-gray-900 p-6 transition hover:border-emerald-500"
            >

              <ExternalLink
                size={20}
                className="mb-5 text-emerald-400"
              />

              <h3 className="mb-2 text-lg font-bold">
                Ternary Sentiment Map
              </h3>

              <p className="text-sm text-gray-400">
                Compare negative, neutral, and positive sentiment profiles.
              </p>

            </a>

          </div>

        </div>

      </section>



      {/* ==================================================== */}
      {/* OVERALL FINDING */}
      {/* ==================================================== */}

      <section className="border-t border-gray-800 px-4 py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-blue-300">
            Overall Finding
          </p>

          <h2 className="mb-7 text-3xl font-bold leading-tight md:text-5xl">
            Gender-related discussion is different —
            <span className="text-blue-300">
              {" "}but not simply more negative.
            </span>
          </h2>

          <p className="text-lg leading-relaxed text-gray-300">
            The strongest difference is lower neutrality and greater emotional
            expression. Record type also matters: comments show substantially
            more negative and less neutral sentiment than submissions.
          </p>

        </div>

      </section>

    </main>
  );
}