"use client";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Freshly cut, freshly packed meat delivered to your doorstep",
    answer:
      "Your search for farm-fresh, high-quality meat ends with TenderCuts. Order the best, locally-sourced mutton, chicken, eggs, fish and seafood from your friendly neighbourhood meat store – TenderCuts. Enjoy lightning-fast home delivery on every order. Order meat online with TenderCuts to whip up a feast fit for a king.",
  },
  {
    id: 2,
    question: "Deliciousness in every bite",
    answer:
      "Every cut is carefully selected and packed to ensure maximum freshness and flavour. Our expert butchers ensure the highest quality standards so you get the best meat every time.",
  },
  {
    id: 3,
    question: "Our Freshness Tracker Guarantees Fresh meat delivery",
    answer:
      "Our proprietary Freshness Tracker monitors every order from farm to your doorstep. We guarantee that all meat is delivered within hours of cutting to ensure peak freshness.",
  },
  {
    id: 4,
    question: "Download the TenderCuts App",
    answer:
      "Get the TenderCuts app for a seamless meat shopping experience. Available on iOS and Android. Enjoy exclusive app-only offers and track your orders in real time.",
  },
];

export default function AboutSection() {
  // Which item is open — null means all closed
  const [openId, setOpenId] = useState<number | null>(null); 

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">

      {/* Heading — Image 1 jaisa */}
      <h2 className="text-gray-900 font-bold text-lg md:text-xl mb-5">
        TenderCuts Farm Fresh Meat &amp; Fresh Fish
      </h2>

      {/* Accordion list */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Question row */}
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className={`text-sm md:text-base font-semibold pr-4 ${isOpen ? "text-gray-900" : "text-gray-800"}`}>
                  {faq.question}
                </span>

                {/* + / — icon — red color */}
                <span className="text-red-500 text-xl font-light flex-shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Answer — smooth expand */}
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}