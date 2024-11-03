import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920&h=600',
    title: 'Welcome to DZEducation',
    titleAr: 'مرحباً بكم في DZEducation',
    titleFr: 'Bienvenue sur DZEducation',
    description: 'Your gateway to comprehensive educational resources',
    descriptionAr: 'بوابتك إلى الموارد التعليمية الشاملة',
    descriptionFr: 'Votre portail vers des ressources éducatives complètes'
  },
  {
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1920&h=600',
    title: 'Expert-Curated Materials',
    titleAr: 'مواد منتقاة من قبل الخبراء',
    titleFr: 'Matériels sélectionnés par des experts',
    description: 'Access high-quality educational content across all subjects',
    descriptionAr: 'الوصول إلى محتوى تعليمي عالي الجودة في جميع المواد',
    descriptionFr: 'Accédez à du contenu éducatif de haute qualité dans toutes les matières'
  },
  {
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1920&h=600',
    title: 'Prepare for Success',
    titleAr: 'استعد للنجاح',
    titleFr: 'Préparez-vous au succès',
    description: 'Comprehensive exam preparation resources at your fingertips',
    descriptionAr: 'موارد شاملة للتحضير للامتحانات في متناول يدك',
    descriptionFr: 'Des ressources complètes de préparation aux examens à portée de main'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { i18n } = useTranslation();

  const getLocalizedContent = (slide: typeof slides[0]) => {
    switch (i18n.language) {
      case 'ar':
        return { title: slide.titleAr, description: slide.descriptionAr };
      case 'fr':
        return { title: slide.titleFr, description: slide.descriptionFr };
      default:
        return { title: slide.title, description: slide.description };
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => {
        const content = getLocalizedContent(slide);
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            <div className="relative h-full flex items-center justify-center text-center">
              <div className="max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {content.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200">
                  {content.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}