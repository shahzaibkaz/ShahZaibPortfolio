import React, { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch environment variables outside the component
const serviceId = import.meta.env.VITE_SERVICE;
const templateId = import.meta.env.VITE_TEMPLATE;
const apiKey = import.meta.env.VITE_API;

// Reusable input field component
const InputField = ({ type, name, placeholder, value, onChange, ariaLabel }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="border border-darkDesert bg-lightDesert text-darkDesert mb-4 p-3 rounded w-full shadow-md focus:border-goldDesert transition-colors duration-200"
    value={value}
    onChange={onChange}
    aria-label={ariaLabel}
    required
  />
);

export default function ContactMe() {
  const contactSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleMessageChange = useCallback(
    (e) => setMessage(e.target.value),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!serviceId || !templateId || !apiKey) {
      setError("Email service configuration is missing.");
      toast.error("Email service is not configured properly.");
      return;
    }

    setIsLoading(true);

    emailjs.sendForm(serviceId, templateId, e.target, apiKey).then(
      (result) => {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setError("");
        setIsLoading(false);
        toast.success("Your message has been sent successfully!");
      },
      (error) => {
        console.error("EmailJS Error:", error.text);
        setError("Something went wrong. Please try again later.");
        setIsLoading(false);
        toast.error("Oops! Something went wrong. Please try again later.");
      }
    );
  };

  return (
    <animated.section
      id="contact-me"
      className="flex flex-col items-center justify-center bg-lightDesert p-8 rounded-lg shadow-md min-h-screen"
      style={contactSpring}
    >
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-darkDesert mb-6 text-center">
          Contact Me
        </h1>
        {success ? (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold text-green-600">Thank You!</h2>
            <p className="text-darkDesert">
              Your message has been sent successfully. We will get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                ariaLabel="Enter your name"
              />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                ariaLabel="Enter your email"
              />
              <textarea
                name="message"
                placeholder="Message"
                className="border border-darkDesert bg-lightDesert text-darkDesert mb-4 p-3 rounded w-full h-24 shadow-md focus:border-goldDesert transition-colors duration-200"
                value={message}
                onChange={handleMessageChange}
                aria-label="Enter your message"
                required
              />
              <button
                type="submit"
                className="bg-darkDesert text-lightDesert py-3 px-4 rounded w-full font-bold hover:bg-goldDesert transition-colors duration-300 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </form>
            <div className="mt-6 text-center">
              <a
                href="https://wa.me/923217391140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white py-3 px-4 rounded font-bold hover:bg-green-600 transition-colors duration-300 shadow-md"
              >
                Contact me On WhatsApp
              </a>
             
              
            </div>
            <div className="mt-6 text-center">
  <a
    href="mailto:shahshahzaibkazmi@gmail.com"
    className="inline-block bg-green-500 text-white py-3 px-4 rounded font-bold hover:bg-green-600 transition-colors duration-300 shadow-md"
  >
    Email Me
  </a>
</div>

          </>
        )}
      </div>
    </animated.section>
  );
}
