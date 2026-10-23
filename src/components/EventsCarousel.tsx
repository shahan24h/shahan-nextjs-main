"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type EventItem = {
  image: string;
  title: string;
  activity: string;
  location?: string;
  date?: string;
};

const academicEvents: EventItem[] = [
  {
    image:
      "/some-events/academic/csssa-2026-paper-acceptance.jpg",
    title: "CSSSA 2026",
    activity: "Paper accepted for presentation",
    location: "Santa Fe, New Mexico",
    date: "November 1, 2026",
  },
  {
    image:
      "/some-events/academic/mit-sdscon-2026.jpg",
    title: "SDSCon 2026 at MIT",
    activity: "Conference participation",
    location: "MIT, Cambridge, Massachusetts",
    date: "April 13, 2026",
  },
  {
    image:
      "/some-events/academic/montclair-student-research-symposium-2024.jpg",
    title: "2024 Student Research Symposium",
    activity:
      "Poster presentation on infant vaccination in Bangladesh and Pakistan",
    location: "Montclair State University",
    date: "2024",
  },
  {
    image:
      "/some-events/academic/cmu-ideas-paper-presentation-2026.jpg",
    title: "IDeaS Conference 2026",
    activity:
      "Paper presentation: Community Interventions and Cross-Platform Response",
    location: "Carnegie Mellon University",
    date: "October 12, 2026",
  },
  {
    image:
      "/some-events/academic/cmu-ideas-best-paper-award-2026.jpeg",
    title: "IDeaS Conference 2026",
    activity: "Best Paper Award",
    location: "Carnegie Mellon University",
    date: "October 14, 2026",
  },
];

const communityEvents: EventItem[] = [
  {
    image:
      "/some-events/social/cornell-without-fear-book-event-2026.jpg",
    title: "Without Fear Book Event",
    activity:
      "Book discussion featuring Dr. Keisha N. Blain",
    location: "Cornell University",
    date: "February 11, 2026",
  },
  {
    image:
      "/some-events/social/ma-graduation-montclair-2024.jpg",
    title: "M.A. Graduation",
    activity:
      "Master of Arts in Social Research and Analysis",
    location: "Montclair State University",
    date: "May 13, 2024",
  },
  {
    image:
      "/some-events/social/sylhet-agricultural-university-program-2019.jpg",
    title: "Sylhet Agricultural University Program",
    activity: "Program introduction and organization",
    location: "Sylhet, Bangladesh",
    date: "November 7, 2019",
  },
  {
    image:
      "/some-events/social/school-python-scratch-program-2019.jpg",
    title: "Programming Education for School Students",
    activity:
      "Introduction to Python and Scratch programming",
    location: "Bangladesh",
    date: "June 16, 2019",
  },
  {
    image:
      "/some-events/social/student-to-startup-sust-2019.jpg",
    title: "Student to Startup",
    activity:
      "Program introduction and organization",
    location:
      "Shahjalal University of Science and Technology",
    date: "April 24, 2019",
  },
  {
    image:
      "/some-events/social/graphic-novel-talk-for-children-2019.jpg",
    title: "Graphic Novel Program for Children",
    activity: "Educational talk",
    location: "Bangladesh",
    date: "January 10, 2019",
  },
  {
    image:
      "/some-events/social/srdl-lab-youth-coordination-2018.jpg",
    title: "SRDL Lab Initiative",
    activity: "Youth coordination meeting",
    location: "Bangladesh",
    date: "November 3, 2018",
  },
  {
    image:
      "/some-events/social/teachers-programming-training-2018.jpg",
    title: "Basic Programming Training for Teachers",
    activity: "Training and instruction",
    location: "Bangladesh",
    date: "April 16, 2018",
  },
  {
    image:
      "/some-events/social/rural-schools-graphic-novel-program-2018.jpg",
    title: "Rural School Education Program",
    activity:
      "Graphic novels and introductory programming",
    location: "Bangladesh",
    date: "January 15, 2018",
  },
  {
    image:
      "/some-events/social/youth-award-organizational-meeting-2017.jpg",
    title: "Youth Award 2017",
    activity: "Organizational meeting",
    location: "Bangladesh",
    date: "June 17, 2017",
  },
  {
    image:
      "/some-events/social/youth-award-coordination-speech-2017.jpg",
    title: "Youth Award 2017",
    activity: "Divisional coordination speech",
    location: "Bangladesh",
    date: "June 13, 2017",
  },
  {
    image:
      "/some-events/social/national-childrens-programming-contest-2017.jpg",
    title: "National Children’s Programming Contest",
    activity: "Initiative presentation",
    location: "Bangladesh",
    date: "November 28, 2017",
  },
  {
    image:
      "/some-events/social/divisional-commissioner-lab-progress-2017.jpg",
    title: "Technology Lab Development",
    activity:
      "Progress report presented to the Divisional Commissioner",
    location: "Bangladesh",
    date: "August 8, 2017",
  },
  {
    image:
      "/some-events/social/student-association-opening-2017.jpg",
    title: "Student Association Program",
    activity: "Opening remarks",
    location: "Bangladesh",
    date: "July 21, 2017",
  },
  {
    image:
      "/some-events/social/cri-youth-coordination-meeting-2016.jpg",
    title: "CRI Youth Coordination Meeting",
    activity:
      "Program organization and coordination",
    location: "Bangladesh",
    date: "December 18, 2016",
  },
  {
    image:
      "/some-events/social/student-association-opening-2016.jpg",
    title: "Student Association Program",
    activity: "Opening remarks",
    location: "Bangladesh",
    date: "July 16, 2016",
  },
  {
    image:
      "/some-events/social/microsoft-service-engineering-training-2016.jpg",
    title: "Microsoft Service Engineering Training",
    activity:
      "Opening remarks and program organization",
    location: "Bangladesh",
    date: "April 23, 2016",
  },
  {
    image:
      "/some-events/social/bangladesh-ict-policy-presentation-2015.jpg",
    title: "ICT Policy Presentation",
    activity:
      "Presentation on Bangladesh’s early digital infrastructure",
    location: "Bangladesh",
    date: "November 9, 2015",
  },
  {
    image:
      "/some-events/social/national-math-olympiad-2015.jpg",
    title: "National Math Olympiad",
    activity: "Event organization",
    location: "Bangladesh",
    date: "August 28, 2015",
  },
  {
    image:
      "/some-events/social/meeting-with-dr-zafar-iqbal.jpg",
    title: "Meeting with Dr. Muhammad Zafar Iqbal",
    activity:
      "Discussion on collaboration with the Computer Society",
    location: "Bangladesh",
  },
  {
    image:
      "/some-events/social/mofa-bangladesh-talk.jpg",
    title: "Ministry of Foreign Affairs, Bangladesh",
    activity: "Talk and institutional engagement",
    location: "Bangladesh",
  },
];

const featuredCommunityImages = new Set([
  "/some-events/social/cornell-without-fear-book-event-2026.jpg",
  "/some-events/social/ma-graduation-montclair-2024.jpg",
  "/some-events/social/teachers-programming-training-2018.jpg",
]);

const featuredCommunityEvents = communityEvents.filter(
  (event) => featuredCommunityImages.has(event.image)
);

const remainingCommunityEvents = communityEvents.filter(
  (event) => !featuredCommunityImages.has(event.image)
);

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showAllCommunity, setShowAllCommunity] =
    useState(false);

  const touchStartX = useRef<number | null>(null);
  const currentEvent = academicEvents[currentIndex];

  const visibleCommunityEvents = showAllCommunity
    ? [
        ...featuredCommunityEvents,
        ...remainingCommunityEvents,
      ]
    : featuredCommunityEvents;

  function previousSlide() {
    setCurrentIndex((current) =>
      current === 0
        ? academicEvents.length - 1
        : current - 1
    );
  }

  function nextSlide() {
    setCurrentIndex((current) =>
      current === academicEvents.length - 1
        ? 0
        : current + 1
    );
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (paused || reducedMotion.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((current) =>
        current === academicEvents.length - 1
          ? 0
          : current + 1
      );
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (touchStartX.current === null) {
      return;
    }

    const distance =
      event.changedTouches[0].clientX -
      touchStartX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        previousSlide();
      } else {
        nextSlide();
      }
    }

    touchStartX.current = null;
  }

  return (
    <>
      <section
        aria-labelledby="academic-events-heading"
        className="mb-16"
      >
        <h2
          id="academic-events-heading"
          className="mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)]"
        >
          Academic Events &amp; Presentations
        </h2>

        <div
          className="group relative max-w-[520px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[3/2] overflow-hidden bg-black/5 dark:bg-white/5">
            <Image
              key={currentEvent.image}
              src={currentEvent.image}
              alt={`${currentEvent.title} — ${currentEvent.activity}`}
              fill
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
            />

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Show previous academic event"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Show next academic event"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronRight
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>

          <div
            aria-live="polite"
            className="mt-4 flex items-start justify-between gap-6"
          >
            <div>
              <h3 className="font-sans text-lg font-semibold leading-7 text-[var(--editorial-ink)]">
                {currentEvent.title}
              </h3>

              <p className="mt-1 font-sans text-[15px] leading-6 text-[var(--editorial-ink)]">
                {currentEvent.activity}
              </p>

              {(currentEvent.location ||
                currentEvent.date) && (
                <p className="mt-1 font-sans text-[13px] leading-5 text-[var(--editorial-muted)]">
                  {currentEvent.location}
                  {currentEvent.location &&
                    currentEvent.date &&
                    " · "}
                  {currentEvent.date}
                </p>
              )}
            </div>

            <p className="shrink-0 font-sans text-[13px] tabular-nums text-[var(--editorial-muted)]">
              {currentIndex + 1} /{" "}
              {academicEvents.length}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="community-events-heading"
        className="mb-16"
      >
        <div className="mb-6">
          <h2
            id="community-events-heading"
            className="font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)]"
          >
            Community Engagement
          </h2>

          <p className="mt-2 max-w-2xl font-sans text-[15px] leading-6 text-[var(--editorial-muted)]">
            Selected educational, civic, and community
            initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCommunityEvents.map((event) => (
            <article key={event.image}>
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
                <Image
                  src={event.image}
                  alt={`${event.title} — ${event.activity}`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 260px"
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              <h3 className="mt-3 font-sans text-base font-semibold leading-6 text-[var(--editorial-ink)]">
                {event.title}
              </h3>

              <p className="mt-1 font-sans text-[14px] leading-5 text-[var(--editorial-ink)]">
                {event.activity}
              </p>

              {(event.location || event.date) && (
                <p className="mt-1 font-sans text-[12px] leading-5 text-[var(--editorial-muted)]">
                  {event.location}
                  {event.location &&
                    event.date &&
                    " · "}
                  {event.date}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() =>
              setShowAllCommunity((current) => !current)
            }
            aria-expanded={showAllCommunity}
            className="font-sans text-sm font-medium text-[var(--editorial-accent)] underline decoration-[var(--editorial-accent)]/40 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {showAllCommunity
              ? "Show fewer community events ↑"
              : `View more community events (${remainingCommunityEvents.length}) →`}
          </button>
        </div>
      </section>
    </>
  );
}