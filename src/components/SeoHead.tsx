import { useSEO } from "../hooks/useSEO";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  schemas?: object[]; // Optional JSON-LD schemas
}

export default function SeoHead({ title, description, canonicalPath, schemas }: SeoHeadProps) {
  useSEO({
    title,
    description,
    canonicalPath,
    schemas
  });

  return null;
}

