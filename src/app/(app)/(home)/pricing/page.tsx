"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Users,
  Shield,
  Star,
  Check,
} from "lucide-react";

const Page = () => {
  const [activeCalculator, setActiveCalculator] = useState(1000);

  const pricingTiers = [
    {
      title: "STARTER SELLERS",
      fee: "3%",
      range: "$0 - $10k/month",
      color: "bg-green-500",
      features: [
        "No monthly fees",
        "Instant payouts",
        "24/7 support",
        "Basic analytics",
      ],
    },
    {
      title: "PRO CREATORS",
      fee: "2.5%",
      range: "$10k - $50k/month",
      color: "bg-orange-500",
      popular: true,
      features: [
        "Priority support",
        "Advanced analytics",
        "Custom checkout",
        "Marketing tools",
      ],
    },
    {
      title: "ENTERPRISE",
      fee: "2%",
      range: "$50k+ /month",
      color: "bg-yellow-500",
      features: [
        "Dedicated manager",
        "Custom integrations",
        "White-label options",
        "API access",
      ],
    },
  ];

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateProfit = (revenue: number) => {
    const storenexFee = revenue * 0.03;
    const competitorFee = revenue * 0.05 + 29; // 5% + $29 monthly
    return {
      storenex: revenue - storenexFee,
      competitor: revenue - competitorFee,
      savings: revenue - storenexFee - (revenue - competitorFee),
    };
  };

  const stats = [
    { number: "$50M+", label: "CREATOR EARNINGS", icon: DollarSign },
    { number: "100K+", label: "HAPPY SELLERS", icon: Users },
    { number: "99.9%", label: "UPTIME", icon: Shield },
    { number: "4.9/5", label: "RATING", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        {/* Decorative elements */}
        {/* <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500 rounded-2xl transform rotate-12 opacity-80"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-500 rounded-2xl opacity-80"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-500 transform rotate-45 opacity-80"></div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
              HONEST
              <br />
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
                PRICING
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-12 text-gray-300">
              No hidden fees. No monthly charges.
              <br />
              <span className="text-green-400">
                Just simple, fair pricing that grows with you.
              </span>
            </p>
            <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-2xl transform -rotate-1 shadow-2xl">
              <p className="text-xl font-black text-black">
                YOU SUCCEED → WE SUCCEED
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              SIMPLE <span className="text-orange-500">RATES</span>
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              The more you sell, the less you pay
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl border-4 border-black p-8 transform hover:scale-105 transition-all hover:shadow-2xl ${
                  tier.popular ? "scale-105 ring-4 ring-orange-200" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-6 py-2 rounded-full font-black text-sm">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                <div
                  className={`inline-block px-4 py-2 ${tier.color} text-white font-black rounded-lg mb-6`}
                >
                  {tier.title}
                </div>

                <div className="mb-6">
                  <div className="text-6xl font-black text-gray-900 mb-2">
                    {tier.fee}
                  </div>
                  <p className="text-lg font-bold text-gray-600">
                    per transaction
                  </p>
                  <p className="text-sm font-semibold text-gray-500 mt-2">
                    {tier.range}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/sign-up"
                  className={`block w-full py-4 px-6 rounded-xl font-black transition-all text-center ${
                    tier.popular
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:shadow-lg transform hover:-translate-y-1"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  GET STARTED
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6">
              SEE YOUR <span className="text-green-600">SAVINGS</span>
            </h2>
            <p className="text-xl font-semibold text-gray-600">
              Compare what you&apos;d keep with Storenex vs others
            </p>
          </div>

          <div className="bg-white rounded-3xl border-4 border-black p-8 shadow-2xl">
            <div className="mb-8">
              <label className="text-2xl font-black mb-4 block">
                Monthly Revenue:
              </label>
              <div className="flex flex-wrap gap-4">
                {[500, 1000, 2500, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setActiveCalculator(amount)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      activeCalculator === amount
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ${formatNumber(amount)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border-4 border-red-200 rounded-2xl p-6">
                <h3 className="text-2xl font-black text-red-600 mb-4">
                  OTHER PLATFORMS
                </h3>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-bold">
                      ${formatNumber(activeCalculator)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly fee:</span>
                    <span className="font-bold text-red-600">-$29</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction fee (5%):</span>
                    <span className="font-bold text-red-600">
                      -${Math.round(activeCalculator * 0.05)}
                    </span>
                  </div>
                  <div className="border-t-2 border-red-300 pt-3 flex justify-between text-xl font-black">
                    <span>You keep:</span>
                    <span className="text-red-600">
                      $
                      {formatNumber(
                        Math.round(calculateProfit(activeCalculator).competitor)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-4 border-green-200 rounded-2xl p-6">
                <h3 className="text-2xl font-black text-green-600 mb-4">
                  STORENEX
                </h3>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-bold">
                      ${formatNumber(activeCalculator)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly fee:</span>
                    <span className="font-bold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction fee (3%):</span>
                    <span className="font-bold text-green-600">
                      -${Math.round(activeCalculator * 0.03)}
                    </span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-3 flex justify-between text-xl font-black">
                    <span>You keep:</span>
                    <span className="text-green-600">
                      $
                      {formatNumber(
                        Math.round(calculateProfit(activeCalculator).storenex)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-green-500 to-yellow-500 text-black p-6 rounded-2xl inline-block">
                <p className="text-2xl font-black">
                  YOU SAVE $
                  {formatNumber(
                    Math.round(
                      Math.abs(calculateProfit(activeCalculator).savings)
                    )
                  )}{" "}
                  MORE WITH STORENEX!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black text-center mb-16">
            TRUSTED BY <span className="text-orange-500">CREATORS</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-6">
                  <stat.icon className="w-10 h-10 text-black" />
                </div>
                <div className="text-4xl font-black mb-2 text-green-400">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO KEEP
            <br />
            MORE OF YOUR MONEY?
          </h2>

          <p className="text-xl font-bold text-black mb-12 opacity-80">
            Join thousands of creators who chose the smarter way to sell
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/sign-up"
              className="bg-black text-white px-10 py-5 text-xl font-black rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              START SELLING FREE
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link
              href="/features"
              className="border-4 border-black text-black px-10 py-5 text-xl font-black rounded-2xl hover:bg-black hover:text-white transition-all text-center"
            >
              VIEW FEATURES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
