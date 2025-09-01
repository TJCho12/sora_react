import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import PageLayout from '../PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TreatmentsPage() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: t('treatments.post1.title'),
      excerpt: t('treatments.post1.excerpt'),
      image: 'https://images.unsplash.com/photo-1559185590-765cdc663325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBza2luY2FyZSUyMHJvdXRpbmUlMjBzdGVwc3xlbnwxfHx8fDE3NTYwODY2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Sora Kim',
      date: 'December 20, 2024',
      category: 'K-Beauty'
    },
    {
      id: 2,
      title: t('treatments.post2.title'),
      excerpt: t('treatments.post2.excerpt'),
      image: 'https://images.unsplash.com/photo-1588192069224-b7c4ee7ed5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHNraW4lMjBiZWF1dHklMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzU2MDg2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Min-Jung Lee',
      date: 'December 18, 2024',
      category: 'Skincare Tips'
    },
    {
      id: 3,
      title: t('treatments.post3.title'),
      excerpt: t('treatments.post3.excerpt'),
      image: 'https://images.unsplash.com/photo-1748390359572-8e7a47bf5cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyYXRpbmclMjBmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NTYwODY2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Ji-Woo Park',
      date: 'December 15, 2024',
      category: 'Ingredients'
    },
    {
      id: 4,
      title: t('treatments.post4.title'),
      excerpt: t('treatments.post4.excerpt'),
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=250&fit=crop',
      author: 'Hye-Jin Choi',
      date: 'December 12, 2024',
      category: 'Seasonal Care'
    },
    {
      id: 5,
      title: t('treatments.post5.title'),
      excerpt: t('treatments.post5.excerpt'),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      author: 'Dr. Sora Kim',
      date: 'December 10, 2024',
      category: 'Science'
    },
    {
      id: 6,
      title: t('treatments.post6.title'),
      excerpt: t('treatments.post6.excerpt'),
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=250&fit=crop',
      author: 'Dr. Min-Jung Lee',
      date: 'December 8, 2024',
      category: 'Anti-Aging'
    }
  ];

  return (
    <PageLayout letter="T" letterPosition="top-right">
      <div className="max-w-6xl mx-auto py-8 px-[0px] mx-[30px] my-[0px] px-[20px] py-[28px]">
        <div className="text-center mb-10">
          <h1 className="text-5xl mb-6 text-gray-800">{t('treatments.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('treatments.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    {post.date}
                  </div>
                </div>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#0ABAB5]/10 to-pink-400/10 text-[#0ABAB5] rounded-full text-sm mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#0ABAB5] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#0ABAB5] to-pink-400 hover:from-[#0ABAB5]/90 hover:to-pink-400/90 text-white transition-all duration-300"
                >
                  {t('common.readMore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}