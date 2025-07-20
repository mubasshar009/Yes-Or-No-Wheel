import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Yes or No Wheel",
  description: "Privacy policy for the Yes or No Wheel decision-making tool.",
  alternates: {
    canonical: 'https://yesno-wheel.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or
            use the Yes or No Wheel website (the "Service").
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            <strong>1.1 Information You Provide:</strong> When you use our Service, we collect certain information that
            you provide directly to us, such as:
          </p>
          <ul>
            <li>
              Questions you enter into the Yes or No Wheel (these are stored locally on your device and are not
              transmitted to our servers)
            </li>
            <li>Decision history (also stored locally on your device)</li>
          </ul>

          <p>
            <strong>1.2 Automatically Collected Information:</strong> When you visit the Service, we automatically
            collect certain information about your device, including:
          </p>
          <ul>
            <li>
              Usage Data: Information on how you access and use our Service, such as your browser type, time spent on
              the Service, pages visited, and referring website addresses
            </li>
            <li>
              Device Information: Information about your device, such as your IP address, device type, operating system,
              and browser type
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Service</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Local Storage</h2>
          <p>
            The Yes or No Wheel uses local storage (such as browser localStorage) to store your questions, decision
            history, and preferences. This data is stored directly on your device and is not transmitted to our servers.
            You can clear this data at any time by clearing your browser's local storage or using the reset
            functionality within the application.
          </p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            <strong>4.1 Cookies:</strong> We use cookies and similar tracking technologies to track activity on our
            Service and hold certain information. Cookies are files with a small amount of data which may include an
            anonymous unique identifier.
          </p>
          <p>
            <strong>4.2 Types of Cookies We Use:</strong>
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Necessary for the functioning of the Service
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Service by
              collecting and reporting information anonymously
            </li>
          </ul>
          <p>
            <strong>4.3 Your Choices:</strong> Most web browsers are set to accept cookies by default. You can usually
            choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject
            cookies, this could affect certain features of our Service.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We may use third-party services, such as Google Analytics, to help us understand how our users use the
            Service. These third-party service providers have their own privacy policies addressing how they use such
            information.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from
            unauthorized access, use, alteration, and disclosure. However, the transmission of information via the
            internet is not completely secure. While we strive to protect your personal information, we cannot guarantee
            the security of your information transmitted to our Service.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are
            advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>9. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request that we correct or update your personal information</li>
            <li>The right to request that we delete your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h2>10. California Privacy Rights</h2>
          <p>
            California Civil Code Section 1798.83 permits users of our Service that are California residents to request
            certain information regarding our disclosure of personal information to third parties for their direct
            marketing purposes. To make such a request, please contact us using the information below.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@yesnowheel.com" className="text-purple-400 hover:text-purple-300">
              privacy@yesnowheel.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
