import { BookOpen, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  [key: string]: any;
}

interface Props {
  posts: BlogPost[];
  onNavigate: (path: string) => void;
}

export default function BlogSection({ posts, onNavigate }: Props) {
  if (!posts.length) return null;
  return (
    <div className="mt-12 pt-8 border-t border-slate-200/40 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h4 className="font-extrabold text-lg text-gray-900">Expert Guides & Insights</h4>
        </div>
        <button
          onClick={() => {
            window.history.pushState({}, "", "/blog");
            onNavigate("/blog");
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center cursor-pointer"
        >
          <span>Explore all articles</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {posts.slice(0, 4).map(post => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-500/12 hover:-translate-y-1 duration-300 transition-all group cursor-pointer hover:border-indigo-500/30"
            onClick={() => {
              window.history.pushState({}, "", `/blog/${post.slug}`);
              onNavigate(`/blog/${post.slug}`);
            }}
          >
            <div className="space-y-3">
              <span className="text-[9px] font-mono font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                {post.category}
              </span>
              <h5 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h5>
              <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-4 font-mono">
              <span>{post.publishedAt}</span>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
