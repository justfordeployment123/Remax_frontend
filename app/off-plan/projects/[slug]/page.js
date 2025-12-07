"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { 
  Building2, MapPin, Calendar, Home, TrendingUp, CheckCircle, 
  ArrowLeft, Download, Mail, Phone, Share2 
} from 'lucide-react';

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/off-plan-projects/${params.slug}`
      );

      if (!response.ok) {
        throw new Error('Project not found');
      }

      const data = await response.json();

      if (data.success) {
        setProject(data.data);
      } else {
        setError(data.message || 'Failed to load project');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Project not found or unavailable');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(2)}M`;
    }
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00458b] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/off-plan/projects"
            className="inline-flex items-center gap-2 bg-[#00458b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003366] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const primaryImage = project.images?.find(img => img.isPrimary) || project.images?.[0];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#00458b]">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/off-plan" className="text-gray-600 hover:text-[#00458b]">Off-Plan</Link>
            <span className="text-gray-400">/</span>
            <Link href="/off-plan/projects" className="text-gray-600 hover:text-[#00458b]">Projects</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{project.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/off-plan/projects"
            className="inline-flex items-center gap-2 text-[#00458b] hover:text-[#003366] mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Project Image */}
            <div className="relative h-96 lg:h-[500px] bg-gray-200 rounded-xl overflow-hidden">
              {primaryImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${primaryImage.url}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-20 h-20 text-gray-400" />
                </div>
              )}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Building2 className="w-4 h-4 text-[#00458b]" />
                  <span>By {project.developer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#00458b]" />
                  <span>{project.community}</span>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
              
              <div className="bg-blue-50 border-l-4 border-[#00458b] p-4 rounded-lg mb-6">
                <p className="text-gray-700 leading-relaxed">{project.keyHighlight}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Starting Price</p>
                  <p className="text-2xl font-bold text-[#00458b]">{formatPrice(project.startingPrice)}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Unit Types</p>
                  <p className="text-lg font-semibold text-gray-900">{project.unitTypes}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Handover</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {project.handoverQuarter} {project.handoverYear}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'coming-soon' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'sold-out' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status === 'coming-soon' ? 'Coming Soon' :
                     project.status === 'sold-out' ? 'Sold Out' :
                     project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>

              {project.paymentPlan && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 mb-1">Payment Plan</p>
                      <p className="text-sm text-green-800">{project.paymentPlan}</p>
                    </div>
                  </div>
                </div>
              )}

              <Link
                href={`/contact-us?topic=Off-Plan&project=${encodeURIComponent(project.name)}`}
                className="block w-full text-center bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors"
              >
                Request More Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {project.description && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h2>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-[#00458b] transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Downloads */}
      {(project.brochureUrl || project.floorPlansUrl || project.masterPlanUrl) && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Downloads</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-6 hover:border-[#00458b] hover:shadow-lg transition-all"
                >
                  <Download className="w-6 h-6 text-[#00458b]" />
                  <div>
                    <p className="font-semibold text-gray-900">Project Brochure</p>
                    <p className="text-sm text-gray-600">Download PDF</p>
                  </div>
                </a>
              )}
              {project.floorPlansUrl && (
                <a
                  href={project.floorPlansUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-6 hover:border-[#00458b] hover:shadow-lg transition-all"
                >
                  <Download className="w-6 h-6 text-[#00458b]" />
                  <div>
                    <p className="font-semibold text-gray-900">Floor Plans</p>
                    <p className="text-sm text-gray-600">Download PDF</p>
                  </div>
                </a>
              )}
              {project.masterPlanUrl && (
                <a
                  href={project.masterPlanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-6 hover:border-[#00458b] hover:shadow-lg transition-all"
                >
                  <Download className="w-6 h-6 text-[#00458b]" />
                  <div>
                    <p className="font-semibold text-gray-900">Master Plan</p>
                    <p className="text-sm text-gray-600">Download PDF</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interested in {project.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with our off-plan specialist to learn more about this project
          </p>
          <Link
            href={`/contact-us?topic=Off-Plan&project=${encodeURIComponent(project.name)}`}
            className="inline-flex items-center gap-2 bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to See More Off-Plan Projects?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our curated selection of off-plan opportunities across Dubai
          </p>
          <Link
            href="/off-plan/projects"
            className="inline-flex items-center gap-2 bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors"
          >
            <Building2 className="w-5 h-5" />
            Browse All Projects
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
