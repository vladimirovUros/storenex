import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string; catchAll: string[] }>;
}

export default async function CatchAll({ params: _params }: Props) {
  // Uvek pozovi notFound() za sve catch-all rute
  notFound();
}
