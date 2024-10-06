import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from '../assets/logo-white.png'
import Tractor from '../assets/tractor.png'
import Bg from '../assets/tractor-385681_1920.jpg'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-grow">
        <Image
          src={Bg}
          alt="Beautiful farmland"
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-green-900/40" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="py-6 px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center">
              <Image
                src={Logo}
                alt="Datafarm Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
              <div className="flex space-x-4 text-sm text-white items-center justify-center">
                <Link href="#about" className="hover:text-green-300">About</Link>
                <Link href="#" className="hover:text-green-300">
                    <Button className="bg-green-700 text-white">
                        Sign in
                    </Button>
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Where technology meets the soil
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mb-8">
                Precision farming with real-time insights
              </p>
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-100">
                Get the experience
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* New section explaining the product */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" id='about'>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Revolutionizing Farming with Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-700">Real-Time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get up-to-the-minute data on weather conditions, soil moisture, and crop health, allowing you to make informed decisions quickly.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-700">Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Leverage advanced AI models to predict crop yields, pest outbreaks, and optimal harvest times, maximizing your farm's productivity.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-700">Resource Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimize your use of water, fertilizers, and pesticides with precision agriculture techniques, reducing costs and environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-700 mb-6">
              Datafarm brings the power of big data and machine learning to your fields, helping you achieve higher yields, reduce costs, and farm more sustainably.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm">© 2024 Datafarm. All rights reserved.</p>
          <Image
            src={Tractor}
            alt="Tractor Icon"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
        </div>
      </footer>
    </div>
  )
}