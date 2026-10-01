"use client";

import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  PackageCheck,
  Send,
} from "lucide-react";

const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chapainawabganj",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

type FormData = {
  fullName: string;
  mobileNumber: string;
  email: string;
  fullAddress: string;
  district: string;
  thanaOrUpazila: string;
  deliveryNote: string;
  deliveryMethod: "" | "inside_dhaka" | "outside_dhaka";
};

const emptyForm: FormData = {
  fullName: "",
  mobileNumber: "",
  email: "",
  fullAddress: "",
  district: "",
  thanaOrUpazila: "",
  deliveryNote: "",
  deliveryMethod: "",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-950";

const labelClass =
  "mb-2 block font-medium text-gray-800 dark:text-gray-200";

export default function PackageAddressPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [closed, setClosed] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function verifyPassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch("/api/package-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verify",
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message || "Unable to open the form."
        );
      }

      setClosed(Boolean(result.closed));
      setRemaining(Number(result.remaining));
      setUnlocked(true);
    } catch (caughtError) {
      setError(true);
      setMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to open the form."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function submitAddress(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch("/api/package-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit",
          password,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result.code === "FORM_CLOSED") {
          setClosed(true);
        }

        throw new Error(
          result.message ||
          "The address could not be submitted."
        );
      }

      setSubmitted(true);
      setRemaining(Number(result.remaining));
      setFormData(emptyForm);
    } catch (caughtError) {
      setError(true);
      setMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "The address could not be submitted."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-[80vh] bg-gray-100 px-5 py-14 dark:bg-gray-950 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <header className="mb-9 text-center">
            <h1 className="text-3xl font-semibold text-gray-950 dark:text-white md:text-4xl">
              Complimentary Book Distribution
            </h1>

            <p className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-300">
              বিনামূল্যে বই বিতরণ
            </p>
          </header>

          <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <section className="border-b border-gray-300 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 md:border-b-0 md:border-r md:p-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden rounded border border-gray-300 bg-white dark:border-gray-600">
                      <Image
                        src="/package-book/book-cover.jpg"
                        alt="Front cover of The Unfinished Memoirs by Sheikh Mujibur Rahman"
                        fill
                        priority
                        sizes="(max-width: 768px) 45vw, 360px"
                        className="object-contain p-2"
                      />
                    </div>

                    <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                      Photo credit:{" "}
                      <a
                        href="http://baatighar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        baatighar.com
                      </a>
                    </figcaption>
                  </figure>

                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden rounded border border-gray-300 bg-white dark:border-gray-600">
                      <Image
                        src="/package-book/book-secondary.jpg"
                        alt="The Unfinished Memoirs displayed from a second position"
                        fill
                        sizes="(max-width: 768px) 45vw, 360px"
                        className="object-contain p-2"
                      />
                    </div>

                    <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                      Photo credit: The University Press Limited
                      (UPL)
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section className="p-7 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Private address form
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-gray-950 dark:text-white">
                  The Unfinished Memoirs
                </h2>

                <p className="mt-1 text-2xl font-medium text-gray-700 dark:text-gray-300">
                  অসমাপ্ত আত্মজীবনী
                </p>

                <div className="mt-6 space-y-4 leading-7 text-gray-700 dark:text-gray-300">
                  <p>
                    বঙ্গবন্ধু শেখ মুজিবুর রহমানের{" "}
                    <strong>অসমাপ্ত আত্মজীবনী</strong>{" "}
                    বইটির ৫০টি কপি বিনামূল্যে বিতরণ করছি।
                    অনুগ্রহ করে আপনার ঠিকানা প্রদান করুন।
                    বাতিঘর প্রকাশনী অথবা UPL আপনার ঠিকানায়
                    বইটি বিনামূল্যে পাঠিয়ে দেবে।
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We are distributing 50 complimentary copies
                    of Bangabandhu Sheikh Mujibur Rahman&apos;s{" "}
                    <strong>The Unfinished Memoirs</strong>.
                    Please provide your delivery address.
                    Batighar Prokashoni or UPL will send the
                    book to your address free of charge.
                  </p>
                </div>

                <hr className="my-7 border-gray-200 dark:border-gray-700" />

                <form onSubmit={verifyPassword}>
                  {message && (
                    <div
                      className={`mb-5 rounded border px-4 py-3 text-sm ${
                        error
                          ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                          : "border-green-300 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
                      }`}
                    >
                      {message}
                    </div>
                  )}

                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-900 dark:text-gray-100"
                  >
                    Access Code
                  </label>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    প্রবেশের জন্য আপনাকে দেওয়া কোডটি লিখুন।
                  </p>

                  <div className="relative mt-3">
                    <input
                      id="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                      autoComplete="current-password"
                      className="w-full rounded border border-gray-400 bg-white px-4 py-3 pr-12 text-gray-950 outline-none transition focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-950 dark:text-white"
                      placeholder="Enter access code"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      aria-label={
                        showPassword
                          ? "Hide access code"
                          : "Show access code"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full rounded bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-gray-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {loading
                      ? "Verifying..."
                      : "Continue • প্রবেশ করুন"}
                  </button>
                </form>

                <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  This form is limited to 50 invited recipients.
                  Your address will only be used to deliver the
                  book.
                  <br />
                  এই ফর্মটি সর্বোচ্চ ৫০ জন আমন্ত্রিত প্রাপকের
                  জন্য। আপনার ঠিকানা শুধু বইটি পৌঁছে দেওয়ার
                  কাজে ব্যবহার করা হবে।
                </p>
              </section>
            </div>

            <section className="border-t border-gray-300 px-7 py-9 dark:border-gray-700 md:px-10">
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-white">
                Why this book is important
              </h2>

              <p className="mt-1 text-lg font-medium text-gray-700 dark:text-gray-300">
                কেন বইটি পড়া জরুরি
              </p>

              <div className="mt-5 grid gap-7 leading-8 text-gray-700 dark:text-gray-300 md:grid-cols-2">
                <div>
                  <p>
                    <strong>অসমাপ্ত আত্মজীবনী</strong>{" "}
                    শুধু একটি স্মৃতিকথা নয়; বাংলাদেশের
                    রাজনৈতিক ইতিহাসের অসংখ্য গুরুত্বপূর্ণ
                    উপাদান এই গ্রন্থে পাওয়া যায়। পাকিস্তান
                    আমলের উল্লেখযোগ্য রাজনৈতিক ব্যক্তিত্বদের
                    সঙ্গে বঙ্গবন্ধুর সম্পর্ক এবং
                    পাকিস্তানবিরোধী সংগ্রামের বিভিন্ন পর্যায়
                    সম্পর্কে জানার জন্য বইটি তুলনাহীন।
                  </p>

                  <p className="mt-4">
                    বইটি একজন সংবেদনশীল স্বামী, স্নেহময় পিতা
                    এবং চরম প্রতিকূলতার মুখেও অবিচল থাকা এক
                    রাজনৈতিক ব্যক্তিত্বের পরিচয় তুলে ধরে।
                  </p>
                </div>

                <div>
                  <p>
                    More than a memoir, this book is an
                    invaluable source for understanding the
                    political history of Bangladesh. It
                    documents Bangabandhu&apos;s relationships
                    with prominent political figures and
                    important stages of the anti-Pakistan
                    movement.
                  </p>

                  <p className="mt-4">
                    It also presents a deeply personal portrait
                    of a sensitive husband, an affectionate
                    father, and a leader who remained steadfast
                    during extraordinary adversity.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-400">
                বই পরিচিতির অংশ বাতিঘর প্রকাশনীর বই পরিচিতি
                থেকে সংগৃহীত। Portions of the description are
                adapted from Batighar Prokashoni&apos;s book
                introduction.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  if (closed) {
    return (
      <div className="min-h-[75vh] bg-gray-50 px-6 py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
          <PackageCheck className="mx-auto h-16 w-16 text-blue-700 dark:text-blue-300" />

          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Form Closed
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            All 50 available submissions have been received.
            This form is no longer accepting addresses.
          </p>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            ৫০টি ঠিকানা জমা হয়েছে। এই ফর্মটি এখন বন্ধ।
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-[75vh] bg-gray-50 px-6 py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Address Submitted
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Thank you. Your delivery address has been submitted
            successfully.
          </p>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            ধন্যবাদ। আপনার ঠিকানা সফলভাবে জমা হয়েছে।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <PackageCheck className="h-8 w-8 text-blue-700 dark:text-blue-300" />

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Provide Your Delivery Address
            </h1>
          </div>

          <p className="mt-3 text-xl font-medium text-gray-700 dark:text-gray-300">
            আপনার ডেলিভারি ঠিকানা প্রদান করুন
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Complete the form below so your complimentary book
            can be delivered to the correct address.
          </p>

          {remaining !== null && (
            <p className="mt-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              {remaining} submission spaces remaining
            </p>
          )}
        </div>

        <form
          onSubmit={submitAddress}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-10"
        >
          {message && (
            <div
              className={`rounded-lg p-4 text-sm ${
                error
                  ? "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                  : "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300"
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              maxLength={100}
              autoComplete="name"
              className={inputClass}
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={labelClass}
                htmlFor="mobileNumber"
              >
                Mobile Number{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                maxLength={30}
                autoComplete="tel"
                className={inputClass}
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={150}
                autoComplete="email"
                className={inputClass}
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="fullAddress"
            >
              Full Address{" "}
              <span className="text-red-500">*</span>
            </label>

            <textarea
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              required
              maxLength={500}
              rows={4}
              autoComplete="street-address"
              className={`${inputClass} resize-y`}
              placeholder="House or flat number, road, village or area"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={labelClass}
                htmlFor="district"
              >
                District{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select district</option>

                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={labelClass}
                htmlFor="thanaOrUpazila"
              >
                Thana or Upazila{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="thanaOrUpazila"
                name="thanaOrUpazila"
                value={formData.thanaOrUpazila}
                onChange={handleChange}
                required
                maxLength={100}
                className={inputClass}
                placeholder="Enter thana or upazila"
              />
            </div>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="deliveryNote"
            >
              Delivery Note
            </label>

            <textarea
              id="deliveryNote"
              name="deliveryNote"
              value={formData.deliveryNote}
              onChange={handleChange}
              maxLength={500}
              rows={3}
              className={`${inputClass} resize-y`}
              placeholder="Alternative mobile number or delivery instructions"
            />
          </div>

          <fieldset>
            <legend className={labelClass}>
              Delivery Method{" "}
              <span className="text-red-500">*</span>
            </legend>

            <div className="mt-3 space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 text-gray-800 transition hover:border-blue-500 dark:border-gray-600 dark:text-gray-200">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="inside_dhaka"
                  checked={
                    formData.deliveryMethod === "inside_dhaka"
                  }
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-blue-700"
                />

                <span>Inside Dhaka</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 text-gray-800 transition hover:border-blue-500 dark:border-gray-600 dark:text-gray-200">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="outside_dhaka"
                  checked={
                    formData.deliveryMethod ===
                    "outside_dhaka"
                  }
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-blue-700"
                />

                <span>Outside Dhaka</span>
              </label>
            </div>
          </fieldset>

          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            Your information will only be used to deliver your
            complimentary book and will not be displayed
            publicly.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            <Send className="h-5 w-5" />

            {loading
              ? "Submitting..."
              : "Submit Address"}
          </button>
        </form>
      </div>
    </div>
  );
}