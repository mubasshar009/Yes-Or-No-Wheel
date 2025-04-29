import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "About - Yes or No Wheel",
  description: "Learn about the Yes or No Wheel decision-making tool and its purpose.",
}

export default function AboutPage() {
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
          <h1 className="text-2xl font-bold ml-4">About Yes or No Wheel</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            Yes or No Wheel was created with a simple mission: to help people make binary decisions quickly and
            randomly. We believe that sometimes the hardest part of decision-making is simply making a choice, and our
            tool aims to remove that friction.
          </p>

          <h2>What We Offer</h2>
          <p>
            The Yes or No Wheel is a free online tool that provides a 50/50 chance of getting either a "Yes" or "No"
            answer to any question. Unlike a simple coin flip, our wheel adds visual engagement and excitement to the
            decision-making process with its spinning animation, sound effects, and confetti celebration.
          </p>

          <p>Key features of our service include:</p>
          <ul>
            <li>A visually appealing spinning wheel with equal "Yes" and "No" sections</li>
            <li>Decision history tracking to keep a record of your past questions and answers</li>
            <li>A scoreboard to track the distribution of "Yes" and "No" results over time</li>
            <li>Sound effects and visual celebrations when the wheel stops</li>
            <li>Mobile-friendly design that works on any device</li>
            <li>Complete privacy with all data stored locally on your device</li>
          </ul>

          <h2>How It Works</h2>
          <p>
            The Yes or No Wheel uses a cryptographically secure random number generator to ensure completely fair and
            unbiased results. Each spin has exactly a 50% chance of landing on "Yes" or "No." The wheel's animation is
            designed to create suspense and make the decision-making process more engaging.
          </p>

          <p>
            When you spin the wheel, it rotates for a few seconds before gradually slowing down to reveal your answer.
            The result is determined by where the pointer at the top of the wheel lands when it stops spinning.
          </p>

          <h2>Our Values</h2>
          <p>At Yes or No Wheel, we believe in:</p>
          <ul>
            <li>
              <strong>Simplicity:</strong> Our tool is intentionally simple and focused on doing one thing well.
            </li>
            <li>
              <strong>Accessibility:</strong> We strive to make our tool available to everyone, on any device, for free.
            </li>
            <li>
              <strong>Privacy:</strong> We respect your privacy and store your data locally on your device.
            </li>
            <li>
              <strong>Fun:</strong> Decision-making doesn't have to be stressful—it can be enjoyable!
            </li>
          </ul>

          <h2>When to Use Yes or No Wheel</h2>
          <p>Our tool is perfect for:</p>
          <ul>
            <li>Breaking decision paralysis when you're stuck between two equally good options</li>
            <li>Making quick, low-stakes decisions</li>
            <li>Adding an element of chance to games and activities</li>
            <li>Settling friendly disputes</li>
            <li>Teaching probability concepts in an engaging way</li>
          </ul>

          <p>
            While the Yes or No Wheel is great for many situations, we recommend using more thorough decision-making
            processes for important life choices.
          </p>

          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! If you have questions, feedback, or suggestions, please contact us at{" "}
            <a href="mailto:hello@yesnowheel.com" className="text-purple-400 hover:text-purple-300">
              hello@yesnowheel.com
            </a>
            .
          </p>

          <h2>Legal Information</h2>
          <p>
            Yes or No Wheel is operated by [Your Company Name], a [Company Type] registered in [Country/State]. For more
            information about how we handle your data and the terms of using our service, please see our{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
