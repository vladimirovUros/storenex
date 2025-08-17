"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Palette,
  CreditCard,
  Globe,
  Users,
  MessageSquare,
  Download,
  Smartphone,
  Lock,
  TrendingUp,
  Star,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

const Page = () => {
  const [activeCategory, setActiveCategory] = useState("selling");

  const categories = [
    { id: "selling", name: "SELLING TOOLS", icon: Zap },
    { id: "customization", name: "CUSTOMIZATION", icon: Palette },
    { id: "analytics", name: "ANALYTICS", icon: BarChart3 },
    { id: "security", name: "SECURITY", icon: Shield },
  ] as const;

  type CategoryId = (typeof categories)[number]["id"];

  interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
  }

  const featuresByCategory: Record<
    CategoryId,
    Array<{
      title: string;
      description: string;
      icon: LucideIcon;
      color: string;
    }>
  > = {
    selling: [
      {
        title: "Lightning Fast Checkout",
        description:
          "Optimized checkout process that converts 40% better than industry standard",
        icon: Zap,
        color: "bg-yellow-500",
      },
      {
        title: "Multiple Payment Methods",
        description:
          "Accept credit cards, PayPal, crypto, and 50+ local payment methods",
        icon: CreditCard,
        color: "bg-green-500",
      },
      {
        title: "Instant Digital Delivery",
        description:
          "Automatic file delivery within seconds of successful payment",
        icon: Download,
        color: "bg-blue-500",
      },
      {
        title: "Mobile Optimized",
        description:
          "Perfect shopping experience on all devices and screen sizes",
        icon: Smartphone,
        color: "bg-purple-500",
      },
    ],
    customization: [
      {
        title: "Custom Branding",
        description:
          "Full control over colors, fonts, logos, and overall store appearance",
        icon: Palette,
        color: "bg-pink-500",
      },
      {
        title: "Custom Domain",
        description:
          "Use your own domain name for a professional branded experience",
        icon: Globe,
        color: "bg-indigo-500",
      },
      {
        title: "Page Builder",
        description:
          "Drag & drop page builder with beautiful templates and layouts",
        icon: PlayCircle,
        color: "bg-red-500",
      },
      {
        title: "Email Templates",
        description:
          "Customizable email templates for receipts and customer communication",
        icon: MessageSquare,
        color: "bg-orange-500",
      },
    ],
    analytics: [
      {
        title: "Real-time Dashboard",
        description:
          "Track sales, visitors, conversion rates, and revenue in real-time",
        icon: BarChart3,
        color: "bg-blue-500",
      },
      {
        title: "Customer Insights",
        description:
          "Detailed customer data, purchase history, and behavior analytics",
        icon: Users,
        color: "bg-green-500",
      },
      {
        title: "Sales Reports",
        description:
          "Comprehensive reports with charts, trends, and performance metrics",
        icon: TrendingUp,
        color: "bg-yellow-500",
      },
      {
        title: "A/B Testing",
        description:
          "Test different versions of your store to optimize conversions",
        icon: CheckCircle,
        color: "bg-purple-500",
      },
    ],
    security: [
      {
        title: "SSL Encryption",
        description:
          "Bank-level security with 256-bit SSL encryption for all transactions",
        icon: Lock,
        color: "bg-gray-600",
      },
      {
        title: "PCI Compliance",
        description:
          "Fully PCI DSS compliant payment processing for maximum security",
        icon: Shield,
        color: "bg-green-600",
      },
      {
        title: "Fraud Protection",
        description:
          "Advanced fraud detection and prevention to protect your business",
        icon: CheckCircle,
        color: "bg-red-500",
      },
      {
        title: "99.9% Uptime",
        description:
          "Enterprise-grade hosting with guaranteed uptime and fast loading",
        icon: Zap,
        color: "bg-blue-600",
      },
    ],
  };

  interface Integration {
    name: string;
    logo: string;
  }

  const integrations: Integration[] = [
    { name: "Stripe", logo: "💳" },
    { name: "PayPal", logo: "🅿️" },
    { name: "Mailchimp", logo: "📧" },
    { name: "Google Analytics", logo: "📊" },
    { name: "Zapier", logo: "⚡" },
    { name: "Discord", logo: "🎮" },
    { name: "Slack", logo: "💬" },
    { name: "Webhooks", logo: "🔗" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      content:
        "Storenex helped me increase my sales by 300%. The checkout is so smooth!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Course Creator",
      content:
        "Best platform I've used. Analytics are incredible and customer support is amazing.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Photographer",
      content:
        "Finally a platform that doesn't take huge chunks of my earnings. Love it!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        {/* Decorative elements */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
              POWERFUL
              <br />
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
                FEATURES
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-12 text-gray-300">
              Everything you need to build, customize, and grow
              <br />
              <span className="text-green-400">
                your digital business empire.
              </span>
            </p>
            <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-2xl transform rotate-1 shadow-2xl">
              <p className="text-xl font-black text-white">
                BUILD → SELL → SCALE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="py-12 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-4 rounded-2xl font-black transition-all border-4 ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white border-orange-500 transform scale-105"
                    : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <category.icon className="w-6 h-6 mr-3" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresByCategory[activeCategory as CategoryId].map(
              (feature, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl border-4 border-black p-8 transform hover:scale-105 hover:shadow-2xl transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-semibold leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              SEAMLESS <span className="text-blue-500">INTEGRATIONS</span>
            </h2>
            <p className="text-xl font-semibold text-gray-600">
              Connect with your favorite tools and services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {integrations.map((integration, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl border-4 border-gray-200 p-6 text-center hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <div className="text-4xl mb-3">{integration.logo}</div>
                <p className="font-bold text-sm text-gray-700">
                  {integration.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              CREATORS <span className="text-green-600">LOVE US</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index: number) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-4 border-black p-8 transform hover:scale-105 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-6 text-gray-800">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-black text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 font-semibold">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              WHY CHOOSE <span className="text-orange-500">STORENEX</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-black mb-8 text-red-400">
                OTHER PLATFORMS
              </h3>
              <div className="space-y-4">
                {[
                  "High monthly fees",
                  "Limited customization",
                  "Poor customer support",
                  "Complicated setup",
                  "Hidden charges",
                  "Slow loading times",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-red-500 rounded mr-4 flex items-center justify-center">
                      <span className="text-white font-bold">✕</span>
                    </div>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black mb-8 text-green-400">
                STORENEX
              </h3>
              <div className="space-y-4">
                {[
                  "No monthly fees",
                  "Complete customization",
                  "24/7 expert support",
                  "5-minute setup",
                  "Transparent pricing",
                  "Lightning fast speeds",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded mr-4 flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black text-black mb-8">
            READY TO BUILD YOUR
            <br />
            DIGITAL EMPIRE?
          </h2>

          <p className="text-xl font-bold text-black mb-12 opacity-80">
            Join thousands of creators who are already winning with Storenex
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/sign-up"
              className="bg-black text-white px-10 py-5 text-xl font-black rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              START FREE TODAY
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link
              href="/pricing"
              className="border-4 border-black text-black px-10 py-5 text-xl font-black rounded-2xl hover:bg-black hover:text-white transition-all text-center"
            >
              VIEW PRICING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
