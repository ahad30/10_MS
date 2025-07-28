export interface Medium {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url: string;
}

export interface Checklist {
  id: string;
  text: string;
  icon: string;
  color: string;
  list_page_visibility: boolean;
}

export interface Seo {
  title?: string;
  description?: string;
  keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
}

export interface CtaText {
  name: string;
  value: string;
}

export interface SectionValue {
  id?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  short_description?: string;
  image?: string;
  icon?: string;
  checklist?: string[];
  file_type?: string;
  file_url?: string;
  video_thumbnail?: string;
  profile_image?: string;
  testimonial?: string;
  thumb?: string;
  video_url?: string;
  has_instructor_page?: boolean;
  slug?: string;
  question?: string;
  answer?: string;
  background_color?: string;
  background_img?: string;
  checklist_text_color?: string;
  end_at?: string;
  start_at?: string;
  template?: string;
  text?: string;
  background?: {
    image?: string;
    primary_color?: string;
    secondary_color?: string;
  };
  cta?: {
    clicked_url?: string;
    color?: string;
    text?: string;
  };
  description_color?: string;
  title_color?: string;
  top_left_icon_img?: string;
}

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: SectionValue[];
}

export interface Data {
  slug: string;
  id: number;
  title: string;
  description: string;
  platform: string;
  type: string;
  modality: string;
  old_info: {
    cat_id: number;
    course_id: number;
    platform: string;
    skills_cat_id: number;
    slug: string;
  };
  start_at: string;
  media: Medium[];
  checklist: Checklist[];
  seo: Seo[];
  cta_text: CtaText;
  sections: Section[];
  is_cohort_based_course: boolean;
  delivery_method: string;
}

export interface ApiResponse {
  code: number;
  data: Data;
  message: string;
  status_code: number;
}