import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  treatmentType: string;
  appointmentDate: Date | undefined;
  timeSlot: string;
  skinType: string;
  skinConcerns: string;
  previousTreatments: string;
  allergies: string;
  message: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    treatmentType: '',
    appointmentDate: undefined,
    timeSlot: '',
    skinType: '',
    skinConcerns: '',
    previousTreatments: '',
    allergies: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const treatmentTypes = [
    'Consultation Only',
    'Glass Skin Treatment',
    'Glow Up Facial',
    'Hydra Boost Therapy',
    'Brightening Essence',
    'Anti-Aging Ritual',
    'SoRa Beauty Package',
    'Custom Treatment Plan',
    'Maintenance Session'
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM'
  ];

  const skinTypes = [
    'Normal',
    'Dry',
    'Oily',
    'Combination',
    'Sensitive',
    'Mature',
    'Not Sure'
  ];

  const skinConcernOptions = [
    'Dullness & Lack of Glow',
    'Uneven Skin Tone',
    'Fine Lines & Wrinkles',
    'Dehydration',
    'Large Pores',
    'Acne & Breakouts',
    'Dark Spots',
    'Redness & Sensitivity',
    'Loss of Firmness',
    'Multiple Concerns'
  ];

  const handleInputChange = (field: keyof BookingForm, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.treatmentType) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Prepare booking data
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.treatmentType,
        date: formData.appointmentDate ? formData.appointmentDate.toISOString().split('T')[0] : '',
        time: formData.timeSlot,
        skinType: formData.skinType,
        skinConcerns: formData.skinConcerns,
        previousTreatments: formData.previousTreatments,
        allergies: formData.allergies,
        message: formData.message
      };

      // Submit to Supabase backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3336005e/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Success - show toast and reset form
        toast.success('Booking submitted successfully! Our team will contact you within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          treatmentType: '',
          appointmentDate: undefined,
          timeSlot: '',
          skinType: '',
          skinConcerns: '',
          previousTreatments: '',
          allergies: '',
          message: ''
        });
        
        onClose();
      } else {
        throw new Error(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return t('booking.date');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-pink-200 text-gray-800 shadow-2xl"
      >
        {/* Soft Beauty Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-white to-purple-50/20 pointer-events-none" />
        
        {/* Elegant Pattern */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="modal-beauty-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E879F9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#modal-beauty-grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <DialogHeader className="text-center mb-[28px] pb-6 border-b border-pink-100 mt-[26px] mr-[0px] ml-[0px]">
            <DialogTitle 
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              {t('booking.title')} <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">SoRa</span>
            </DialogTitle>
            <DialogDescription 
              className="text-gray-600 text-base leading-relaxed"
            >
              Begin your journey to radiant, glass-like skin with our expert beauty specialists. 
              Fill out the form below to schedule your personalized consultation and treatment plan.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-pink-50/30 p-6 rounded-2xl border border-pink-100 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">{t('booking.name')} *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white border-pink-200 text-gray-800 placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">{t('booking.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white border-pink-200 text-gray-800 placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">{t('booking.phone')} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white border-pink-200 text-gray-800 placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-purple-50/30 p-6 rounded-2xl border border-purple-100 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Appointment Details
              </h3>
              
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">{t('booking.service')} *</Label>
                <Select value={formData.treatmentType} onValueChange={(value) => handleInputChange('treatmentType', value)}>
                  <SelectTrigger className="bg-white border-purple-200 text-gray-800 focus:border-purple-400 focus:ring-purple-400/20">
                    <SelectValue placeholder="Select your desired treatment" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-purple-200 text-gray-800">
                    {treatmentTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-purple-50">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t('booking.date')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-white border-purple-200 text-gray-800 hover:bg-purple-50 justify-start text-left font-normal w-full"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(formData.appointmentDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border-purple-200">
                      <Calendar
                        mode="single"
                        selected={formData.appointmentDate}
                        onSelect={(date) => handleInputChange('appointmentDate', date || new Date())}
                        initialFocus
                        className="text-gray-800"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t('booking.time')}</Label>
                  <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange('timeSlot', value)}>
                    <SelectTrigger className="bg-white border-purple-200 text-gray-800 focus:border-purple-400 focus:ring-purple-400/20">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-purple-200 text-gray-800">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="hover:bg-purple-50">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Skin Assessment */}
            <div className="bg-teal-50/30 p-6 rounded-2xl border border-teal-100 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Beauty Assessment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Skin Type</Label>
                  <Select value={formData.skinType} onValueChange={(value) => handleInputChange('skinType', value)}>
                    <SelectTrigger className="bg-white border-teal-200 text-gray-800 focus:border-teal-400 focus:ring-teal-400/20">
                      <SelectValue placeholder="Select your skin type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-teal-200 text-gray-800">
                      {skinTypes.map((type) => (
                        <SelectItem key={type} value={type} className="hover:bg-teal-50">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Primary Skin Concerns</Label>
                  <Select value={formData.skinConcerns} onValueChange={(value) => handleInputChange('skinConcerns', value)}>
                    <SelectTrigger className="bg-white border-teal-200 text-gray-800 focus:border-purple-400 focus:ring-purple-400/20">
                      <SelectValue placeholder="Select your main concern" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-teal-200 text-gray-800">
                      {skinConcernOptions.map((concern) => (
                        <SelectItem key={concern} value={concern} className="hover:bg-teal-50">
                          {concern}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousTreatments" className="text-gray-700 font-medium">Previous Beauty Treatments</Label>
                <Textarea
                  id="previousTreatments"
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                  className="bg-white border-teal-200 text-gray-800 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 min-h-[80px] resize-none"
                  placeholder="List any previous facial treatments, skincare routines, or products you're currently using..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-gray-700 font-medium">Allergies & Sensitivities</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="bg-white border-teal-200 text-gray-800 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 min-h-[60px] resize-none"
                  placeholder="Please list any known allergies or skin sensitivities..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">Beauty Goals & Notes</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white border-teal-200 text-gray-800 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20 min-h-[100px] resize-none"
                  placeholder="Tell us about your beauty goals, what results you're hoping to achieve, or any questions you have about our treatments..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-pink-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-pink-400 via-[#0ABAB5] to-purple-400 hover:from-pink-500 hover:via-[#0ABAB5]/90 hover:to-purple-500 text-white px-8 py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </div>
                ) : (
                  t('booking.submit')
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}