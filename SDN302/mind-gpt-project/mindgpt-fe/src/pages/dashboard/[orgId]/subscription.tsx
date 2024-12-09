import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const SubscriptionPage = () => {
    return  <div className="bg-background min-h-screen">
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <div className="flex flex-col p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Basic
            </h3>
            <p className="text-4xl font-bold mb-4">
              $9.99
              <span className="text-base font-normal">
                /month
              </span>
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Up to 10 mind maps per month
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Basic AI generation
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Export as PNG
              </li>
            </ul>
            <Button className="mt-auto bg-blue-500 hover:bg-blue-600">Choose Plan</Button>
          </div>
          <div className="flex flex-col p-6 bg-card rounded-lg shadow-lg border-2 border-blue-500">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-4">
              $24.99
              <span className="text-base font-normal">
                /month
              </span>
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Unlimited mind maps
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Advanced AI generation
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Export in multiple formats
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Collaboration features
              </li>
            </ul>
            <Button className="mt-auto bg-blue-500 hover:bg-blue-600">Choose Plan</Button>
          </div>
          <div className="flex flex-col p-6 bg-card rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-blue-100 opacity-20"></div>
              <div className="absolute inset-0 sparkle-effect"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Enterprise
              </h3>
              <p className="text-4xl font-bold mb-4">
                Custom
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                  All Pro features
                </li>
                <li className="flex items-center">
                  <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                  Custom integrations
                </li>
                <li className="flex items-center">
                  <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                  On-premise deployment options
                </li>
              </ul>
              <Button className="mt-auto bg-blue-500 hover:bg-blue-600">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
}

export default SubscriptionPage
