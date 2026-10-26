import ScrollTopButton from "@/components/ScrollTopButton";

// Case-study pages are long reads, so they get the back-to-top button.
// The homepage uses its journey rail for navigation instead.
export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollTopButton />
    </>
  );
}
