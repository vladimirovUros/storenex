"use client";

import Link from "next/link";
import { ArrowLeftIcon, AlertTriangleIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Suspense } from "react";
import { ReviewFormSkeleton } from "../components/review-form";
import type { Product } from "@/payload-types";

interface Props {
  productId: string;
}

type RichTextData = NonNullable<Product["content"]>;

const cleanRichTextData = (
  data: unknown
): { cleanedData: unknown; hasErrors: boolean; isEmpty: boolean } => {
  if (!data || typeof data !== "object" || data === null) {
    return { cleanedData: data, hasErrors: false, isEmpty: true };
  }

  const dataObj = data as Record<string, unknown>;
  if (
    !dataObj.root ||
    typeof dataObj.root !== "object" ||
    dataObj.root === null
  ) {
    return { cleanedData: data, hasErrors: false, isEmpty: true };
  }

  const rootObj = dataObj.root as Record<string, unknown>;
  if (!Array.isArray(rootObj.children)) {
    return { cleanedData: data, hasErrors: false, isEmpty: true };
  }

  let hasErrors = false;

  const cleanNode = (node: unknown): unknown => {
    if (!node || typeof node !== "object" || node === null) return node;

    const nodeObj = node as Record<string, unknown>;
    if (
      nodeObj.type === "upload" &&
      (!nodeObj.value ||
        (typeof nodeObj.value === "object" &&
          nodeObj.value !== null &&
          !(nodeObj.value as Record<string, unknown>).id))
    ) {
      hasErrors = true;
      return null;
    }
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
  const isEmpty =
    rootObj.children.length === 1 &&
    rootObj.children[0] &&
    typeof rootObj.children[0] === "object" &&
    (rootObj.children[0] as Record<string, unknown>).type === "paragraph" &&
    Array.isArray((rootObj.children[0] as Record<string, unknown>).children) &&
    ((rootObj.children[0] as Record<string, unknown>).children as unknown[])
      .length === 0;

  return { cleanedData, hasErrors, isEmpty };
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
                const { cleanedData, hasErrors, isEmpty } = cleanRichTextData(
                  data.content
                );
                if (isEmpty) {
                  return (
                    <div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangleIcon className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-amber-800 mb-2">
                              Content Appears Empty
                            </h3>
                            <p className="text-amber-700 mb-3">
                              The content for this product appears to be empty.
                              This may happen if files were removed from the
                              system or if the content was cleared.
                            </p>
                            <p className="text-sm text-amber-600">
                              Please contact the seller for assistance or to
                              clarify the content availability.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

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
                        <RichText data={cleanedData as RichTextData} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="prose max-w-none">
                    <RichText data={cleanedData as RichTextData} />
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
