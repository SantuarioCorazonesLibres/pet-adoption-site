interface TestimonialCardProps {
  dogName: string;
  adopterName: string;
  adoptionDate: string;
  testimonial: string;
  dogImage: string;
}

export default function TestimonialCard({
  dogName,
  adopterName,
  adoptionDate,
  testimonial,
  dogImage,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex-shrink-0">
          <img
            src={dogImage}
            alt={dogName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-red-50"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 break-words">
              {dogName}
            </h3>
            <p className="text-sm text-gray-600 break-words">
              Adoptado por <span className="font-medium text-red-600">{adopterName}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{adoptionDate}</p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute -left-2 top-0 text-red-600 text-5xl opacity-20 leading-none">
              "
            </div>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed sm:pl-6 italic space-y-3 sm:space-y-4">
              {testimonial.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index}>{paragraph.trim()}</p>
                )
              ))}
            </div>
            <div className="hidden sm:block absolute -right-2 bottom-0 text-red-600 text-5xl opacity-20 leading-none">
              "
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
