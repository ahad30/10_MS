'use client';

import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Section } from '@/types/product';
import InstructorsSection from '@/components/InstructorsSection';
import CourseFeatures from '@/components/CourseFeatures';
import LearningOutcomes from '@/components/LearningOutcomes';
import FeatureExplanations from '@/components/FeatureExplanations';
import AboutCourse from '@/components/AboutCourse';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { ReusableSlider } from './Slider/ReusableSlider';

const TAB_TYPES = [
  'instructors',
  'features',
  'feature_explanations',
  'about',
  'pointers',
  'testimonials',
  'faq',
] as const;

type TabType = typeof TAB_TYPES[number];

interface TabSliderProps {
  sections: Section[];
}

export const TabItems = ({ sections }: TabSliderProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('instructors');
  const sectionRefs = {
    instructors: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    feature_explanations: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    pointers: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (tabType: TabType) => {
    setActiveTab(tabType);
    sectionRefs[tabType].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const tabItems = sections
    .filter((section): section is Section & { type: TabType } =>
      TAB_TYPES.includes(section.type as TabType)
    )
    .map((section) => ({
      type: section.type as TabType,
      name: section.name,
    }));

     const sliderSettings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <>
      {/* Sticky Tab Navigation with Slider */}
      <div className="sticky top-[49px] z-30 bg-white border-b border-gray-200">
        <ReusableSlider
          slidesToShow={3}
          slidesToScroll={1}
          infinite={false}
          dots={false}
           responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          className="tab-slider"
        >
          {tabItems.map(({ type, name }) => (
            <button
              key={type}
              onClick={() => scrollToSection(type)}
              className={` py-2  font-medium text-sm transition-colors w-full duration-200 border-b-2 ${
                activeTab === type
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              {name || type}
            </button>
          ))}
        </ReusableSlider>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 pt-4">
        <div ref={sectionRefs.instructors} className="scroll-mt-[110px]">
          <InstructorsSection sections={sections} />
        </div>

        <div ref={sectionRefs.features} className="scroll-mt-[110px]">
          <CourseFeatures sections={sections} />
        </div>

        <div ref={sectionRefs.pointers} className="scroll-mt-[110px]">
          <LearningOutcomes sections={sections} />
        </div>

        <div ref={sectionRefs.feature_explanations} className="scroll-mt-[110px]">
          <FeatureExplanations sections={sections} />
        </div>

        <div ref={sectionRefs.about} className="scroll-mt-[110px]">
          <AboutCourse sections={sections} />
        </div>

        <div ref={sectionRefs.testimonials} className="scroll-mt-[110px]">
          <Testimonials sections={sections} />
        </div>

        <div ref={sectionRefs.faq} className="scroll-mt-[110px]">
          <FAQ sections={sections} />
        </div>
      </div>
    </>
  );
};

export default TabItems;