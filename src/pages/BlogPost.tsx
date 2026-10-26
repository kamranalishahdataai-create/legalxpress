import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";
import { Calendar, BookOpen, ArrowRight, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fallbackPosts, type BlogPost } from "@/data/blogPosts";

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Render curated fallback sections or hosted post body text (paragraphs). */
function ArticleBody({ post }: { post: BlogPost }) {
  if (post.content && post.content.length > 0) {
    return (
      <>
        {post.content.map((section, i) => (
          <div key={i} className="mb-8">
            {section.heading && (
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
            )}
            <p className="text-muted-foreground font-body leading-relaxed">{section.body}</p>
          </div>
        ))}
      </>
    );
  }
  return null;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    async function fetchPost() {
      const fallback = fallbackPosts.find((p) => p.slug === slug);
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, slug, cover_image_url, published_at, content")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (!active) return;
      if (data) {
        setPost({
          ...data,
          content: data.content
            ? data.content.split(/\n{2,}/).map((paragraph) => ({ body: paragraph }))
            : fallback?.content ?? [],
        });
      } else {
        setPost(fallback ?? null);
      }
    }
    fetchPost();
    return () => {
      active = false;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-muted-foreground font-body">
          Loading article…
        </div>
      </Layout>
    );
  }

  if (post === null) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Article not found</h1>
          <p className="text-muted-foreground font-body mb-8">
            This article is no longer available. Browse our latest insights instead.
          </p>
          <Button asChild>
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo
        title={`${post.title} | LegalXpress Blog`}
        description={post.excerpt ?? post.title}
        type="article"
      />
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Legal Insights</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80 font-body">
            <Calendar className="h-4 w-4" />
            {formatDate(post.published_at)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <ArticleBody post={post} />

          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 mb-10">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground font-body">
              This article is general legal information, not legal advice. It does not create a
              lawyer-client relationship. For advice about your situation, book a consultation.
            </p>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
              Questions about your situation?
            </h2>
            <p className="text-muted-foreground font-body mb-6">
              Book a free 30-minute consultation with a licensed Ontario lawyer.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
