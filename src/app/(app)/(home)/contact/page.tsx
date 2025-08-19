"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  CheckCircle,
  HelpCircle,
  Zap,
  Users,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Full name is required");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push("Please enter a valid email address");
      }
    }

    if (!formData.subject.trim()) {
      errors.push("Subject is required");
    }

    if (!formData.message.trim()) {
      errors.push("Message is required");
    } else if (formData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        const firstError = validationErrors[0] || "Validation error";
        setError(firstError);
        toast.error(firstError);
        return;
      }
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "general",
        });
      } else {
        setError(result.error || "Failed to send message");
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Greska", error);
      setError("Failed to send message. Please try again later.");
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      title: "LIVE CHAT",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      color: "bg-green-500",
      action: "Start Chat",
      availability: "24/7 Available",
    },
    {
      title: "EMAIL SUPPORT",
      description: "Send us detailed questions anytime",
      icon: Mail,
      color: "bg-blue-500",
      action: "hello@storenex.com",
      availability: "Response in 2-4 hours",
    },
    {
      title: "PHONE SUPPORT",
      description: "Talk directly with our experts",
      icon: Phone,
      color: "bg-orange-500",
      action: "+1 (555) 123-4567",
      availability: "Mon-Fri 9AM-6PM EST",
    },
  ];

  const faqs = [
    {
      question: "How quickly can I start selling?",
      answer:
        "You can set up your store and start selling within 5 minutes of signing up!",
    },
    {
      question: "Do you charge monthly fees?",
      answer:
        "No! We only charge a small percentage when you make a sale. No monthly fees ever.",
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! You can connect your custom domain on any paid plan.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "We support 50+ payment methods including cards, PayPal, Apple Pay, and crypto.",
    },
  ];

  const categories = [
    { value: "general", label: "General Question", icon: HelpCircle },
    { value: "technical", label: "Technical Support", icon: Zap },
    { value: "billing", label: "Billing & Payments", icon: Shield },
    { value: "partnership", label: "Partnership", icon: Users },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl border-4 border-green-500 p-12 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6">
              MESSAGE SENT!
            </h1>
            <p className="text-xl font-semibold text-gray-600 mb-8">
              Thanks for reaching out! We&apos;ll get back to you within 1-3
              hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-600 transition-all transform hover:scale-105"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
              GET IN
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
                TOUCH
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-12 text-gray-300">
              Questions? Issues? Ideas?
              <br />
              <span className="text-blue-400">
                We&apos;re here to help you succeed.
              </span>
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-2xl transform -rotate-1 shadow-2xl">
              <p className="text-xl font-black text-white">
                TALK → SOLVE → GROW
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              CHOOSE YOUR <span className="text-orange-500">METHOD</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-4 border-black p-8 transform hover:scale-105 hover:shadow-2xl transition-all text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${method.color} rounded-2xl mb-6`}
                >
                  <method.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  {method.title}
                </h3>
                <p className="text-gray-600 font-semibold mb-6">
                  {method.description}
                </p>
                <p className="text-lg font-black text-gray-900 mb-4">
                  {method.action}
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  {method.availability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6">
              SEND US A <span className="text-red-500">MESSAGE</span>
            </h2>
            <p className="text-xl font-semibold text-gray-600">
              Fill out the form and we&apos;ll get back to you quickly
            </p>
          </div>

          <div className="bg-white rounded-3xl border-4 border-black p-8 shadow-2xl">
            {error && (
              <div className="bg-red-100 border-4 border-red-500 text-red-700 px-6 py-4 rounded-2xl mb-6">
                <p className="font-bold">{error}</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-4 border-gray-300 rounded-2xl font-semibold text-gray-900 focus:border-orange-500 focus:outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-4 border-gray-300 rounded-2xl font-semibold text-gray-900 focus:border-orange-500 focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    CATEGORY
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-4 border-gray-300 rounded-2xl font-semibold text-gray-900 focus:border-orange-500 focus:outline-none transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-4 border-gray-300 rounded-2xl font-semibold text-gray-900 focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-4 border-gray-300 rounded-2xl font-semibold text-gray-900 focus:border-orange-500 focus:outline-none transition-all resize-none"
                    placeholder="Tell us everything! The more details, the better we can help you."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 px-8 rounded-2xl font-black text-xl hover:shadow-lg transform hover:scale-105 transition-all inline-flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="ml-3 w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              QUICK <span className="text-yellow-400">ANSWERS</span>
            </h2>
            <p className="text-xl font-semibold text-gray-300">
              Maybe we already answered your question
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl border-4 border-gray-700 p-6 hover:border-yellow-400 transition-all"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-black font-black">?</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-3 text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 font-semibold leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Office Info */}
      {/* <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black mb-12">
            FIND <span className="text-blue-500">US</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black mb-2">HEADQUARTERS</h3>
              <p className="text-gray-600 font-semibold">
                123 Creator Street
                <br />
                Digital City, DC 12345
                <br />
                United States
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-black mb-2">BUSINESS HOURS</h3>
              <p className="text-gray-600 font-semibold">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM EST
                <br />
                Support: 24/7
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-black mb-2">EMERGENCY</h3>
              <p className="text-gray-600 font-semibold">
                Critical issues only
                <br />
                emergency@storenex.com
                <br />
                +1 (555) 911-HELP
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Page;
