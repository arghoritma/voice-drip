import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Users,
  BarChart2,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target,
  Zap,
  Award,
  Heart,
  Clock,
  Shield,
  MessageCircle
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      title: "Manajemen Tugas Intuitif",
      description: "Buat, edit, dan selesaikan tugas dengan mudah dan cepat"
    },
    {
      icon: <Users className="w-6 h-6 text-violet-600" />,
      title: "Pengelompokan Kategori",
      description: "Organisir tugas Anda dengan sistem kategori yang fleksibel dan mudah digunakan"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
      title: "Analisis Produktivitas",
      description: "Pantau dan tingkatkan produktivitas dengan visualisasi data yang jelas"
    }
  ];

  const benefits = [
    {
      icon: <div className="flex justify-center"><Calendar className="w-12 h-12 text-violet-600" /></div>,
      title: "Tampilan Multi-View",
      description: "Lihat tugas dalam tampilan harian, mingguan, atau bulanan sesuai kebutuhan Anda"
    },
    {
      icon: <div className="flex justify-center"><Target className="w-12 h-12 text-emerald-600" /></div>,
      title: "Fokus pada Prioritas",
      description: "Identifikasi dan kerjakan tugas penting dengan sistem kategori yang jelas"
    },
    {
      icon: <div className="flex justify-center"><Zap className="w-12 h-12 text-amber-600" /></div>,
      title: "Produktivitas Meningkat",
      description: "Tingkatkan efisiensi kerja dengan manajemen waktu yang lebih baik"
    }
  ];

  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "Aplikasi ini membantu saya mengelola bisnis dengan lebih terstruktur. Fitur kategori sangat membantu mengorganisir berbagai jenis tugas.",
      rating: 5
    },
    {
      name: "Siti Rahma",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      content: "Saya suka tampilan yang bersih dan mudah digunakan. Sekarang jadwal konten saya lebih teratur.",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      content: "Perfect untuk manajemen tim! Kategorisasi tugas membuat tracking project jadi lebih mudah.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Apakah aplikasi ini gratis?",
      answer: "Ya, aplikasi ini gratis untuk fitur dasar. Kami juga menyediakan versi premium dengan fitur tambahan untuk kebutuhan yang lebih spesifik."
    },
    {
      question: "Bagaimana cara memulai menggunakan aplikasi ini?",
      answer: "Cukup daftar dengan email Anda, dan Anda bisa langsung mulai membuat dan mengorganisir tugas-tugas Anda."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, kami menggunakan enkripsi tingkat tinggi dan mematuhi standar keamanan industri untuk melindungi data Anda."
    },
    {
      question: "Apakah bisa digunakan untuk tim?",
      answer: "Tentu! Fitur kategori dan berbagi tugas memudahkan kolaborasi dalam tim."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 mb-6">
              Tingkatkan Produktivitas, Kurangi Stress, Raih Targetmu
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Solusi manajemen tugas yang membantu Anda fokus pada yang penting, dengan sistem kategorisasi cerdas dan tampilan yang nyaman.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang - Gratis!
              </Link>
              <a
                href="#learn-more"
                className="px-8 py-4 bg-white text-violet-600 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl border border-violet-200"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section className="py-20 bg-white" id="learn-more">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Kenali Masalah Ini?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-2xl">
              <Clock className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Kesulitan Mengatur Waktu</h3>
              <p className="text-gray-600">Merasa kewalahan mengatur jadwal dan mengelola tugas-tugas pribadi?</p>
            </div>
            <div className="bg-amber-50 p-8 rounded-2xl">
              <Target className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Target Tidak Tercapai</h3>
              <p className="text-gray-600">Sering merasa tidak produktif dan gagal mencapai target yang sudah ditetapkan?</p>
            </div>
            <div className="bg-violet-50 p-8 rounded-2xl">
              <MessageCircle className="w-12 h-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Koordinasi Pribadi Rumit</h3>
              <p className="text-gray-600">Kesulitan mengkoordinasikan tugas pribadi dan melacak progress pekerjaan?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-white to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Solusi Lengkap untuk Produktivitas Anda
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Manfaat yang Anda Dapatkan
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Apa Kata Pengguna Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Mulai Sekarang dan Dapatkan
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Garansi 30 Hari</h3>
              <p className="text-violet-200">Uang kembali jika tidak puas</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fitur Premium</h3>
              <p className="text-violet-200">Akses semua fitur tanpa batas</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Support 24/7</h3>
              <p className="text-violet-200">Bantuan kapan saja</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Update Berkala</h3>
              <p className="text-violet-200">Fitur baru setiap bulan</p>
            </div>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-violet-600 font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-violet-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-violet-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 text-gray-600 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Siap Meningkatkan Produktivitas Anda?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Bergabung dengan ribuan pengguna yang telah merasakan manfaat dari manajemen tugas yang lebih baik
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            Mulai Perjalanan Anda <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
