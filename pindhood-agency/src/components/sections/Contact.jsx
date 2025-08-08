import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formType, setFormType] = useState('contact'); // 'contact' or 'business-details'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo([formRef.current, infoRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Use environment-specific API URL
      const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
      console.log('Using API URL:', API_BASE_URL);
      
      console.log('Submitting form data:', {
        url: `${API_BASE_URL}/contact`,
        formType,
        data
      });

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          ...data,
          formType,
          submittedAt: new Date().toISOString()
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus('success');
        reset();
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Network Status:', navigator.onLine ? 'Online' : 'Offline');
      
      // More detailed error message for users
      let errorMessage = 'Failed to send. ';
      if (!navigator.onLine) {
        errorMessage += 'Please check your internet connection.';
      } else if (error.message === 'Failed to fetch') {
        errorMessage += 'Cannot connect to server. Please ensure the backend server is running on port 5001.';
        console.log('Backend server might not be running. Please start it with: npm run server');
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Server may be unavailable. Please try again later.';
      }
      
      setSubmitStatus('error');
      alert(errorMessage); // Show error in alert for debugging
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section" ref={contactRef}>
      <div className="container">
        <div className="contact-header" ref={headerRef}>
          <h2>Let's Build Something Amazing</h2>
          <p className="contact-subtitle">
            Get in touch with us or help us complete your business profile
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info" ref={infoRef}>
            <div className="info-card">
              <h3>Get in Touch</h3>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span>Email</span>
                  <a href="mailto:pindhoodmedia@gmail.com">pindhoodmedia@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <span>Phone</span>
                  <a href="tel:+917986596029">+91 79865 96029</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form" ref={formRef}>
            <div className="form-type-selector">
              <button 
                className={`form-type-btn ${formType === 'contact' ? 'active' : ''}`}
                onClick={() => setFormType('contact')}
              >
                Contact Us
              </button>
              <button 
                className={`form-type-btn ${formType === 'business-details' ? 'active' : ''}`}
                onClick={() => setFormType('business-details')}
              >
                Business Details
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              {formType === 'contact' ? (
                // Regular Contact Form
                <>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      className={errors.subject ? 'error' : ''}
                    />
                    {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      {...register('message', { required: 'Message is required' })}
                      className={errors.message ? 'error' : ''}
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message.message}</span>}
                  </div>
                </>
              ) : (
                // Business Details Form
                <>
                  <div className="form-section">
                    <h4>Company Information</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          id="companyName"
                          type="text"
                          {...register('companyName', { required: 'Company name is required' })}
                          className={errors.companyName ? 'error' : ''}
                        />
                        {errors.companyName && <span className="error-message">{errors.companyName.message}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="industry">Industry</label>
                        <input
                          id="industry"
                          type="text"
                          {...register('industry')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Services Offered</h4>
                    <div className="form-group">
                      <label htmlFor="services">List your services (one per line)</label>
                      <textarea
                        id="services"
                        rows="6"
                        placeholder="e.g.,&#10;Brand Strategy&#10;Video Production&#10;Social Media Marketing&#10;Web Design"
                        {...register('services')}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="specialties">Special Packages or Unique Offerings</label>
                      <textarea
                        id="specialties"
                        rows="4"
                        {...register('specialties')}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Portfolio & Experience</h4>
                    <div className="form-group">
                      <label htmlFor="projects">Recent Projects (Name, Client, Description)</label>
                      <textarea
                        id="projects"
                        rows="6"
                        {...register('projects')}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="achievements">Awards, Recognition, or Notable Achievements</label>
                      <textarea
                        id="achievements"
                        rows="4"
                        {...register('achievements')}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Contact & Social</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="businessEmail">Business Email</label>
                        <input
                          id="businessEmail"
                          type="email"
                          defaultValue="pindhoodmedia@gmail.com"
                          {...register('businessEmail')}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="businessPhone">Business Phone</label>
                        <input
                          id="businessPhone"
                          type="tel"
                          defaultValue="+917986596029"
                          {...register('businessPhone')}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="instagram">Instagram Handle</label>
                        <input
                          id="instagram"
                          type="text"
                          placeholder="@pindhoodmedia.co"
                          {...register('instagram')}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn Profile</label>
                        <input
                          id="linkedin"
                          type="url"
                          {...register('linkedin')}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

               <button 
                 type="submit" 
                 className="submit-btn"
                 disabled={isSubmitting}
               >
                 {isSubmitting ? 'Sending...' : (formType === 'contact' ? 'Send Message' : 'Save Business Details')}
               </button>

               {submitStatus === 'success' && (
                 <div className="status-message success">
                   {formType === 'contact' ? 'Message sent successfully!' : 'Business details saved successfully!'}
                 </div>
               )}
               
               {submitStatus === 'error' && (
                 <div className="status-message error">
                   Failed to send. Please try again.
                 </div>
               )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 