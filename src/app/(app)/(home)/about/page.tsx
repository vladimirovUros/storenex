"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  Users,
  Zap,
  Globe,
  Heart,
  Star,
  Sparkles,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#fef7cd] relative overflow-hidden">
      {/* FLOATING BACKGROUND CHAOS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-24 h-24 bg-orange-500 border-4 border-black rotate-45 opacity-20"></div>
        <div className="absolute top-[25%] right-[8%] w-16 h-32 bg-green-400 border-4 border-black -rotate-12 opacity-25"></div>
        <div className="absolute top-[60%] left-[3%] w-20 h-20 bg-yellow-300 border-4 border-black rounded-full opacity-30"></div>
        <div className="absolute bottom-[20%] right-[15%] w-28 h-14 bg-orange-500 border-4 border-black rotate-[25deg] opacity-15"></div>
        <div className="absolute top-[45%] left-[85%] w-12 h-24 bg-green-400 border-4 border-black -rotate-45 opacity-20"></div>
        <div className="absolute bottom-[45%] left-[12%] w-16 h-16 bg-yellow-300 border-4 border-black rotate-[60deg] opacity-25"></div>
      </div>

      {/* HERO SECTION - COMPLETE CHAOS */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* MASSIVE BACKGROUND SHAPE */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500 border-8 border-black rotate-12 opacity-5 rounded-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* TITLE EXPLOSION */}
          <div className="text-center relative">
            <div className="relative inline-block">
              {/* BACKGROUND TITLE SHADOW */}
              <div className="absolute top-4 left-4 text-[8rem] md:text-[12rem] font-black text-black opacity-20 -rotate-2">
                ABOUT
              </div>

              {/* MAIN TITLE */}
              <h1 className="relative z-10 text-[8rem] md:text-[12rem] font-black leading-none">
                <span className="block -rotate-3 text-black">ABOUT</span>
                <span className="block rotate-2 text-orange-500 -mt-8">
                  STORE
                </span>
                <span className="block -rotate-1 text-green-400 -mt-6">
                  NEX
                </span>
              </h1>

              {/* FLOATING DECORATIONS AROUND TITLE */}
              <Star className="absolute -top-8 -right-16 w-16 h-16 fill-yellow-300 stroke-black stroke-4 rotate-12 animate-pulse" />
              <Sparkles className="absolute -bottom-12 -left-12 w-12 h-12 fill-green-400 stroke-black stroke-3 -rotate-45" />
              <Zap className="absolute top-1/2 -right-20 w-10 h-10 fill-orange-500 stroke-black stroke-3 rotate-[30deg]" />
              <Rocket className="absolute top-1/4 -left-16 w-14 h-14 fill-yellow-300 stroke-black stroke-3 -rotate-12" />
            </div>

            {/* FLOATING MISSION BUBBLE */}
            <div className="relative mt-32 flex justify-center">
              <div className="relative max-w-4xl">
                {/* SHADOW LAYER */}
                <div className="absolute top-6 left-6 w-full h-full bg-black rotate-2"></div>
                {/* MAIN BUBBLE */}
                <div className="relative bg-white border-6 border-black p-12 -rotate-1 rounded-[30px]">
                  {/* BUBBLE DECORATIONS */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 border-3 border-black rotate-45"></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-500 border-3 border-black rounded-full"></div>
                  <div className="absolute top-4 right-8 w-6 h-6 bg-green-400 border-2 border-black rotate-45"></div>

                  <p className="text-2xl md:text-3xl font-black leading-relaxed text-center">
                    We&apos;re on a
                    <span className="bg-yellow-300 px-4 py-2 -rotate-2 inline-block border-3 border-black rounded-lg">
                      CRAZY MISSION
                    </span>
                    to make selling digital products{" "}
                    <span className="bg-orange-500 text-white px-4 py-2 rotate-1 inline-block border-3 border-black rounded-lg">
                      STUPIDLY EASY
                    </span>{" "}
                    for creators worldwide!
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING SEARCH BAR */}
            <div className="relative mt-24 flex justify-center">
              <div className="relative">
                {/* SEARCH SHADOW */}
                <div className="absolute top-3 left-3 w-full h-full bg-black rotate-1 rounded-full"></div>
                {/* SEARCH CONTAINER */}
                <div className="relative bg-white border-4 border-black rounded-full p-3 flex items-center max-w-lg -rotate-1">
                  <Input
                    placeholder="Search our wild story..."
                    className="border-0 text-lg font-bold flex-1 focus:ring-0 focus:outline-none bg-transparent rounded-full"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600 border-3 border-black rounded-full p-3 ml-2 rotate-2">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION - FLOATING CHAOS */}
      <div className="relative py-40">
        <div className="container mx-auto px-4">
          <div className="relative max-w-7xl mx-auto">
            {/* BACKGROUND MAYHEM */}
            <div className="absolute top-20 left-10 w-80 h-80 bg-green-400 border-8 border-black -rotate-12 opacity-15 rounded-[50px]"></div>
            <div className="absolute bottom-0 right-20 w-96 h-96 bg-yellow-300 border-8 border-black rotate-45 opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500 border-8 border-black rotate-[30deg] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>

            {/* FLOATING STAT CARDS - COMPLETE CHAOS */}
            <div className="relative z-20">
              {/* 10K+ CREATORS */}
              <div className="absolute top-0 left-[10%] transform -rotate-12">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-black rounded-[20px]"></div>
                  <div className="relative bg-white border-6 border-black p-8 rounded-[20px] text-center">
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-300 border-2 border-black rotate-45"></div>
                    <Users className="h-12 w-12 mx-auto mb-4 stroke-black stroke-3" />
                    <div className="text-5xl font-black mb-2">10K+</div>
                    <div className="font-black text-lg">CREATORS</div>
                  </div>
                </div>
              </div>

              {/* 50K+ PRODUCTS */}
              <div className="absolute top-20 right-[15%] transform rotate-6">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-black rounded-[25px]"></div>
                  <div className="relative bg-yellow-300 border-6 border-black p-10 rounded-[25px] text-center">
                    <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-orange-500 border-3 border-black rounded-full"></div>
                    <Zap className="h-14 w-14 mx-auto mb-4 stroke-black stroke-3" />
                    <div className="text-6xl font-black mb-2">50K+</div>
                    <div className="font-black text-xl">PRODUCTS</div>
                  </div>
                </div>
              </div>

              {/* 100+ COUNTRIES */}
              <div className="absolute top-64 left-[5%] transform -rotate-6">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-black rounded-[30px]"></div>
                  <div className="relative bg-orange-500 border-6 border-black p-8 rounded-[30px] text-center">
                    <div className="absolute -top-4 -right-2 w-6 h-12 bg-green-400 border-3 border-black rotate-45"></div>
                    <Globe className="h-12 w-12 mx-auto mb-4 stroke-white stroke-3" />
                    <div className="text-5xl font-black mb-2 text-white">
                      100+
                    </div>
                    <div className="font-black text-lg text-white">
                      COUNTRIES
                    </div>
                  </div>
                </div>
              </div>

              {/* 99% SATISFACTION */}
              <div className="absolute top-80 right-[8%] transform rotate-12">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-black rounded-full"></div>
                  <div className="relative bg-green-400 border-6 border-black p-10 rounded-full text-center">
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 border-2 border-black rotate-45"></div>
                    <Heart className="h-14 w-14 mx-auto mb-4 stroke-black stroke-3 fill-black" />
                    <div className="text-6xl font-black mb-2">99%</div>
                    <div className="font-black text-xl">HAPPY</div>
                  </div>
                </div>
              </div>

              {/* PLACEHOLDER FOR SPACING */}
              <div className="h-[600px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* STORY SECTION - ASYMMETRIC MADNESS */}
      <div className="relative py-32 bg-white border-y-8 border-black">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            {/* SECTION TITLE - FLOATING */}
            <div className="text-center mb-32 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-48 h-12 bg-yellow-300 border-6 border-black -rotate-2 rounded-[20px]"></div>
              <h2 className="text-7xl md:text-9xl font-black rotate-1 relative z-10 bg-white inline-block px-12 py-4 border-6 border-black rounded-[30px]">
                OUR STORY
              </h2>
              {/* <div className="absolute -bottom-4 -right-8 w-16 h-16 bg-orange-500 border-4 border-black rotate-45"></div> */}
            </div>

            {/* STORY CARDS - FLOATING ASYMMETRIC */}
            <div className="relative">
              {/* THE BEGINNING */}
              <div className="absolute top-0 left-[5%] max-w-2xl">
                <div className="relative">
                  <div className="absolute top-6 left-6 w-full h-full bg-black rounded-[40px]"></div>
                  <div className="relative bg-yellow-300 border-6 border-black p-12 -rotate-2 rounded-[40px]">
                    <div className="absolute -top-6 left-12 bg-black text-white px-6 py-3 border-3 border-black rotate-3 font-black text-lg rounded-[15px]">
                      THE BEGINNING
                    </div>
                    <div className="pt-8">
                      <p className="text-xl font-bold leading-relaxed">
                        It all started when we realized that selling digital
                        products was
                        <span className="bg-white px-3 py-1 border-2 border-black rotate-1 inline-block mx-2 rounded-lg">
                          WAY TOO HARD
                        </span>
                        Creators were spending more time on boring stuff than
                        creating!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DECORATIVE ELEMENT 1 */}
              {/* <div className="absolute top-32 right-[10%] w-32 h-64 bg-orange-500 border-6 border-black rotate-45 rounded-[30px]"></div> */}

              {/* THE MISSION */}
              <div className="absolute top-80 right-[5%] max-w-2xl">
                <div className="relative">
                  <div className="absolute top-6 left-6 w-full h-full bg-black rounded-[50px]"></div>
                  <div className="relative bg-orange-500 border-6 border-black p-12 rotate-3 rounded-[50px]">
                    <div className="absolute -top-6 right-12 bg-white text-black px-6 py-3 border-3 border-black -rotate-2 font-black text-lg rounded-[15px]">
                      THE MISSION
                    </div>
                    <div className="pt-8">
                      <p className="text-xl font-bold leading-relaxed text-white">
                        We believe every creator deserves a platform that&apos;s
                        <span className="bg-yellow-300 text-black px-3 py-1 border-2 border-black -rotate-1 inline-block mx-2 rounded-lg">
                          BOLD & WILD
                        </span>
                        No boring stuff, just pure
                        <span className="bg-white text-black px-3 py-1 border-2 border-black rotate-2 inline-block mx-2 rounded-lg font-black">
                          BRUTAL SIMPLICITY!
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DECORATIVE ELEMENT 2 */}
              {/* <div className="absolute top-[500px] left-[15%] w-48 h-48 bg-green-400 border-6 border-black rounded-full"></div> */}

              {/* THE FUTURE */}
              <div className="absolute top-[700px] left-[8%] max-w-2xl">
                <div className="relative">
                  <div className="absolute top-6 left-6 w-full h-full bg-black rounded-[35px]"></div>
                  <div className="relative bg-green-400 border-6 border-black p-12 -rotate-1 rounded-[35px]">
                    <div className="absolute -top-6 left-12 bg-orange-500 text-white px-6 py-3 border-3 border-black rotate-1 font-black text-lg rounded-[15px]">
                      THE FUTURE
                    </div>
                    <div className="pt-8">
                      <p className="text-xl font-bold leading-relaxed">
                        We&apos;re just getting started! Our vision is to become
                        <span className="bg-black text-white px-3 py-1 border-2 border-white rotate-2 inline-block mx-2 rounded-lg">
                          THE PLATFORM
                        </span>
                        for digital creators worldwide!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PLACEHOLDER FOR SPACING */}
              <div className="h-[1000px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION - FLOATING CHAOS */}
      <div className="relative py-40 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* FLOATING BACKGROUND MADNESS */}
          {/* <div className="absolute top-16 right-16 w-48 h-48 bg-yellow-300 border-6 border-white rotate-45 opacity-20 rounded-[40px]"></div> */}
          {/* <div className="absolute bottom-20 left-20 w-32 h-64 bg-orange-500 border-6 border-white rounded-full opacity-30 -rotate-12"></div> */}
          {/* <div className="absolute top-1/2 left-1/2 w-64 h-32 bg-green-400 border-6 border-white rotate-[60deg] opacity-15 -translate-x-1/2 -translate-y-1/2 rounded-[50px]"></div> */}

          <div className="relative z-10">
            <h2 className="text-7xl md:text-9xl font-black mb-32 text-center rotate-2 relative">
              <span className="bg-white text-black px-8 py-4 inline-block border-6 border-white rounded-[40px] -rotate-1">
                OUR VALUES
              </span>
            </h2>

            <div className="relative max-w-7xl mx-auto">
              {/* TRANSPARENCY */}
              <div className="absolute top-0 left-[5%] max-w-sm">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-white rounded-[30px]"></div>
                  <div className="relative bg-yellow-300 text-black border-6 border-white p-10 -rotate-6 rounded-[30px]">
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-white border-3 border-black rotate-45"></div>
                    <h3 className="text-3xl font-black mb-6 text-center">
                      TRANSPARENCY
                    </h3>
                    <p className="font-bold leading-relaxed text-center">
                      No hidden fees, no surprise charges. What you see is what
                      you get!
                    </p>
                  </div>
                </div>
              </div>

              {/* SIMPLICITY */}
              <div className="absolute top-40 right-[8%] max-w-sm">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-white rounded-[25px]"></div>
                  <div className="relative bg-orange-500 text-white border-6 border-white p-10 rotate-4 rounded-[25px]">
                    <div className="absolute -bottom-3 -left-3 w-6 h-12 bg-yellow-300 border-3 border-black rotate-45"></div>
                    <h3 className="text-3xl font-black mb-6 text-center">
                      SIMPLICITY
                    </h3>
                    <p className="font-bold leading-relaxed text-center">
                      Complex problems deserve simple solutions. We keep it
                      brutally simple!
                    </p>
                  </div>
                </div>
              </div>

              {/* COMMUNITY */}
              <div className="absolute top-80 left-[20%] max-w-sm">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-full h-full bg-white rounded-[35px]"></div>
                  <div className="relative bg-green-400 text-black border-6 border-white p-10 -rotate-3 rounded-[35px]">
                    <div className="absolute -top-3 -right-3 w-12 h-6 bg-orange-500 border-3 border-black rotate-45"></div>
                    <h3 className="text-3xl font-black mb-6 text-center">
                      COMMUNITY
                    </h3>
                    <p className="font-bold leading-relaxed text-center">
                      Creators supporting creators. We&apos;re all in this wild
                      journey together!
                    </p>
                  </div>
                </div>
              </div>

              {/* PLACEHOLDER FOR SPACING */}
              <div className="h-[600px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION - FINAL CHAOS */}
      <div className="relative py-40 bg-[#fef7cd]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            {/* BACKGROUND MADNESS */}
            {/* <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400 border-8 border-black rotate-12 opacity-20 rounded-[60px]"></div> */}
            {/* <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500 border-8 border-black -rotate-6 opacity-15 rounded-full"></div> */}

            <div className="relative z-10 text-center">
              <h2 className="text-6xl md:text-8xl font-black mb-16 relative">
                <span className="block rotate-2">READY TO</span>
                <span className="block text-orange-500 -rotate-3 -mt-4">
                  JOIN THE
                </span>
                <span className="block text-green-400 rotate-1 -mt-4">
                  CHAOS?
                </span>
              </h2>

              <div className="relative mb-20">
                <div className="absolute -top-4 -left-4 w-full h-full bg-black rotate-2 rounded-[50px]"></div>
                <div className="relative bg-white border-6 border-black p-12 max-w-4xl mx-auto -rotate-1 rounded-[50px]">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 border-3 border-black rotate-45 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-16 bg-green-400 border-3 border-black -rotate-12"></div>
                  <p className="text-2xl md:text-3xl font-black mb-12">
                    Start selling your digital products today and become part of
                    our
                    <span className="bg-yellow-300 px-4 py-2 mx-3 border-3 border-black -rotate-2 inline-block rounded-[15px]">
                      AMAZING
                    </span>
                    creator community!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-8 justify-center">
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-600 border-6 border-black text-xl font-black -rotate-2 hover:-translate-x-2 hover:-translate-y-2 transition-all px-8 py-6 rounded-[20px]"
                      >
                        START SELLING NOW
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </Link>

                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-6 border-black text-xl font-black rotate-2 hover:-translate-x-2 hover:-translate-y-2 transition-all px-8 py-6 rounded-[20px] bg-white"
                      >
                        GET IN TOUCH
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE - FLOATING */}
      <div className="bg-orange-500 border-t-8 border-black py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-20 h-20 bg-yellow-300 border-4 border-black rotate-45 -translate-y-1/2 rounded-[10px]"></div>
        <div className="absolute top-0 right-1/3 w-16 h-32 bg-green-400 border-4 border-black -rotate-12 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-24 h-12 bg-white border-4 border-black rotate-[30deg] translate-y-1/2 rounded-full"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-2xl font-black">
            Made with{" "}
            <Heart className="inline h-6 w-6 mx-2 fill-current animate-pulse" />{" "}
            by creators, for creators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
