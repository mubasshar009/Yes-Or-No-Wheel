import Link from "next/link"
import { YesNoWheelTool } from "@/components/yes-no-wheel-tool"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Yes or No Wheel - Make Quick Decisions
              </h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl">
                Stuck on a decision? Let our random Yes or No Wheel decide for you. Simple, fast, and completely random.
              </p>
            </div>

            {/* Yes/No Wheel Tool */}
            <div className="mb-16 max-w-[1000px] mx-auto">
              <YesNoWheelTool />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to make yes or no decisions quickly
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center space-y-2 border border-zinc-800 p-4 rounded-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <article className="prose prose-invert prose-lg max-w-none">
                <h2 id="about-yes-no-wheel" className="text-3xl font-bold tracking-tighter mb-6">
                  About the Yes or No Wheel
                </h2>

                <p>
                  The <strong>Yes or No Wheel</strong> is a simple yet powerful decision-making tool designed to help
                  you make quick binary choices. When you're stuck between two options and can't decide, our random
                  wheel spinner provides an unbiased answer.
                </p>

                <p>
                  Unlike traditional methods like flipping a coin, the Yes or No Wheel adds a visual element and
                  excitement to the decision-making process. Watch as the wheel spins and gradually slows down to reveal
                  your answer, making even the simplest decisions more engaging.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">How the Yes or No Wheel Works</h3>

                <p>
                  Our Yes or No Wheel uses a completely random algorithm to ensure fair and unbiased results. The wheel
                  is divided into two equal sections - one for "Yes" and one for "No" - giving you a perfect 50/50
                  chance for either outcome.
                </p>

                <p>
                  Simply type your question, click the "Spin the Wheel" button, and let fate decide. The wheel will spin
                  for a few seconds before gradually slowing down to reveal your answer. Whether it lands on "Yes" or
                  "No," you'll have your decision in seconds.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Wheel Customization</h3>

                <p>
                  You can customize the wheel either by Customizing the title or by Scoreboard reset. By default, we
                  added your question "Should I do it?" for binary decisions. You can customize the decision wheel title
                  as you want. Also, we stored your decision history and you can reset it by using the reset button.
                </p>

                <p>
                  <strong>Customized Title</strong> You can change the title of the Yes No generator to make it more
                  personalized. For example, if you are planning to go outside for dinner and you have a quick question
                  in mind, should I text him yes or no? So in this case, you can click the default title and change it
                  to your personalized question for your decision. 
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Scoreboard</h3>

                <p>
                  To understand you better we added a Scoreboard for each Wheel spin, So you don't need to remember
                  exactly how many times the answer was Yes or No. Each time the wheel spins it will count the answer
                  yes or no. To make the spinner more engaging we added green color for yes and red for no. If you want
                  to refresh your results then just click on the reset button.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Share Results</h3>

                <p>
                  You can share your final results with your friends by taking a screenshot of the scoreboard. You can
                  also share your results by copying the URL of the page because we store your results locally on your
                  device.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Mobile Friendly</h3>

                <p>
                  We have designed this decision spinner to provide a better user experience. This tool layout is
                  responsive, so whether you use a PC, Tablet, or phone, you will get an amazing experience.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Celebration Effect</h3>

                <p>
                  After the wheel stops, you will see amazing confetti explosions and sound effects for each of your yes
                  or no decisions. These little celebration confetti explosion animations give you confidence in your
                  decisions. 
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Popular Uses for the Yes or No Wheel</h3>

                <ul>
                  <li>
                    <strong>Personal Decisions</strong> - Should I go out tonight? Should I buy this item? Should I take
                    this job offer?
                  </li>
                  <li>
                    <strong>Group Activities</strong> - Should we order pizza or cook dinner? Should we watch a movie or
                    play games?
                  </li>
                  <li>
                    <strong>Business Decisions</strong> - When you need a quick answer for minor decisions that don't
                    require deep analysis.
                  </li>
                  <li>
                    <strong>Breaking Decision Paralysis</strong> - When you're stuck between two equally good (or bad)
                    options.
                  </li>
                  <li>
                    <strong>Games and Activities</strong> - Use it for truth or dare, choosing who goes first, or
                    creating your own games.
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Benefits of Using Our Yes or No Wheel</h3>

                <ol>
                  <li>
                    <strong>Save Time</strong> - Make quick decisions without wasting time overthinking simple choices.
                  </li>
                  <li>
                    <strong>Eliminate Bias</strong> - Get truly random results without any unconscious bias affecting
                    your choice.
                  </li>
                  <li>
                    <strong>Track Your Decisions</strong> - Our wheel keeps a history of your questions and answers for
                    future reference.
                  </li>
                  <li>
                    <strong>Visual Feedback</strong> - The spinning animation and sound effects make decision-making
                    more engaging.
                  </li>
                  <li>
                    <strong>Mobile Friendly</strong> - Use the Yes or No Wheel on any device, anywhere you need to make
                    a decision.
                  </li>
                </ol>

                <h3 className="text-2xl font-bold mt-8 mb-4">Drawbacks of Using Our Yes or No Wheel</h3>

                <ol>
                  <li>
                    <strong>Oversimplified Choices</strong> - For Some decisions, you may require deeper thought and
                    context that a simple spinner with 50/50 results can't provide.
                  </li>
                  <li>
                    <strong>Overreliance on Randomness</strong> - If you use our wheel more often for your binary
                    decision it will reduce your confidence in making decisions in your life.
                  </li>
                  <li>
                    <strong>Not Always Practical </strong> - Because this wheel is a just programming tool no emotional,
                    ethical, or situational complexities are attached to this.
                  </li>
                  <li>
                    <strong>May Delay Growth</strong> - This tool can hinder your personal development over time because
                    you are not making decisions on your own.
                  </li>
                  <li>
                    <strong>No Custom Logic</strong> - All results are purely random 50/50 don't consider factors like
                    priority, probability, or relevance.
                  </li>
                </ol>

                <h3 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold">Is the Yes or No Wheel truly random?</h4>
                    <p>
                      Yes, our wheel uses a cryptographically secure random number generator to ensure completely
                      unbiased results. Each spin has exactly a 50% chance of landing on "Yes" or "No."
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Can I use the Yes or No Wheel for important decisions?</h4>
                    <p>
                      While the Yes or No Wheel is great for breaking decision paralysis, we recommend using it
                      primarily for fun or for decisions where either outcome would be acceptable. For major life
                      decisions, it's best to carefully weigh your options rather than leaving them to chance.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Does the Yes or No Wheel work offline?</h4>
                    <p>
                      Once the page has loaded, the Yes or No Wheel will continue to function even without an internet
                      connection. Your decision history is stored locally on your device.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Is this yes no spinner free to use?</h4>
                    <p>
                      Yes, our decision wheel spinner is completely free to use. You don't need to sign up or any
                      subscription. It's just a free tool to help you with your decision. 
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">
                      Can we use Yes or No Wheel in the Classroom or in the office?
                    </h4>
                    <p>
                      Yes, you can use our yes-no spinner wheel in the classroom if you are stuck in a decision like
                      Should I complete this task? Or should I complete my Biology homework first? In the office, you
                      can prioritize your tasks similarly like should I complete task 1 first? 
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold">Is my question history private?</h4>
                    <p>
                      Yes, your question history is stored locally on your device and is not sent to any servers. Your
                      decisions remain completely private.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Make Better Decisions with the Yes or No Wheel</h3>

                <p>
                  Whether you're making a simple personal choice or trying to break decision paralysis, the Yes or No
                  Wheel provides a fun, engaging way to get an answer. With its perfect 50/50 probability, you can trust
                  that the outcome is completely random and unbiased.
                </p>

                <p>Try the Yes or No Wheel today and experience how it can simplify your decision-making process.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-zinc-800 py-6 md:py-0">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm text-gray-400 md:text-left">
              © {new Date().getFullYear()} Yes or No Wheel. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="text-sm text-gray-400 hover:underline">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:underline">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Yes or No Decisions",
    description: "Get instant answers to your yes/no questions with our random wheel spinner.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  },
  {
    title: "Decision History",
    description: "Keep track of your past questions and answers for future reference.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    ),
  },
  {
    title: "Celebration Effects",
    description: "Enjoy confetti explosions and sound effects when the wheel stops.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v8"></path>
        <path d="m4.93 10.93 1.41 1.41"></path>
        <path d="M2 18h8"></path>
        <path d="m19.07 10.93-1.41 1.41"></path>
        <path d="M22 18h-8"></path>
        <path d="m8 22 4-11 4 11"></path>
      </svg>
    ),
  },
  {
    title: "Scoreboard",
    description: "Track your Yes and No results over time with our interactive scoreboard.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M2 20h20"></path>
        <path d="M5 20V8.2a1.2 1.2 0 0 1 1.2-1.2h1.6a1.2 1.2 0 0 1 1.2 1.2V20"></path>
        <path d="M10 20V4.2a1.2 1.2 0 0 1 1.2-1.2h1.6a1.2 1.2 0 0 1 1.2 1.2V20"></path>
        <path d="M15 20v-8.2a1.2 1.2 0 0 1 1.2-1.2h1.6a1.2 1.2 0 0 1 1.2 1.2V20"></path>
      </svg>
    ),
  },
  {
    title: "Mobile Friendly",
    description: "Make decisions on the go with our fully responsive design.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
        <path d="M12 18h.01"></path>
      </svg>
    ),
  },
  {
    title: "Completely Free",
    description: "No sign-up, no subscription, just a free tool to help with your decisions.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v20"></path>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
]