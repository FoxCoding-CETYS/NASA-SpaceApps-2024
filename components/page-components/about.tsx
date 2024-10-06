import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import Tractor from '../../app/assets/tractor.png';

export default function About() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center">
        <h1 className="font-vibe text-6xl">Where technology meets the soil</h1>
        <h1 className="w-2/3 text-center py-10 text-xl">Stay ahead of droughts with our innovative portal designed exclusively for farmers. Access real-time data and accurate predictions about drought conditions in your area. Our platform empowers you with the information you need to make informed decisions and mitigate the impacts of drought on your agricultural activities.</h1>

        <Card 
        className="border-none w-1/3 bg-transparent"
        shadow="sm"
      >
        <CardHeader className="flex justify-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Introducing</h1>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className="">
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 mr-3 flex-shrink-0">
                <svg 
                  className="w-4 h-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span>Real-time drought data</span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 mr-3 flex-shrink-0">
                <svg 
                  className="w-4 h-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span>Accurate drought predictions</span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 mr-3 flex-shrink-0">
                <svg 
                  className="w-4 h-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span>Decision-making tools</span>
            </li>
            {/* Agrega más elementos de la lista según sea necesario */}
          </ul>
        </CardBody>
        <Divider/>
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
          >
            <Button className="bg-green-600 text-white">
              Sign up
            </Button>
          </Link>
        </CardFooter>
        </Card>
      </div>
    </>
  );
}
