"use client";

import Image from "next/image";
import { Phone, Mail, Share2, Building, LinkIcon, MapPin, Download, Copy, Check, QrCode } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import QRCodeModal from "../components/QRCodeModal";

export default function ProfilePage() {
  const phoneNumber = "(+84) 93 780 2193";
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const handleCall = () => {
    window.open(`tel:${phoneNumber.replace(/[^0-9]/g, "")}`, "_self");
  };

  const handleEmail = () => {
    const emailAddress = "nguyenhoangmai193@gmail.com";
    const subject = "Contact from Profile";
    const body = "Hello Nguyễn Hoàng Mai,\n\nI found your profile and would like to get in touch.\n\nBest regards";
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_self");
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/image-profile.JPG";
    link.as = "image";
    link.fetchPriority = "high";
    document.head.appendChild(link);

    // Trigger page animations after a short delay
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => {
      document.head.removeChild(link);
      clearTimeout(timer);
    };
  }, []);

  const handleShare = async () => {
    setIsLoading(true);
    const url = window.location.href;
    const title = "Nguyễn Hoàng Mai - International Business Solutions Consultant";
    const text = "Check out my professional profile";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log("Sharing cancelled or failed", error);
      }
    } else {
      // Fallback: Open social sharing options
      const shareUrl = encodeURIComponent(url);
      const shareText = encodeURIComponent(`${title} - ${text}`);
      
      // Create a simple sharing menu or open multiple options
      const confirm = window.confirm("Choose sharing method:\nOK = Facebook\nCancel = Copy link to clipboard");
      
      if (confirm) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "width=600,height=400");
      } else {
        try {
          await navigator.clipboard.writeText(url);
          setCopiedText("link");
          setTimeout(() => setCopiedText(""), 2000);
        } catch (error) {
          console.error("Failed to copy link:", error);
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative min-h-[24rem]">
        <div className={`absolute top-0 left-0 w-full h-[5rem] bg-black transition-transform duration-500 ${isPageLoaded ? 'translate-y-0' : '-translate-y-full'}`} />
        <div className={`absolute top-[5rem] left-0 w-full h-[4rem] md:h-[5rem] bg-black transition-transform duration-700 ${isPageLoaded ? 'translate-y-0' : '-translate-y-full'}`} />
        <div className={`relative z-10 bg-transparent flex items-center justify-center mt-[-2rem] pt-16 transition-all duration-1000 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="container mx-auto px-0 md:px-0 lg:px-0 flex flex-col items-center">
            <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden mb-2 p-0 m-0 relative transition-all duration-1000 delay-200 ${isPageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <Image
                src="/image-profile.JPG"
                alt="Nguyễn Hoàng Mai"
                width={400}
                height={400}
                priority
                fetchPriority="high"
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAANAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAARIQUSMUETFWFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AFdQ1FxEyR45BbTE2bkWwq+VX+EHnq1Oc5GRWGbdV6WQ6olS5Us7yT0Be35USZL4SAl50ADACzYUH//Z"
                className="object-cover object-center w-full h-full transition-opacity duration-300"
                onLoadingComplete={(img) => {
                  img.style.opacity = "1";
                }}
              />
            </div>
            <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold text-white transition-all duration-1000 delay-400 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Nguyễn Hoàng Mai
            </h1>
            <p className={`text-sm md:text-base text-white mb-1 transition-all duration-1000 delay-500 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              International Business
            </p>
            <p className={`text-sm md:text-base text-white mb-5 transition-all duration-1000 delay-600 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Solutions Consultant
            </p>
            <div className={`flex gap-6 mb-6 transition-all duration-1000 delay-700 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <button
                className="icon-button hover:bg-zinc-500 transition-colors pulse-on-hover"
                onClick={handleCall}
                title="Call me"
              >
                <Phone size={20} />
              </button>
              <button
                className="icon-button hover:bg-zinc-500 transition-colors pulse-on-hover"
                onClick={handleEmail}
                title="Send email"
              >
                <Mail size={20} />
              </button>
              <button
                className="icon-button hover:bg-zinc-500 transition-colors pulse-on-hover"
                onClick={handleShare}
                disabled={isLoading}
                title="Share profile"
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : copiedText === "link" ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <Share2 size={20} />
                )}
              </button>
              <button
                className="icon-button hover:bg-zinc-500 transition-colors pulse-on-hover"
                onClick={() => setIsQRModalOpen(true)}
                title="Show QR Code"
              >
                <QrCode size={20} />
              </button>
            </div>
            {false && (
              <div
                className="contact-card hover:bg-zinc-600 transition-colors p-2"
                style={{ width: "380px", height: "49px" }}
              >
                <Mail size={20} />
                <span>My mail</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-0 flex items-center justify-center bg-zinc-600 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col">
          <div className="py-4 border-b border-white mb-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
              About Me
            </h1>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div
              className="contact-card hover:bg-zinc-600 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <Building size={20} />
              <span>NEOX Company</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-600 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <Phone size={20} />
              <span>1900 633 864</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-600 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <Mail size={20} />
              <span>nguyenhoangmai193@gmail.com</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-600 transition-colors p-2"
              style={{ height: "48px" }}
              onClick={() => (window.location.href = "https://neox.vn/")}
            >
              <LinkIcon size={20} />
              <span>https://neox.vn/</span>
            </div>
            <div className="contact-card flex-col items-start hover:bg-zinc-600 transition-colors">
              <div
                className="flex items-center gap-3 w-full p-2"
                style={{ height: "48px" }}
              >
                <MapPin size={20} />
                <span>Topaz Tower</span>
              </div>
              <div className="w-full h-48 md:h-64 mt-2 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.356221353748!2d106.70014110959283!3d10.770914251376734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f7f9ebd9b%3A0xd541d60f7f341997!2zVG9wYXogdG93ZXIsIDY2IMSQLiBQaMOzIMSQ4bupYyBDaMOtbmgsIFBoxrDhu51uZyBOZ3V54buFbiBUaMOhaSBCw6xuaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1749739481738!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Socials Section */}
      <section className="py-0 flex items-center justify-center bg-zinc-600 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col">
          <div className="py-4 border-b border-white mb-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
              The Socials
            </h1>
          </div>
          <div className="space-y-4 pr-2">
            <div
              className="contact-card hover:bg-zinc-700 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0f0"
                    d="M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22	C6,38.866,9.134,42,13,42z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153	c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205	c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726	c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332	c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0	c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922	C36.172,32.192,36.022,31.419,35.45,31.041z"
                  ></path>
                </svg>
              </div>
              <span>(+84) 93 780 21 93</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-700 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#2962ff"
                    d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                  ></path>
                  <path
                    fill="#eee"
                    d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                  ></path>
                </svg>
              </div>
              <span>(+84) 93 780 21 93</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-700 transition-colors p-2"
              style={{ height: "48px" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#8BC34A"
                    d="M18,6C9.2,6,2,12,2,19.5c0,4.3,2.3,8,6,10.5l-2,6l6.3-3.9C14,32.7,16,33,18,33c8.8,0,16-6,16-13.5C34,12,26.8,6,18,6z"
                  ></path>
                  <path
                    fill="#7CB342"
                    d="M20,29c0-6.1,5.8-11,13-11c0.3,0,0.6,0,0.9,0c-0.1-0.7-0.3-1.4-0.5-2c-0.1,0-0.3,0-0.4,0c-8.3,0-15,5.8-15,13c0,1.4,0.3,2.7,0.7,4c0.7,0,1.4-0.1,2.1-0.2C20.3,31.6,20,30.3,20,29z"
                  ></path>
                  <path
                    fill="#CFD8DC"
                    d="M46,29c0-6.1-5.8-11-13-11c-7.2,0-13,4.9-13,11s5.8,11,13,11c1.8,0,3.5-0.3,5-0.8l5,2.8l-1.4-4.8C44.3,35.2,46,32.3,46,29z"
                  ></path>
                  <path
                    fill="#33691E"
                    d="M14,15c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,13.9,14,15z M24,13c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S25.1,13,24,13z"
                  ></path>
                  <path
                    fill="#546E7A"
                    d="M30,26.5c0,0.8-0.7,1.5-1.5,1.5S27,27.3,27,26.5s0.7-1.5,1.5-1.5S30,25.7,30,26.5z M37.5,25c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S38.3,25,37.5,25z"
                  ></path>
                </svg>
              </div>
              <span>ID: nhmei12</span>
            </div>
            <div
              className="contact-card hover:bg-zinc-700 transition-colors p-2"
              style={{ height: "48px" }}
              onClick={() =>
                (window.location.href =
                  "https://www.linkedin.com/in/nguyenhoangmai1212/")
              }
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0288D1"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                  ></path>
                </svg>
              </div>
              <span>Nguyễn Mai</span>
            </div>
            <button
              className="w-full bg-zinc-700 hover:bg-zinc-600 rounded-md p-4 mt-20 !important:mt-16 text-center font-medium transition-colors"
              onClick={() => {
                const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Nguyễn Hoàng Mai
N:Nguyễn;Hoàng Mai;;;
ORG:NEOX Company
TEL;TYPE=WORK:1900633864
TEL;TYPE=CELL:+84937802193
EMAIL;TYPE=WORK:nguyenhoangmai193@gmail.com
URL:https://neox.vn/
ADR;TYPE=WORK:;;Topaz Tower;Phường 12;Quận 1;Hồ Chí Minh City;Vietnam
END:VCARD`;
                const blob = new Blob([vCard], { type: "text/vcard" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "contact.vcf";
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            >
              Save Contact
            </button>
          </div>
        </div>
      </section>

      {/* Toast notification for copy actions */}
      {copiedText && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg fade-in flex items-center gap-2 z-50">
          <Check size={16} />
          <span>
            {copiedText === "email" && "Email copied!"}
            {copiedText === "link" && "Profile link copied!"}
          </span>
        </div>
      )}

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title="My Profile QR Code"
      />
    </div>
  );
}
