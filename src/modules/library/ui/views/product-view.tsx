"use client";

import Link from "next/link";
import { ArrowLeftIcon, AlertTriangleIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Suspense } from "react";
import { ReviewFormSkeleton } from "../components/review-form";

interface Props {
  productId: string;
}

// Funkcija za čišćenje RichText podataka
const cleanRichTextData = (
  data: unknown
): { cleanedData: unknown; hasErrors: boolean } => {
  if (!data || typeof data !== "object" || data === null) {
    return { cleanedData: data, hasErrors: false };
  }

  const dataObj = data as Record<string, unknown>;
  if (
    !dataObj.root ||
    typeof dataObj.root !== "object" ||
    dataObj.root === null
  ) {
    return { cleanedData: data, hasErrors: false };
  }

  const rootObj = dataObj.root as Record<string, unknown>;
  if (!Array.isArray(rootObj.children)) {
    return { cleanedData: data, hasErrors: false };
  }

  let hasErrors = false;

  const cleanNode = (node: unknown): unknown => {
    if (!node || typeof node !== "object" || node === null) return node;

    const nodeObj = node as Record<string, unknown>;

    // Ako je upload node i nema relationship ili je null
    if (
      nodeObj.type === "upload" &&
      (!nodeObj.value ||
        (typeof nodeObj.value === "object" &&
          nodeObj.value !== null &&
          !(nodeObj.value as Record<string, unknown>).id))
    ) {
      hasErrors = true;
      return null; // Uklanjamo problematičan node
    }

    // Rekurzivno čisti children
    if (Array.isArray(nodeObj.children)) {
      nodeObj.children = nodeObj.children
        .map(cleanNode)
        .filter((child: unknown) => child !== null);
    }

    return node;
  };

  const cleanedData = {
    ...dataObj,
    root: {
      ...rootObj,
      children: rootObj.children
        .map(cleanNode)
        .filter((child: unknown) => child !== null),
    },
  };

  return { cleanedData, hasErrors };
};

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/library" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md border gap-4">
              <Suspense fallback={<ReviewFormSkeleton />}>
                <ReviewSidebar productId={productId} />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            {data.content ? (
              (() => {
                const { cleanedData, hasErrors } = cleanRichTextData(
                  data.content
                );

                if (hasErrors) {
                  return (
                    <div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangleIcon className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-amber-800 mb-2">
                              Some Content Unavailable
                            </h3>
                            <p className="text-amber-700 mb-3">
                              Some files in this content are no longer available
                              and have been removed. This may happen if files
                              were deleted from the system or if some problem
                              occurred.
                            </p>
                            <p className="text-sm text-amber-600">
                              Please contact the seller for assistance or
                              alternative access to the missing content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <RichText data={cleanedData as any} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="prose max-w-none">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <RichText data={cleanedData as any} />
                  </div>
                );
              })()
            ) : (
              <p className="font-medium italic text-muted-foreground">
                No special content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProductViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </div>
      </nav>
    </div>
  );
};

//PORUKA U STILU APLIKACIJE
// "use client";

// import Link from "next/link";
// import { ArrowLeftIcon, AlertTriangleIcon } from "lucide-react";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";
// import { ReviewSidebar } from "../components/review-sidebar";
// import { RichText } from "@payloadcms/richtext-lexical/react";

// interface Props {
//   productId: string;
// }

// // Funkcija za čišćenje RichText podataka
// const cleanRichTextData = (
//   data: any
// ): { cleanedData: any; hasErrors: boolean } => {
//   if (!data || !data.root || !data.root.children) {
//     return { cleanedData: data, hasErrors: false };
//   }

//   let hasErrors = false;

//   const cleanNode = (node: any): any => {
//     if (!node) return node;

//     // Ako je upload node i nema relationship ili je null
//     if (node.type === "upload" && (!node.value || !node.value.id)) {
//       hasErrors = true;
//       return null; // Uklanjamo problematičan node
//     }

//     // Rekurzivno čisti children
//     if (node.children && Array.isArray(node.children)) {
//       node.children = node.children
//         .map(cleanNode)
//         .filter((child: any) => child !== null);
//     }

//     return node;
//   };

//   const cleanedData = {
//     ...data,
//     root: {
//       ...data.root,
//       children: data.root.children
//         .map(cleanNode)
//         .filter((child: any) => child !== null),
//     },
//   };

//   return { cleanedData, hasErrors };
// };

// export const ProductView = ({ productId }: Props) => {
//   const trpc = useTRPC();
//   const { data } = useSuspenseQuery(
//     trpc.library.getOne.queryOptions({ productId })
//   );
//   return (
//     <div className="min-h-screen bg-white">
//       <nav className="p-4 bg-[#F4F4F0] w-full border-b">
//         <Link prefetch href="/library" className="flex items-center gap-2">
//           <ArrowLeftIcon className="size-4" />
//           <span className="text font-medium">Back to Library</span>
//         </Link>
//       </nav>
//       <header className="bg-[#F4F4F0] py-8 border-b">
//         <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
//           <h1 className="text-[40px] font-medium">{data.name}</h1>
//         </div>
//       </header>
//       <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
//           <div className="lg:col-span-2">
//             <div className="p-4 bg-white rounded-md border gap-4">
//               <ReviewSidebar productId={productId} />
//             </div>
//           </div>
//           <div className="lg:col-span-5">
//             {data.content ? (
//               (() => {
//                 const { cleanedData, hasErrors } = cleanRichTextData(
//                   data.content
//                 );

//                 if (hasErrors) {
//                   return (
//                     <div>
//                       <div className="bg-yellow-300 border-4 border-black p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-[-0.5deg]">
//                         <div className="flex items-start gap-4">
//                           <div className="bg-red-500 border-2 border-black p-2 rounded-none transform rotate-1">
//                             <AlertTriangleIcon className="size-6 text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-black text-xl text-black mb-3 uppercase tracking-wide transform -rotate-1">
//                               ⚠️ CONTENT MISSING!
//                             </h3>
//                             <div className="bg-white border-2 border-black p-4 mb-3 transform rotate-0.5">
//                               <p className="font-bold text-black text-sm leading-relaxed">
//                                 SOME FILES HAVE BEEN DELETED FROM THE SYSTEM AND
//                                 ARE NO LONGER AVAILABLE FOR DISPLAY.
//                               </p>
//                             </div>
//                             <div className="bg-black text-white p-3 border-2 border-black font-mono text-xs uppercase tracking-wider">
//                               → CONTACT SELLER FOR ASSISTANCE
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="prose max-w-none">
//                         <RichText data={cleanedData} />
//                       </div>
//                     </div>
//                   );
//                 }

//                 return (
//                   <div className="prose max-w-none">
//                     <RichText data={cleanedData} />
//                   </div>
//                 );
//               })()
//             ) : (
//               <p className="font-medium italic text-muted-foreground">
//                 No special content
//               </p>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
