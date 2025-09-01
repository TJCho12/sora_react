import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent } from '../ui/card';
import PageLayout from '../PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const timeline = [
    {
      year: '2018',
      title: t('about.timeline.2018.title'),
      description: t('about.timeline.2018.desc')
    },
    {
      year: '2019',
      title: t('about.timeline.2019.title'),
      description: t('about.timeline.2019.desc')
    },
    {
      year: '2020',
      title: t('about.timeline.2020.title'),
      description: t('about.timeline.2020.desc')
    },
    {
      year: '2022',
      title: t('about.timeline.2022.title'),
      description: t('about.timeline.2022.desc')
    },
    {
      year: '2024',
      title: t('about.timeline.2024.title'),
      description: t('about.timeline.2024.desc')
    }
  ];

  const team = [
    {
      name: t('about.team.drSora.name'),
      role: t('about.team.drSora.role'),
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBmZW1hbGUlMjBtZWRpY2FsfGVufDF8fHx8MTc1NjA5MTQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: t('about.team.drMinJung.name'),
      role: t('about.team.drMinJung.role'),
      image: 'https://images.unsplash.com/photo-1650784853783-68052c97ebfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBkb2N0b3IlMjB3b21hbiUyMG1lZGljYWwlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU2MDkxNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: t('about.team.jiWoo.name'),
      role: t('about.team.jiWoo.role'),
      image: 'https://images.unsplash.com/photo-1740153204545-ac8320c44a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGRvY3RvciUyMGRlcm1hdG9sb2dpc3R8ZW58MXx8fHwxNzU2MDkxNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: t('about.team.hyeJin.name'),
      role: t('about.team.hyeJin.role'),
      image: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwaGVhbHRoY2FyZSUyMGRvY3RvcnxlbnwxfHwxNzU2MDkxNDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <PageLayout letter="A" letterPosition="top-left">
      <div className="max-w-6xl mx-auto py-8 px-[0px] p-[0px] my-[0px] m-[30px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl mb-6 text-gray-800">{t('about.title')} <span className="text-[#0ABAB5]">SoRa</span><span className="text-pink-400">Clinic</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Company Timeline */}
        <section className="mb-[70px] mt-[0px] mr-[20px] ml-[20px] px-[30px] py-[0px]">
          <h2 className="text-4xl text-center mb-12 text-gray-800">{t('about.journey.title')}</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-[#0ABAB5]/30"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-white/80 backdrop-blur-sm border border-[#0ABAB5]/20 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-2xl text-[#0ABAB5] mb-2 font-bold">{item.year}</h3>
                        <h4 className="text-lg mb-3 text-gray-800 font-semibold">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-[#0ABAB5] to-pink-400 rounded-full relative z-10 border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-[70px] mt-[0px] mr-[30px] ml-[30px]">
          <h2 className="text-4xl text-center mb-12 text-gray-800">{t('about.team.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto border-4 border-pink-100 group-hover:border-[#0ABAB5] transition-all duration-300">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0ABAB5]/20 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl mb-2 text-gray-800 font-semibold">{member.name}</h3>
                <p className="text-[#0ABAB5] font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-pink-50/80 via-white to-purple-50/60 rounded-3xl p-12 border border-pink-100/50">
            <div className="text-center">
              <h2 className="text-4xl mb-8 text-gray-800">{t('about.mission.title')}</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('about.mission.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0ABAB5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#0ABAB5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('about.mission.authentic.title')}</h3>
                  <p className="text-gray-600">{t('about.mission.authentic.description')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('about.mission.expert.title')}</h3>
                  <p className="text-gray-600">{t('about.mission.expert.description')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('about.mission.personalized.title')}</h3>
                  <p className="text-gray-600">{t('about.mission.personalized.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </PageLayout>
  );
}