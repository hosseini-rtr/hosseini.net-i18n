// Force dynamic rendering for the create-post page
// This prevents Next.js from trying to statically generate this admin page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
