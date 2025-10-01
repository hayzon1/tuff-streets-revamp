import { Mail, MapPin, Phone, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent!', {
      description: "We'll get back to you within 24 hours",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display mb-4">GET IN TOUCH</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Questions, feedback, or just want to say hi? We're here.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="btn-tuff w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display mb-6">CONTACT INFO</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-foreground/70">
                        Lagos, Nigeria
                        <br />
                        Yaba / VI / Lekki
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:hello@tootuff.ng" className="text-foreground/70 hover:text-accent">
                        hello@tootuff.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <a href="https://wa.me/2348012345678" className="text-foreground/70 hover:text-accent">
                        +234 801 234 5678
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-display mb-4">FOLLOW US</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/tootuff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com/tootuff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div className="bg-accent/10 p-6 border-2 border-accent">
                <h3 className="font-display text-xl mb-2">BUSINESS HOURS</h3>
                <p className="text-foreground/70">
                  Mon - Sat: 10:00 AM - 8:00 PM
                  <br />
                  Sunday: Closed
                  <br />
                  <span className="text-sm">(Online orders 24/7)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
