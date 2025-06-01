import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = [
  "curated",
  "hot_and_new",
  "trending",
  // "price-asc",
  // "price-desc",
  // "relevance",
  // "best-selling",
  // "highest-rated",
  // "most-discounted",
] as const;

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};
export const useProductFilters = () => {
  return useQueryStates(params);
};
