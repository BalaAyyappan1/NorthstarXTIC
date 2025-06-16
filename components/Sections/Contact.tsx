"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ApplyIcon, ArrowIcon, ContactIcon, EmailIcon, NameIcon, NoteIcon, TitleIcon } from '../Icons';
import Image from 'next/image';

const Contact = () => {

  interface FormData {
    name: string;
    email: string;
    contact: string;
    Title: string;
    cv: File | null;
    Note: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    contact?: string;
    Title?: string;
    cv?: string;
    Note?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    Title: '',
    cv: null,
    Note: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.contact.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.contact = 'Please enter a valid contact number';
    }

    if (!formData.Title.trim()) {
      newErrors.Title = 'Title is required';
    }

    if (!formData.cv) {
      newErrors.cv = 'CV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | File): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('cv', e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // handle submit logic here

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 2000);
  };

  const handleFocus = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFocusedField(field);
  };

  const handleBlur = (): void => {
    setFocusedField('');
  };

  const handleInputChangeEvent = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    handleInputChange(field, e.target.value);
  };

  const getInputClassName = (field: keyof FormData): string => {
    const baseClass = "border border-white rounded-[26px] bg-transparent outline-none transition-colors px-4 py-3 w-full text-[12px] text-white placeholder-white";
    const focusClass = focusedField === field ? 'border-white/20' : 'border-white';
    const errorClass = errors[field] ? 'border-red-400/60' : '';

    return `${baseClass} ${errorClass || focusClass} focus:border-white/60`;
  };

  return (
    <div className="md:h-[437px] bg-[#EC677DB2] items-center xl:px-[115px] lg:px-[75px] md:px-[30px] px-[20px] py-[47px] justify-center rounded-[20px] p-8 relative">
      <Image
        src={ArrowIcon}
        alt="Arrow"
        className="absolute md:-top-[5%] -top-[1%] md:left-[5%] left-[1%] w-[125px]"
      />
      <div className="flex md:flex-row flex-col justify-center items-start gap-12 h-full mt-2">
        {/* Left Side - Image and Text */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6">
          {/* Placeholder Text */}
          <div className="space-y-2 text-white w-[454px] md:mt-0 mt-5">
            <h2 className="md:text-[16px] text-[12px] md:leading-[18px] leading-[14px]">
              Contact Us
            </h2>
            <p className="md:text-[36px] text-[20px] md:leading-[36px] leading-[26px] md:tracking-[-2px] tracking-[-1px] font-semibold">
              Let's grow together
            </p>
            <div className="space-y-2 md:text-[36px] text-[20px] md:tracking-[-2px] tracking-[-1px] text-[#A10E2B] font-semibold -mt-3.5 ">
              Join Our Northstar Team
            </div>
            <div className="flex flex-col md:space-y-4 space-y-0.5 text-white md:text-[16px] text-[12px] md:leading-[18px] font-normal">
              <div className="flex flex-col md:space-y-2 space-y-1">
                <p className='md:w-auto w-[350px]'>
                  We're excited to hear from you and let’s start something
                  special together.
                </p>
                <p>Email:info@northstargrowthadvisors.com</p>
              </div>
              <div className="md:w-auto w-[350px]">
                <p>
                  Address: Unit No. GB-06, Ground Floor, Pragya Accelerator,
                  Gift City, Gandhinagar - 382355, INDIA
                </p>
              </div>

              <p className="md:w-[350px] w-[250px]">
                Unit No. 13, 1st Floor, Unicorn, Dattaji Salve Road, Off Link
                Road, Andheri–W,
                <br />
                Mumbai – 400053.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 max-w-[600px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email Row */}
            <div className="flex md:flex-row flex-col gap-4">
              <div className="flex-1 space-y-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    src={NameIcon}
                    alt=""
                    className="h-5 w-5" // adjust size as needed
                  />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleInputChangeEvent("name")}
                  onFocus={handleFocus("name")}
                  onBlur={handleBlur}
                  className={getInputClassName("name") + " pl-10"} // Add pl-10 for padding-left
                  disabled={isSubmitting}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span
                    id="name-error"
                    className="text-red-300 text-xs block"
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    src={EmailIcon}
                    alt=""
                    className="h-5 w-5" // adjust size as needed
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleInputChangeEvent("email")}
                  onFocus={handleFocus("email")}
                  onBlur={handleBlur}
                  className={getInputClassName("email") + " pl-10"}
                  disabled={isSubmitting}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="text-red-300 text-xs block"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Contact and Title Row */}
            <div className="flex md:flex-row flex-col gap-4">
              <div className="flex-1 space-y-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    src={ContactIcon}
                    alt=""
                    className="h-5 w-5" // adjust size as needed
                  />
                </div>
                <input
                  id="contact"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.contact}
                  onChange={handleInputChangeEvent("contact")}
                  onFocus={handleFocus("contact")}
                  onBlur={handleBlur}
                  className={getInputClassName("contact") + " pl-10"}
                  disabled={isSubmitting}
                  aria-invalid={errors.contact ? "true" : "false"}
                  aria-describedby={
                    errors.contact ? "contact-error" : undefined
                  }
                />
                {errors.contact && (
                  <span
                    id="contact-error"
                    className="text-red-300 text-xs block"
                  >
                    {errors.contact}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    src={TitleIcon}
                    alt=""
                    className="h-5 w-5" // adjust size as needed
                  />
                </div>
                <input
                  id="Title"
                  type="text"
                  placeholder="Job Title"
                  value={formData.Title}
                  onChange={handleInputChangeEvent("Title")}
                  onFocus={handleFocus("Title")}
                  onBlur={handleBlur}
                  className={getInputClassName("Title") + " pl-10"}
                  disabled={isSubmitting}
                  aria-invalid={errors.Title ? "true" : "false"}
                  aria-describedby={errors.Title ? "Title-error" : undefined}
                />
                {errors.Title && (
                  <span
                    id="Title-error"
                    className="text-red-300 text-xs block"
                  >
                    {errors.Title}
                  </span>
                )}
              </div>
            </div>

            {/* CV Upload */}
            {/* <div className="flex flex-row justify-center items-center gap-4 -mt-2">
                <div className="relative flex-1 space-y-1">
                  <input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-2 border-dotted border-gray-400"
                    disabled={isSubmitting}
                    aria-invalid={errors.cv ? "true" : "false"}
                    aria-describedby={errors.cv ? "cv-error" : undefined}
                  />
                  <div
                    className={`${getInputClassName(
                      "cv"
                    )} cursor-pointer flex items-center justify-center`}
                  >
                    <span
                      className={formData.cv ? "text-white" : "text-white/70"}
                    >
                      {formData.cv ? formData.cv.name : "Upload Your CV"}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex-col text-[10px] mt-2 ">
                  <p>(Only .pdf file)</p>
                  <p>(No space or special characters allowed)</p>
                  <p>(Max size upto 5mb)</p>
                </div>
                {errors.cv && (
                  <span id="cv-error" className="text-red-300 text-xs block">
                    {errors.cv}
                  </span>
                )}
              </div> */}
            {/* CV Upload */}
            <div className="flex flex-row justify-center items-center gap-4 -mt-2">
              <div className="relative flex-1 space-y-1">
                <input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isSubmitting}
                  aria-invalid={errors.cv ? "true" : "false"}
                  aria-describedby={errors.cv ? "cv-error" : undefined}
                />
                <div
                  className={`border-2 border-dashed ${errors.cv ? 'border-red-400/60' : 'border-white'
                    } rounded-[26px] bg-transparent outline-none transition-colors px-4 py-3 w-full text-[12px] text-white placeholder-white flex items-center justify-center cursor-pointer`}
                >
                  <span className={formData.cv ? "text-white" : "text-white/70"}>
                    {formData.cv ? formData.cv.name : "Upload Your CV"}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex-col text-[10px] mt-2 ">
                <p>(Only .pdf file)</p>
                <p>(No space or special characters allowed)</p>
                <p>(Max size upto 5mb)</p>
              </div>
              {errors.cv && (
                <span id="cv-error" className="text-red-300 text-xs block">
                  {errors.cv}
                </span>
              )}
            </div>
            {/* Note/Message */}
            <div className="space-y-1 flex-1 relative">
              {/* Icon */}
              <div className="absolute top-3 left-0 pl-3   pointer-events-none">
                <Image src={NoteIcon} alt="" className="h-5 w-5" />
              </div>

              {/* Textarea */}
              <textarea
                id="note"
                placeholder="Notes"
                value={formData.Note}
                onChange={handleInputChangeEvent("Note")}
                onFocus={handleFocus("Note")}
                onBlur={handleBlur}
                className={`${getInputClassName(
                  "Note"
                )} pl-9 py-1  resize-none`} // Ensure vertical padding
                rows={2}
                disabled={isSubmitting}
                aria-invalid={errors.Note ? "true" : "false"}
                aria-describedby={errors.Note ? "message-error" : undefined}
              />

              {/* Error message */}
              {errors.Note && (
                <span
                  id="message-error"
                  className="text-red-300 text-xs block"
                >
                  {errors.Note}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-1 relative flex md:justify-end justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-[120px] h-[42px] bg-white text-[#000000] font-semibold px-8 py-4 rounded-[30px] cursor-pointer hover:bg-white/90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {/* Icon */}
                <Image
                  src={ApplyIcon}
                  alt=""
                  className="h-5 w-5 pointer-events-none absolute left-4"
                />

                {/* Text or Spinner */}
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="ml-4">Apply</span> // Give space between icon and text
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="text-center text-white bg-white/10 rounded-lg p-3 mt-4">
                ✓ Application submitted successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact