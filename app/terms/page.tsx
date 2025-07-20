import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service - Yes or No Wheel",
  description: "Terms and conditions for using the Yes or No Wheel decision-making tool.",
  alternates: {
    canonical: 'https://yesno-wheel.com/terms',
  },
}

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold ml-4">Terms of Service</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Yes or No Wheel website (the "Service"), you agree to be bound by these Terms of
            Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Yes or No Wheel is a free online tool that provides a random decision-making wheel that gives users a 50/50
            chance of receiving a "Yes" or "No" answer to their questions. The Service may include features such as
            decision history tracking, sound effects, and visual animations.
          </p>

          <h2>3. Use of the Service</h2>
          <p>
            <strong>3.1 Eligibility:</strong> You must be at least 13 years old to use this Service. By using the
            Service, you represent and warrant that you meet this eligibility requirement.
          </p>
          <p>
            <strong>3.2 Acceptable Use:</strong> You agree not to use the Service:
          </p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To harm minors in any way</li>
            <li>
              To transmit any material that is unlawful, harmful, threatening, abusive, or otherwise objectionable
            </li>
            <li>To impersonate or attempt to impersonate any person or entity</li>
            <li>To interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>To collect or track the personal information of others</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            <strong>4.1 Service Content:</strong> The Service and its original content, features, and functionality are
            and will remain the exclusive property of Yes or No Wheel and its licensors. The Service is protected by
            copyright, trademark, and other laws.
          </p>
          <p>
            <strong>4.2 User Content:</strong> By using the Service, you may provide input such as questions that are
            stored locally on your device. You retain all rights to your content, but grant us a license to use,
            reproduce, and display such content in connection with the Service.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            <strong>5.1</strong> The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Yes or No Wheel
            expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the
            implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            <strong>5.2</strong> Yes or No Wheel makes no warranty that:
          </p>
          <ul>
            <li>The Service will meet your requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
          </ul>
          <p>
            <strong>5.3</strong> You understand and agree that any material downloaded or otherwise obtained through the
            use of the Service is done at your own discretion and risk and that you will be solely responsible for any
            damage to your computer system or loss of data that results from the download of any such material.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Yes or No Wheel, its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use or alteration of your transmissions or content</li>
          </ul>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:support@yesnowheel.com" className="text-purple-400 hover:text-purple-300">
              support@yesnowheel.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
