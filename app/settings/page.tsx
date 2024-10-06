import Sidebar from "../../components/ui/sidebar";
import TopBar from "../../components/ui/topbar";
import React from "react";
import {Input} from "@nextui-org/input";

interface user{
    name: string,
    email: string,
    password: string,
    zipcode: number
}

export default function Settings () {

    const newUser: user = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "securePassword123",
        zipcode: 12345
    };
    
    return(
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
            {/* TopBar for mobile */}
                <div className="md:hidden z-20">
                <TopBar />
                </div>

            {/* Sidebar Component */}
                <div className="hidden md:flex md:flex-col md:w-64 h-full">
                <Sidebar />
                </div>

            {/* Main Content */}
                <div className="z-10 flex-1 p-8 sm:p-20 bg-indigo-100 flex flex-col items-center text-center">
                    <div className="bg-white w-5/6 flex-row justify-center divide-y border-8 border-white rounded-lg divide-gray-400">
                        <h1 className="text-black py-5 text-2xl">Settings</h1>
                        <div className="flex items-center">
                            <h1 className="text-black w-1/2">Name</h1>
                            <Input className="light py-2 w-1/2" placeholder={newUser.name}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}