// Force dynamic rendering for the posts admin page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
